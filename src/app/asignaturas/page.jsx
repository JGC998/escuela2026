import Link from 'next/link'
import ListaAsignaturas from '@/components/asignaturas/lista'
import { obtenerAsignaturas } from '@/lib/data'
import { Suspense } from 'react'
import Form from '@/components/asignaturas/form'
import { auth } from '@/auth'


async function PaginaAsignaturas() {
    const session = await auth()
    const isAdmin = session?.user?.role === 'ADMIN'

    const promesaAsignaturas = obtenerAsignaturas()

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 font-sans transition-colors duration-300">
            <div className="max-w-6xl mx-auto space-y-12">
                <div className="text-center space-y-4 relative">
                    <Link href="/" className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        <span className="sr-only">Volver</span>
                    </Link>
                    <h1 className='text-4xl font-bold text-slate-900 dark:text-white tracking-tight'>Gestión de Asignaturas</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg">Controla el plan de estudios, profesores y horarios</p>
                </div>

                <div className={`flex flex-col ${isAdmin ? 'md:flex-row' : ''} gap-12 items-start`}>
                    {isAdmin && (
                        <div className="w-full md:w-1/3 sticky top-8">
                            <Form />
                        </div>
                    )}

                    <div className={`w-full ${isAdmin ? 'md:w-2/3' : ''}`}>
                        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6 border-b pb-2 border-slate-200 dark:border-slate-800">Lista de Asignaturas</h2>
                        <Suspense fallback={
                            <div className="flex justify-center p-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                            </div>
                        }>
                            <ListaAsignaturas promesaAsignaturas={promesaAsignaturas} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaginaAsignaturas
