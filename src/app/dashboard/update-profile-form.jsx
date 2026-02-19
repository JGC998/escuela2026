'use client'

import { useState } from 'react'
import { toast } from 'sonner'

export default function UpdateProfileForm({ user }) {
    const [name, setName] = useState(user?.name || '')
    const [image, setImage] = useState(user?.image || '')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch(`/api/users/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, image }),
            })

            if (!res.ok) throw new Error('Error al actualizar')
            toast.success('Perfil actualizado correctamente')
        } catch (error) {
            toast.error('Error al actualizar el perfil')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Nombre completo</label>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">URL de foto (opcional)</label>
                <input
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    type="url"
                    placeholder="https://ejemplo.com/foto.jpg"
                    className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Email</label>
                <input
                    value={user?.email || ''}
                    type="email"
                    disabled
                    className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                />
                <p className="text-xs text-slate-400 mt-1">El email no se puede modificar</p>
            </div>
            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
            >
                {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
        </form>
    )
}
