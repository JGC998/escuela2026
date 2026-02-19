import Link from "next/link";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

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
          {!user && (
            <div className="flex justify-center gap-4 pt-4">
              <Link href="/login" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-500/25">
                Iniciar Sesión
              </Link>
              <Link href="/register" className="px-6 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
                Registrarse
              </Link>
            </div>
          )}
          {user && (
            <div className="flex justify-center gap-4 pt-4">
              <Link href="/dashboard" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-500/25 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                Mi Dashboard
              </Link>
              {user.role === 'ADMIN' && (
                <Link href="/admin" className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-red-500/25">
                  Panel Admin
                </Link>
              )}
            </div>
          )}
        </div>

        {user ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/grupos" className="group block">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 h-full">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Grupos</h2>
                <p className="text-slate-600 dark:text-slate-400">Gestiona las clases, tutores y aulas asignadas.</p>
                <div className="mt-6 flex items-center text-blue-600 dark:text-blue-400 font-medium">Acceder &rarr;</div>
              </div>
            </Link>
            <Link href="/estudiantes" className="group block">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 h-full">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Estudiantes</h2>
                <p className="text-slate-600 dark:text-slate-400">Administra la información de los alumnos y sus matrículas.</p>
                <div className="mt-6 flex items-center text-purple-600 dark:text-purple-400 font-medium">Acceder &rarr;</div>
              </div>
            </Link>
            <Link href="/asignaturas" className="group block">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 h-full">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Asignaturas</h2>
                <p className="text-slate-600 dark:text-slate-400">Controla el plan de estudios, profesores y horarios.</p>
                <div className="mt-6 flex items-center text-emerald-600 dark:text-emerald-400 font-medium">Acceder &rarr;</div>
              </div>
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-10 shadow-sm border border-slate-200 dark:border-slate-800 text-center">
            <div className="text-slate-400 dark:text-slate-500 text-6xl mb-4">🔒</div>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">Acceso restringido</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Debes iniciar sesión para acceder a la gestión escolar.</p>
            <Link href="/login" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors">
              Iniciar Sesión
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
