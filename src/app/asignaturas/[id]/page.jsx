import { obtenerAsignatura } from '@/lib/data'
import { notFound } from 'next/navigation'

export default async function PaginaAsignatura({ params }) {
    const { id } = await params
    const asignatura = await obtenerAsignatura(id)

    if (!asignatura) {
        return notFound()
    }

    return (
        <div>
            <h1 className='text-4xl'>Detalle Asignatura {id}</h1>
            <div className='bg-blue-100 p-10'>
                <p>Nombre: {asignatura.nombre} </p>
                <p>Profesor: {asignatura.profesor}</p>
                <p>Horas: {asignatura.horas_semanales}</p>
            </div>
        </div>
    )
}
