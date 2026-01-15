import ListaEstudiantes from '@/components/estudiantes/lista'
import { obtenerEstudiantes } from '@/lib/data'
import { Suspense } from 'react'


function PaginaEstudiantes() {

    const promesaEstudiantes = obtenerEstudiantes()

    return (
        <div>
            <h1 className='text-4xl'>PaginaEstudiantes</h1>

            <Suspense fallback={<p className='text-text-blue-300 text-2xl'>Cargando...</p>}>
                <ListaEstudiantes
                    promesaEstudiantes={promesaEstudiantes}
                />
            </Suspense>
        </div>
    )
}

export default PaginaEstudiantes
