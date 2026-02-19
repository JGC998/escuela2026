import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcryptjs from 'bcryptjs'

// GET /api/users — list all users (ADMIN only)
export async function GET(request) {
    const session = await auth()

    if (!session?.user || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    const users = await prisma.user.findMany({
        select: { id: true, name: true, email: true, role: true, image: true, createdAt: true }
    })

    return NextResponse.json(users)
}

// POST /api/users — create user (ADMIN only)
export async function POST(request) {
    const session = await auth()

    if (!session?.user || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    const { name, email, password, role } = await request.json()

    if (!email || !password) {
        return NextResponse.json({ error: 'Email y contraseña son obligatorios' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
        return NextResponse.json({ error: 'Ya existe un usuario con ese email' }, { status: 409 })
    }

    const hashedPassword = await bcryptjs.hash(password, 10)

    const user = await prisma.user.create({
        data: { name, email, password: hashedPassword, role: role || 'USER' },
        select: { id: true, name: true, email: true, role: true, createdAt: true }
    })

    return NextResponse.json(user, { status: 201 })
}
