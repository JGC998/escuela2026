'use server'

import prisma from '@/lib/prisma'
import { signIn, signOut } from '@/auth'
import { AuthError } from 'next-auth'
import bcryptjs from 'bcryptjs'
import { redirect } from 'next/navigation'

export async function registrarUsuario(prevState, formData) {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')

    if (!name || !email || !password) {
        return { error: 'Todos los campos son obligatorios' }
    }

    if (password !== confirmPassword) {
        return { error: 'Las contraseñas no coinciden' }
    }

    if (password.length < 6) {
        return { error: 'La contraseña debe tener al menos 6 caracteres' }
    }

    try {
        const existing = await prisma.user.findUnique({ where: { email } })
        if (existing) {
            return { error: 'Ya existe una cuenta con ese email' }
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'USER',
            },
        })

        return { success: 'Cuenta creada correctamente. Ya puedes iniciar sesión.' }
    } catch (error) {
        console.error(error)
        return { error: 'Error al crear la cuenta. Inténtalo de nuevo.' }
    }
}

export async function iniciarSesion(prevState, formData) {
    const email = formData.get('email')
    const password = formData.get('password')

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: '/dashboard',
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Email o contraseña incorrectos' }
                default:
                    return { error: 'Error al iniciar sesión' }
            }
        }
        throw error
    }
}

export async function iniciarSesionOAuth(provider) {
    await signIn(provider, { redirectTo: '/dashboard' })
}

export async function cerrarSesion() {
    await signOut({ redirectTo: '/' })
}
