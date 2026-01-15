import { obtenerGrupo } from '@/lib/data'
import { Suspense } from 'react'


async function PaginaGrupo({ params }) {
    const { id } = await params

    return (
        <div>
            <h1 className='text-4xl'>Grupo</h1>

            <Suspense fallback={<p className='text-2xl text-blue-300'>Cargando...</p>}>
                <Grupo id={id} />
            </Suspense>

        </div>
    )
}

export default PaginaGrupo


async function Grupo({ id }) {
    const grupo = await obtenerGrupo(id)

    if (!grupo) return <p className="text-red-500">Grupo no encontrado</p>

    return (
        <>
            <p>{grupo.nombre}</p>
            <p>{grupo.tutor}</p>
            <p>{grupo.aula}</p>
        </>
    )
}