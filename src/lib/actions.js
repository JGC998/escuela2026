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

export async function insertarEstudiante(formData) {
    const nombre = formData.get('nombre');
    const fecha_nacimiento = new Date(formData.get('fecha_nacimiento'));
    const tutor_legal = formData.get('tutor_legal');
    const id_grupo = Number(formData.get('id_grupo'));
    const foto = formData.get('foto');

    try {
        await prisma.estudiante.create({
            data: {
                nombre,
                fecha_nacimiento,
                tutor_legal,
                grupoId: id_grupo,
                foto
            }
        })
    } catch (error) {
        console.log(error);
    }

    revalidatePath('/estudiantes');
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
