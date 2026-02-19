'use server'

import prisma from '@/lib/prisma'


// ------------------------- GRUPOS ------------------------- 

// ------------------------- GRUPOS ------------------------- 

export async function obtenerGrupos() {
    try {
        const grupos = await prisma.grupo.findMany({
            include: {
                estudiantes: {
                    select: {
                        id: true,
                        nombre: true
                    }
                }
            }
        })
        return JSON.parse(JSON.stringify(grupos))
    } catch (error) {
        console.log(error)
        return []
    }
}


export async function obtenerGrupo(id) {
    try {
        const grupo = await prisma.grupo.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                estudiantes: true
            }
        })
        return JSON.parse(JSON.stringify(grupo))
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function obtenerGruposIdNombre() {
    try {
        const grupos = await prisma.grupo.findMany({
            select: {
                id: true,
                nombre: true
            }
        })
        return JSON.parse(JSON.stringify(grupos))
    } catch (error) {
        console.log(error)
        return []
    }
}


// ------------------------- ESTUDIANTES -------------------------

export async function obtenerEstudiantes() {
    try {
        const estudiantes = await prisma.estudiante.findMany({
            include: {
                grupo: true,
                asignaturas: true
            }
        })
        return JSON.parse(JSON.stringify(estudiantes))
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function obtenerEstudiante(id) {
    try {
        const estudiante = await prisma.estudiante.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                grupo: true,
                asignaturas: true
            }
        })
        return JSON.parse(JSON.stringify(estudiante))
    } catch (error) {
        console.log(error)
        return null
    }
}


// ------------------------- ASIGNATURAS ------------------------- 

export async function obtenerAsignaturas() {
    try {
        const asignaturas = await prisma.asignatura.findMany({
            include: {
                estudiantes: true
            }
        })
        return JSON.parse(JSON.stringify(asignaturas))
    } catch (error) {
        console.log(error)
        return []
    }
}


export async function obtenerAsignatura(id) {
    try {
        const asignatura = await prisma.asignatura.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                estudiantes: true
            }
        })
        return JSON.parse(JSON.stringify(asignatura))
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function obtenerAsignaturasIdNombre() {
    try {
        const asignaturas = await prisma.asignatura.findMany({
            select: {
                id: true,
                nombre: true
            }
        })
        return JSON.parse(JSON.stringify(asignaturas))
    } catch (error) {
        console.log(error)
        return []
    }
}