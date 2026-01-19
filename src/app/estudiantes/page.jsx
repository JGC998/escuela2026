import ListaEstudiantes from '@/components/estudiantes/lista'
import { obtenerEstudiantes } from '@/lib/data'
import { Suspense } from 'react'
import Form from '@/components/estudiantes/form'


function PaginaEstudiantes() {

    const promesaEstudiantes = obtenerEstudiantes()

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 font-sans transition-colors duration-300">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className='text-4xl font-bold text-slate-900 dark:text-white tracking-tight'>Gestión de Estudiantes</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg">Administra la información de los alumnos y sus matrículas</p>
                </div>

                <div className="flex flex-col md:flex-row gap-12 items-start">
                    <div className="w-full md:w-1/3 sticky top-8">
                        <Form />
                    </div>

                    <div className="w-full md:w-2/3">
                        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6 border-b pb-2 border-slate-200 dark:border-slate-800">Lista de Estudiantes</h2>
                        <Suspense fallback={
                            <div className="flex justify-center p-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                            </div>
                        }>
                            <ListaEstudiantes
                                promesaEstudiantes={promesaEstudiantes}
                            />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaginaEstudiantes
