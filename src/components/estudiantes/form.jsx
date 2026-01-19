import { insertarEstudiante, insertarGrupo } from "@/lib/actions";

function Form() {
    return (
        <form action={insertarEstudiante} className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-lg flex flex-col gap-4 max-w-md mx-auto border border-slate-100 dark:border-slate-800 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">Nuevo Estudiante</h3>
            <div className="flex flex-col gap-2">
                <input type="text" name="nombre" placeholder="Nombre del estudiante" className="p-3 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white transition-all" required />
                <input type="date" name="fecha_nacimiento" className="p-3 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white transition-all" required />
                <input type="text" name="tutor_legal" placeholder="Tutor Legal" className="p-3 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white transition-all" />
                <input type="number" name="id_grupo" placeholder="ID Grupo (opcional)" className="p-3 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white transition-all" />
                <input type="text" name="foto" placeholder="URL Foto" className="p-3 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white transition-all" />
            </div>
            <button type="submit" className="mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md active:scale-95 transform cursor-pointer dark:hover:bg-blue-500">
                Crear Estudiante
            </button>
        </form>
    )
}

export default Form