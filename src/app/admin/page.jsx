'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'

export default function AdminPage() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [editingUser, setEditingUser] = useState(null)
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'USER' })

    async function loadUsers() {
        setLoading(true)
        const res = await fetch('/api/users')
        const data = await res.json()
        setUsers(Array.isArray(data) ? data : [])
        setLoading(false)
    }

    useEffect(() => { loadUsers() }, [])

    async function handleCreate(e) {
        e.preventDefault()
        const res = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        if (res.ok) {
            toast.success('Usuario creado correctamente')
            setShowCreateForm(false)
            setFormData({ name: '', email: '', password: '', role: 'USER' })
            loadUsers()
        } else {
            const err = await res.json()
            toast.error(err.error || 'Error al crear usuario')
        }
    }

    async function handleUpdate(e) {
        e.preventDefault()
        const res = await fetch(`/api/users/${editingUser.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: editingUser.name, role: editingUser.role, image: editingUser.image })
        })
        if (res.ok) {
            toast.success('Usuario actualizado')
            setEditingUser(null)
            loadUsers()
        } else {
            toast.error('Error al actualizar')
        }
    }

    async function handleDelete(id, name) {
        if (!confirm(`¿Eliminar al usuario "${name}"?`)) return
        const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
        if (res.ok) {
            toast.success('Usuario eliminado')
            loadUsers()
        } else {
            const err = await res.json()
            toast.error(err.error || 'Error al eliminar')
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-red-50 dark:from-slate-950 dark:to-red-950/20 p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Panel de Administración</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Gestión de usuarios del sistema</p>
                    </div>
                    <button
                        onClick={() => { setShowCreateForm(!showCreateForm); setEditingUser(null) }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Nuevo Usuario
                    </button>
                </div>

                {/* Create Form */}
                {showCreateForm && (
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Crear Nuevo Usuario</h2>
                        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Nombre</label>
                                <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} type="text" placeholder="Nombre completo"
                                    className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Email *</label>
                                <input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} type="email" required placeholder="email@ejemplo.com"
                                    className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Contraseña *</label>
                                <input value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} type="password" required placeholder="Mínimo 6 caracteres"
                                    className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Rol</label>
                                <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                            </div>
                            <div className="md:col-span-2 flex gap-3">
                                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors">Crear Usuario</button>
                                <button type="button" onClick={() => setShowCreateForm(false)} className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium rounded-lg transition-colors">Cancelar</button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Edit Form */}
                {editingUser && (
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-amber-200 dark:border-amber-800">
                        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Editar Usuario</h2>
                        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Nombre</label>
                                <input value={editingUser.name || ''} onChange={e => setEditingUser({ ...editingUser, name: e.target.value })} type="text"
                                    className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Email (no editable)</label>
                                <input value={editingUser.email} disabled type="email"
                                    className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Rol</label>
                                <select value={editingUser.role} onChange={e => setEditingUser({ ...editingUser, role: e.target.value })}
                                    className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500">
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                            </div>
                            <div className="md:col-span-2 flex gap-3">
                                <button type="submit" className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold rounded-lg transition-colors">Guardar Cambios</button>
                                <button type="button" onClick={() => setEditingUser(null)} className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium rounded-lg transition-colors">Cancelar</button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Users Table */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Usuarios Registrados</h2>
                        <p className="text-sm text-slate-400 mt-0.5">{users.length} usuario{users.length !== 1 ? 's' : ''} en total</p>
                    </div>
                    {loading ? (
                        <div className="flex justify-center p-12">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                        </div>
                    ) : users.length === 0 ? (
                        <div className="text-center p-12 text-slate-400">No hay usuarios registrados</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 dark:bg-slate-800">
                                    <tr>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Usuario</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Email</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Rol</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Registro</th>
                                        <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {users.map(user => (
                                        <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {user.image ? (
                                                        <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full" />
                                                    ) : (
                                                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                                                            {(user.name || user.email)?.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{user.name || '—'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{user.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'ADMIN'
                                                    ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                                    }`}>{user.role}</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-400">
                                                {new Date(user.createdAt).toLocaleDateString('es-ES')}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => { setEditingUser(user); setShowCreateForm(false) }}
                                                        className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    <button onClick={() => handleDelete(user.id, user.name || user.email)}
                                                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
