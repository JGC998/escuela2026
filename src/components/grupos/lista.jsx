'use client'
import Link from 'next/link'
import { use } from 'react'


export default function Lista({ promesaGrupos }) {

    const grupos = use(promesaGrupos)

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6'>
            {grupos?.map((grupo) => <Item grupo={grupo} key={grupo.id} />)}
            <div className="col-span-full flex justify-end mt-4">
                <button onClick={() => alert('hola')} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 transition-colors cursor-pointer">
                    Acción extra
                </button>
            </div>
        </div>
    )
}


function Item({ grupo }) {

    return (
        <Link href={`/grupos/${grupo.id}`} className="block group h-full">
            <div className='bg-white p-6 rounded-xl shadow-sm border border-slate-200 group-hover:shadow-md group-hover:border-blue-300 transition-all duration-200 h-full flex flex-col justify-between'>
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{grupo.nombre}</h3>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{grupo.aula}</span>
                    </div>
                    <div className="text-slate-600 space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                            <span className="font-medium text-slate-500">Tutor:</span>
                            {grupo.tutor}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}