'use client'
import { insertarEstudiante, modificarEstudiante } from "@/lib/actions";
import { useActionState, useEffect } from "react"
import { toast } from "sonner";

function Form({ estudiante, gruposIdNombre, asignaturasIdNombre }) {

    const [state, action, isPending] = useActionState(
        estudiante ? modificarEstudiante : insertarEstudiante,
        null
    )

    useEffect(() => {
        if (state?.success) {
            toast.success(state.success);
            // Optional: reset form if sticking around, but usually server actions redirect or revalidate.
            // If we are in 'create' mode (no estudiante), we might want to clear the form.
            if (!estudiante) {
                document.getElementById('form-estudiante')?.reset();
            }
        }
        if (state?.error) {
            toast.error(state.error);
        }
    }, [state, estudiante]);

    return (
        <form action={action} id="form-estudiante" className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-lg flex flex-col gap-4 max-w-md mx-auto border border-slate-100 dark:border-slate-800 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
                {estudiante ? 'Modificar Estudiante' : 'Nuevo Estudiante'}
            </h3>

            {estudiante && <input type="hidden" name="id" value={estudiante.id} />}

            <div className="flex flex-col gap-2">
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre del estudiante"
                    defaultValue={estudiante?.nombre}
                    className="p-3 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white transition-all disabled:opacity-50"
                    required
                    disabled={isPending}
                />
                <input
                    type="date"
                    name="fecha_nacimiento"
                    defaultValue={estudiante?.fecha_nacimiento ? new Date(estudiante.fecha_nacimiento).toISOString().split('T')[0] : ''}
                    className="p-3 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white transition-all disabled:opacity-50"
                    required
                    disabled={isPending}
                />
                <input
                    type="text"
                    name="tutor_legal"
                    placeholder="Tutor Legal"
                    defaultValue={estudiante?.tutor_legal}
                    className="p-3 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white transition-all disabled:opacity-50"
                    disabled={isPending}
                />
                <input
                    type="text"
                    name="foto"
                    placeholder="URL Foto"
                    defaultValue={estudiante?.foto}
                    className="p-3 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white transition-all disabled:opacity-50"
                    disabled={isPending}
                />

                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Grupo</label>
                    <select
                        name="grupoId"
                        defaultValue={estudiante?.grupoId || ""}
                        className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isPending}
                    >
                        <option value="">Seleccionar grupo</option>
                        {gruposIdNombre?.map((grupo) => (
                            <option value={grupo.id} key={grupo.id}>
                                {grupo.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 max-h-48 overflow-y-auto">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Asignaturas</label>
                    <div className="space-y-2">
                        {asignaturasIdNombre?.map((asignatura) => (
                            <label key={asignatura.id} className="flex items-center space-x-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 p-1.5 rounded transition-colors">
                                <input
                                    type="checkbox"
                                    name={asignatura.id}
                                    value={asignatura.id}
                                    defaultChecked={estudiante?.asignaturas?.some(a => a.id == asignatura.id)}
                                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                    disabled={isPending}
                                />
                                <span className="text-sm text-slate-700 dark:text-slate-300">{asignatura.nombre}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            <button
                type="submit"
                disabled={isPending}
                className="mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md active:scale-95 transform cursor-pointer dark:hover:bg-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isPending ? 'Guardando...' : (estudiante ? 'Guardar Cambios' : 'Crear Estudiante')}
            </button>
        </form>
    )
}

export default Form