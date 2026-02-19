'use client'

import { useActionState } from 'react'
import { registrarUsuario } from '@/lib/auth-actions'
import Link from 'next/link'

const initialState = {}

export default function RegisterPage() {
    const [state, formAction, isPending] = useActionState(registrarUsuario, initialState)

    return (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl text-white">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-400/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold">Crear Cuenta</h1>
                <p className="text-slate-400 text-sm mt-1">Únete a Escuela 2026</p>
            </div>

            {/* Messages */}
            {state?.error && (
                <div className="bg-red-500/20 border border-red-400/40 rounded-lg p-3 mb-6 text-red-300 text-sm text-center">
                    {state.error}
                </div>
            )}
            {state?.success && (
                <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-lg p-3 mb-6 text-emerald-300 text-sm text-center">
                    {state.success}
                </div>
            )}

            <form action={formAction} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Nombre completo</label>
                    <input
                        name="name"
                        type="text"
                        required
                        placeholder="Tu nombre"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                    <input
                        name="email"
                        type="email"
                        required
                        placeholder="tu@email.com"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Contraseña</label>
                    <input
                        name="password"
                        type="password"
                        required
                        placeholder="Mínimo 6 caracteres"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Confirmar contraseña</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        required
                        placeholder="Repite tu contraseña"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition duration-200 mt-2"
                >
                    {isPending ? 'Creando cuenta...' : 'Crear Cuenta'}
                </button>
            </form>

            <p className="text-center text-slate-400 text-sm mt-6">
                ¿Ya tienes cuenta?{' '}
                <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition">
                    Inicia sesión
                </Link>
            </p>
        </div>
    )
}
