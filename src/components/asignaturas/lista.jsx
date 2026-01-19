'use client'
import Link from 'next/link'
import { use } from 'react'


export default function Lista({ promesaAsignaturas }) {

    const asignaturas = use(promesaAsignaturas)

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {asignaturas?.map((asignatura) => <Item asignatura={asignatura} key={asignatura.id} />)}
        </div>
    )
}


function Item({ asignatura }) {

    return (
        <Link href={`/asignaturas/${asignatura.id}`} className="block group h-full">
            <div className='bg-white p-6 rounded-xl shadow-sm border border-slate-200 group-hover:shadow-md group-hover:border-emerald-300 transition-all duration-200 h-full flex flex-col justify-between'>
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{asignatura.nombre}</h3>
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{asignatura.horas_semanales} h/sem</span>
                    </div>
                    <div className="text-slate-600 space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                            <span className="font-medium text-slate-500">Profesor:</span>
                            {asignatura.profesor}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
