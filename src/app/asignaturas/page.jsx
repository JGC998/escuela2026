import ListaAsignaturas from '@/components/asignaturas/lista'
import { obtenerAsignaturas } from '@/lib/data'
import { Suspense } from 'react'


function PaginaAsignaturas() {

    const promesaAsignaturas = obtenerAsignaturas()

    return (
        <div>
            <h1 className='text-4xl'>PaginaAsignaturas</h1>

            <Suspense fallback={<p className='text-text-blue-300 text-2xl'>Cargando...</p>}>
                <ListaAsignaturas
                    promesaAsignaturas={promesaAsignaturas}
                />
            </Suspense>
        </div>
    )
}

export default PaginaAsignaturas
