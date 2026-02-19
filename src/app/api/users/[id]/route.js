import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcryptjs from 'bcryptjs'

// GET /api/users/[id]
export async function GET(request, { params }) {
    const session = await auth()
    const { id } = await params

    // Allow users to fetch their own data, or admin for all
    if (!session?.user) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    if (session.user.role !== 'ADMIN' && session.user.id !== id) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    const user = await prisma.user.findUnique({
        where: { id },
        select: { id: true, name: true, email: true, role: true, image: true, createdAt: true }
    })

    if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })

    return NextResponse.json(user)
}

// PUT /api/users/[id]
export async function PUT(request, { params }) {
    const session = await auth()
    const { id } = await params

    if (!session?.user) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const isAdmin = session.user.role === 'ADMIN'
    const isSelf = session.user.id === id

    if (!isAdmin && !isSelf) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    const body = await request.json()
    const { name, image, role, password } = body

    const data = {}
    if (name !== undefined) data.name = name
    if (image !== undefined) data.image = image
    // Only admin can change role
    if (role !== undefined && isAdmin) data.role = role
    // Allow password change
    if (password) data.password = await bcryptjs.hash(password, 10)

    const user = await prisma.user.update({
        where: { id },
        data,
        select: { id: true, name: true, email: true, role: true, image: true }
    })

    return NextResponse.json(user)
}

// DELETE /api/users/[id] — ADMIN only
export async function DELETE(request, { params }) {
    const session = await auth()
    const { id } = await params

    if (!session?.user || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    // Prevent self-deletion
    if (session.user.id === id) {
        return NextResponse.json({ error: 'No puedes eliminar tu propia cuenta' }, { status: 400 })
    }

    await prisma.user.delete({ where: { id } })

    return NextResponse.json({ message: 'Usuario eliminado' })
}
