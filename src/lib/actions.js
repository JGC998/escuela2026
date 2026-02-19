'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function insertarGrupo(formData) {
    const nombre = formData.get('nombre');
    const tutor = formData.get('tutor');
    const aula = formData.get('aula');

    try {
        await prisma.grupo.create({
            data: {
                nombre,
                tutor,
                aula
            }
        })
    } catch (error) {
        console.log(error);
    }

    revalidatePath('/grupos');
}

// ------------------------------ ESTUDIANTES ------------------------------
export async function insertarEstudiante(prevState, formData) {
    const nombre = formData.get('nombre');
    const tutor_legal = formData.get('tutor_legal');
    const fecha_nacimiento = new Date(formData.get('fecha_nacimiento'));
    const foto = formData.get('foto');

    // GRUPO - ESTUDIANTE (1:N)
    const grupoId = formData.get('grupoId') ? Number(formData.get('grupoId')) : null;

    // ESTUDIANTE - ASIGNATURAS (N:M)
    // Array con IDs de todas las asignaturas
    const asignaturasIDs = await prisma.asignatura.findMany({
        select: { id: true }
    });

    const connect = asignaturasIDs.filter(asignatura => formData.get(asignatura.id) !== null);
    const asignaturas = { connect };

    try {
        await prisma.estudiante.create({
            data: {
                nombre,
                tutor_legal,
                fecha_nacimiento,
                foto,
                grupoId,
                asignaturas
            }
        });
        revalidatePath('/estudiantes');
        return { success: 'Operación realizada con éxito' };
    } catch (error) {
        console.log(error);
        return { error: error.message.split('\n').pop() };
    }
}

export async function modificarEstudiante(prevState, formData) {
    const id = Number(formData.get('id'));
    const nombre = formData.get('nombre');
    const tutor_legal = formData.get('tutor_legal');
    const fecha_nacimiento = new Date(formData.get('fecha_nacimiento'));
    const foto = formData.get('foto');

    // GRUPO - ESTUDIANTE (1:N)
    const grupoId = formData.get('grupoId') ? Number(formData.get('grupoId')) : null;

    // ESTUDIANTE - ASIGNATURAS (N:M)
    const asignaturasIDs = await prisma.asignatura.findMany({
        select: { id: true }
    });

    const connect = asignaturasIDs.filter(asignatura => formData.get(asignatura.id) !== null);
    const disconnect = asignaturasIDs.filter(asignatura => formData.get(asignatura.id) === null);
    const asignaturas = { connect, disconnect };

    try {
        await prisma.estudiante.update({
            where: { id },
            data: {
                nombre,
                tutor_legal,
                fecha_nacimiento,
                foto,
                grupoId,
                asignaturas
            }
        });
        revalidatePath('/estudiantes');
        return { success: 'Operación realizada con éxito' };
    } catch (error) {
        console.log(error);
        return { error: error.message.split('\n').pop() };
    }
}

export async function eliminarEstudiante(prevState, formData) {
    const id = Number(formData.get('id'));

    try {
        await prisma.estudiante.delete({
            where: { id }
        });
        revalidatePath('/estudiantes');
        return { success: 'Operación realizada con éxito' };
    } catch (error) {
        console.log(error);
        return { error: error.message.split('\n').pop() };
    }
}

export async function insertarAsignatura(formData) {
    const nombre = formData.get('nombre');
    const horas_semanales = Number(formData.get('horas_semanales'));
    const profesor = formData.get('profesor');

    try {
        await prisma.asignatura.create({
            data: {
                nombre,
                horas_semanales,
                profesor
            }
        })
    } catch (error) {
        console.log(error);
    }

    revalidatePath('/asignaturas');
}
