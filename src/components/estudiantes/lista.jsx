'use client'
import Link from 'next/link'
import { use } from 'react'
import { eliminarEstudiante } from "@/lib/actions";


export default function Lista({ promesaEstudiantes }) {

    const estudiantes = use(promesaEstudiantes)
    console.log('Estudiantes en lista:', estudiantes)

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {estudiantes?.map((estudiante) => <Item estudiante={estudiante} key={estudiante.id} />)}
        </div>
    )
}


function Item({ estudiante }) {
    return (
        <div className='bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all duration-200 h-full flex flex-col justify-between'>
            <div>
                <div className="flex justify-between items-start mb-4">
                    <Link href={`/estudiantes/${estudiante.id}`} className="text-lg font-bold text-slate-800 hover:text-blue-600 transition-colors">
                        {estudiante.nombre}
                    </Link>
                </div>
                <div className="text-slate-600 space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                        <span className="font-medium text-slate-500">Nacimiento:</span>
                        {new Date(estudiante.fecha_nacimiento).toLocaleDateString()}
                    </p>
                    <p className="flex items-center gap-2">
                        <span className="font-medium text-slate-500">Tutor Legal:</span>
                        {estudiante.tutor_legal}
                    </p>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end gap-2">
                <Link
                    href={`/estudiantes/${estudiante.id}/modificar`}
                    className="px-3 py-1.5 text-sm bg-slate-100 text-slate-600 rounded-md hover:bg-slate-200 transition-colors"
                >
                    Editar
                </Link>
                <form action={eliminarEstudiante}>
                    <input type="hidden" name="id" value={estudiante.id} />
                    <button
                        type="submit"
                        className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors cursor-pointer"
                    >
                        Eliminar
                    </button>
                </form>
            </div>
        </div>
    )
}
