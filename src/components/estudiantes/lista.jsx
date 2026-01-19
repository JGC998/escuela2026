'use client'
import Link from 'next/link'
import { use } from 'react'


export default function Lista({ promesaEstudiantes }) {

    const estudiantes = use(promesaEstudiantes)

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {estudiantes?.map((estudiante) => <Item estudiante={estudiante} key={estudiante.id} />)}
        </div>
    )
}


function Item({ estudiante }) {

    return (
        <Link href={`/estudiantes/${estudiante.id}`} className="block group h-full">
            <div className='bg-white p-6 rounded-xl shadow-sm border border-slate-200 group-hover:shadow-md group-hover:border-purple-300 transition-all duration-200 h-full flex flex-col justify-between'>
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-purple-600 transition-colors">{estudiante.nombre}</h3>
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
            </div>
        </Link>
    )
}
