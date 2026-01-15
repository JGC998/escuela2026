import { obtenerEstudiante } from '@/lib/data'
import { notFound } from 'next/navigation'

export default async function PaginaEstudiante({ params }) {
    const { id } = await params
    const estudiante = await obtenerEstudiante(id)

    if (!estudiante) {
        return notFound()
    }

    return (
        <div>
            <h1 className='text-4xl'>Detalle Estudiante {id}</h1>
            <div className='bg-blue-100 p-10'>
                <p>Nombre: {estudiante.nombre}</p>
                <p>Fecha Nacimiento: {new Date(estudiante.fecha_nacimiento).toLocaleDateString()}</p>
                <p>Tutor Legal: {estudiante.tutor_legal}</p>
                <p>Foto: {estudiante.foto}</p>
            </div>
        </div>
    )
}
