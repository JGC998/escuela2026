import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4 py-12">
          <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Bienvenido a <span className="text-blue-600 dark:text-blue-400">Escuela 2026</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Plataforma integral para la gestión educativa. Administra grupos, estudiantes y asignaturas desde un solo lugar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/grupos" className="group block">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 h-full">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Grupos</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Gestiona las clases, tutores y aulas asignadas.
              </p>
              <div className="mt-6 flex items-center text-blue-600 dark:text-blue-400 font-medium">
                Acceder &rarr;
              </div>
            </div>
          </Link>

          <Link href="/estudiantes" className="group block">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 h-full">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Estudiantes</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Administra la información de los alumnos y sus matrículas.
              </p>
              <div className="mt-6 flex items-center text-purple-600 dark:text-purple-400 font-medium">
                Acceder &rarr;
              </div>
            </div>
          </Link>

          <Link href="/asignaturas" className="group block">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 h-full">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Asignaturas</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Controla el plan de estudios, profesores y horarios.
              </p>
              <div className="mt-6 flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                Acceder &rarr;
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
