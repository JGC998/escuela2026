import { auth } from '@/auth'
import { cerrarSesion } from '@/lib/auth-actions'
import Link from 'next/link'

export default async function Header() {
    const session = await auth()
    const user = session?.user

    return (
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                    </div>
                    <span className="font-bold text-slate-800 dark:text-white group-hover:text-blue-600 transition-colors">Escuela 2026</span>
                </Link>

                <nav className="hidden md:flex items-center gap-1">
                    {user && (
                        <>
                            <Link href="/grupos" className="px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 text-sm font-medium transition-all">Grupos</Link>
                            <Link href="/estudiantes" className="px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-purple-600 text-sm font-medium transition-all">Estudiantes</Link>
                            <Link href="/asignaturas" className="px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-600 text-sm font-medium transition-all">Asignaturas</Link>
                            {user.role === 'ADMIN' && (
                                <Link href="/admin" className="px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 text-sm font-medium transition-all">Admin</Link>
                            )}
                        </>
                    )}
                </nav>

                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <Link href="/dashboard" className="flex items-center gap-2 group">
                                {user.image ? (
                                    <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-700 group-hover:border-blue-400 transition-colors" />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                                        {user.name?.charAt(0) || user.email?.charAt(0) || '?'}
                                    </div>
                                )}
                                <div className="hidden md:block">
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-tight">{user.name || 'Usuario'}</p>
                                    <p className="text-xs text-slate-400 leading-tight">{user.role}</p>
                                </div>
                            </Link>
                            <form action={cerrarSesion}>
                                <button type="submit" className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all">
                                    Salir
                                </button>
                            </form>
                        </>
                    ) : (
                        <Link href="/login" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors">
                            Iniciar Sesión
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}
