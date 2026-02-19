import Form from "@/components/estudiantes/form";
import { obtenerAsignaturasIdNombre, obtenerEstudiante, obtenerGruposIdNombre } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function PaginaModificarEstudiante({ params }) {
    const { id } = await params
    const estudiante = await obtenerEstudiante(id)
    const gruposIdNombre = await obtenerGruposIdNombre()
    const asignaturasIdNombre = await obtenerAsignaturasIdNombre()

    if (!estudiante) {
        return notFound()
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-slate-800 dark:text-white">Modificar Estudiante</h1>
            <Form
                estudiante={estudiante}
                gruposIdNombre={gruposIdNombre}
                asignaturasIdNombre={asignaturasIdNombre}
            />
        </div>
    )
}
