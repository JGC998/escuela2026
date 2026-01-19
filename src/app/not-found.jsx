import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
            <div className="text-center space-y-6">
                <h1 className="text-9xl font-extrabold text-slate-900 dark:text-white tracking-widest">404</h1>
                <div className="bg-blue-600 text-sm rounded rotate-12 absolute px-2 text-white">
                    Página no encontrada
                </div>
                <div className="mt-8 text-lg text-slate-500 dark:text-slate-400">
                    Oops! Parece que te has perdido en los pasillos de la escuela.
                </div>
                <div className="mt-8">
                    <Link
                        href="/"
                        className="inline-block px-8 py-3 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring dark:hover:bg-blue-500"
                    >
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        </div>
    )
}