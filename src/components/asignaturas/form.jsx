import { insertarAsignatura } from "@/lib/actions";

function Form() {
    return (
        <form action={insertarAsignatura} className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-lg flex flex-col gap-4 max-w-md mx-auto border border-slate-100 dark:border-slate-800 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">Nueva Asignatura</h3>
            <div className="flex flex-col gap-2">
                <input type="text" name="nombre" placeholder="Nombre de la asignatura" className="p-3 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white transition-all" />
                <input type="number" name="horas_semanales" placeholder="Horas semanales" className="p-3 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white transition-all" />
                <input type="text" name="profesor" placeholder="Profesor" className="p-3 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white transition-all" />
            </div>
            <button type="submit" className="mt-4 bg-emerald-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow-md active:scale-95 transform cursor-pointer dark:hover:bg-emerald-500">
                Crear Asignatura
            </button>
        </form>
    )
}

export default Form
