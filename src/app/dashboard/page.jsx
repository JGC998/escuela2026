import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { cerrarSesion } from '@/lib/auth-actions'
import UpdateProfileForm from './update-profile-form'

export default async function DashboardPage() {
    const session = await auth()

    if (!session?.user) {
        redirect('/login')
    }

    const user = session.user

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Mi Dashboard</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Gestiona tu perfil y configuración</p>
                    </div>
                    {user.role === 'ADMIN' && (
                        <a href="/admin" className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Panel Admin
                        </a>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <div className="md:col-span-1 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center space-y-4">
                        {user.image ? (
                            <img src={user.image} alt={user.name} className="w-24 h-24 rounded-full border-4 border-blue-100 dark:border-blue-900" />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                                {user.name?.charAt(0) || user.email?.charAt(0) || '?'}
                            </div>
                        )}
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user.name || 'Sin nombre'}</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">{user.email}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === 'ADMIN'
                                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                            }`}>
                            {user.role}
                        </span>
                        <form action={cerrarSesion} className="w-full">
                            <button type="submit" className="w-full py-2 px-4 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-sm font-medium transition-colors">
                                Cerrar Sesión
                            </button>
                        </form>
                    </div>

                    {/* Edit Profile */}
                    <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">Editar Perfil</h3>
                        <UpdateProfileForm user={{ id: user.id, name: user.name, email: user.email, image: user.image }} />
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-800">
                        <p className="text-xs text-slate-400 uppercase font-semibold tracking-wide mb-1">Rol</p>
                        <p className="font-medium text-slate-800 dark:text-slate-100">{user.role}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-800">
                        <p className="text-xs text-slate-400 uppercase font-semibold tracking-wide mb-1">Email</p>
                        <p className="font-medium text-slate-800 dark:text-slate-100 truncate">{user.email}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-800">
                        <p className="text-xs text-slate-400 uppercase font-semibold tracking-wide mb-1">Acceso</p>
                        <p className="font-medium text-slate-800 dark:text-slate-100">
                            {user.role === 'ADMIN' ? 'Total' : 'Solo lectura'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
