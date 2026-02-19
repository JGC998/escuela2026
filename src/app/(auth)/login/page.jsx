'use client'

import { useActionState } from 'react'
import { iniciarSesion } from '@/lib/auth-actions'
import { loginWithGoogle, loginWithGithub, loginWithDiscord } from '@/lib/oauth-actions'
import Link from 'next/link'

const initialState = { error: null }

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(iniciarSesion, initialState)

    return (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl text-white">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-400/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
                <p className="text-slate-400 text-sm mt-1">Accede a Escuela 2026</p>
            </div>

            {/* Error */}
            {state?.error && (
                <div className="bg-red-500/20 border border-red-400/40 rounded-lg p-3 mb-6 text-red-300 text-sm text-center">
                    {state.error}
                </div>
            )}

            {/* Credentials Form */}
            <form action={formAction} className="space-y-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                    <input
                        name="email"
                        type="email"
                        required
                        placeholder="tu@email.com"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Contraseña</label>
                    <input
                        name="password"
                        type="password"
                        required
                        placeholder="••••••••"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition duration-200"
                >
                    {isPending ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-transparent text-slate-400">o continúa con</span>
                </div>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-3">
                <form action={loginWithGoogle}>
                    <button type="submit" className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg py-2.5 text-white font-medium transition duration-200">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Google
                    </button>
                </form>

                <form action={loginWithGithub}>
                    <button type="submit" className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg py-2.5 text-white font-medium transition duration-200">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GitHub
                    </button>
                </form>

                <form action={loginWithDiscord}>
                    <button type="submit" className="w-full flex items-center justify-center gap-3 bg-indigo-600/40 hover:bg-indigo-600/60 border border-indigo-400/30 rounded-lg py-2.5 text-white font-medium transition duration-200">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 127.14 96.36">
                            <path d="M107.7 8.07A105.2 105.2 0 0 0 81.47.185a72.1 72.1 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0 72.38 72.38 0 0 0-3.4-6.83 105.1 105.1 0 0 0-26.25 7.9A111.3 111.3 0 0 0 .14 75.37a105.57 105.57 0 0 0 32.2 16.26 77.45 77.45 0 0 0 6.64-10.84 68.42 68.42 0 0 1-10.46-5 .46.46 0 0 1-.04-.76c.7-.52 1.4-1.07 2.07-1.62a74.9 74.9 0 0 0 63.9 0c.68.58 1.38 1.12 2.07 1.62a.46.46 0 0 1-.04.76 69.49 69.49 0 0 1-10.46 5 77.36 77.36 0 0 0 6.64 10.84 105.3 105.3 0 0 0 32.2-16.26A111.22 111.22 0 0 0 107.7 8.07zM42.45 65.69c-6.27 0-11.44-5.73-11.44-12.78s5.06-12.79 11.44-12.79 11.54 5.8 11.44 12.79c0 7.05-5.07 12.78-11.44 12.78zm42.24 0c-6.27 0-11.44-5.73-11.44-12.78s5.06-12.79 11.44-12.79 11.54 5.8 11.44 12.79c0 7.05-5.06 12.78-11.44 12.78z" />
                        </svg>
                        Discord
                    </button>
                </form>
            </div>

            {/* Register Link */}
            <p className="text-center text-slate-400 text-sm mt-6">
                ¿No tienes cuenta?{' '}
                <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium transition">
                    Regístrate
                </Link>
            </p>
        </div>
    )
}
