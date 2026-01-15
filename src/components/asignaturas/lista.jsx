'use client'
import Link from 'next/link'
import { use } from 'react'


export default function Lista({ promesaAsignaturas }) {

    const asignaturas = use(promesaAsignaturas)

    return (
        <div className='flex flex-wrap gap-10'>
            {asignaturas?.map((asignatura) => <Item asignatura={asignatura} key={asignatura.id} />)}
        </div>
    )
}


function Item({ asignatura }) {

    return (
        <Link href={`/asignaturas/${asignatura.id}`} >
            <div className='bg-blue-100'>
                <p>Nombre: {asignatura.nombre} </p>
                <p>Profesor: {asignatura.profesor}</p>
                <p>Horas: {asignatura.horas_semanales}</p>
            </div>
        </Link>
    )
}
