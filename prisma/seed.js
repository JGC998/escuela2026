const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Clean existing data
    try {
        await prisma.asignatura.deleteMany();
        await prisma.estudiante.deleteMany();
        await prisma.grupo.deleteMany();
    } catch (e) {
        console.log('Error deleting data (maybe tables dont exist yet):', e.message);
    }

    // Create Grupos
    const grupoA = await prisma.grupo.create({
        data: {
            nombre: 'ESO 1A',
            tutor: 'Juan Perez',
            aula: '101',
        },
    });

    const grupoB = await prisma.grupo.create({
        data: {
            nombre: 'ESO 1B',
            tutor: 'Maria Garcia',
            aula: '102',
        },
    });

    console.log('Grupos created');

    // Create Estudiantes
    const est1 = await prisma.estudiante.create({
        data: {
            nombre: 'Carlos Lopez',
            fecha_nacimiento: new Date('2010-05-15'),
            tutor_legal: 'ambos padres',
            grupoId: grupoA.id,
            foto: 'https://placehold.co/100',
        },
    });

    const est2 = await prisma.estudiante.create({
        data: {
            nombre: 'Ana Martinez',
            fecha_nacimiento: new Date('2010-08-20'),
            tutor_legal: 'sólo madre',
            grupoId: grupoA.id,
            foto: 'https://placehold.co/100',
        },
    });

    const est3 = await prisma.estudiante.create({
        data: {
            nombre: 'Luis Rodriguez',
            fecha_nacimiento: new Date('2010-02-10'),
            tutor_legal: 'ambos padres',
            grupoId: grupoB.id,
            foto: 'https://placehold.co/100',
        },
    });

    console.log('Estudiantes created');

    // Create Asignaturas
    const mat = await prisma.asignatura.create({
        data: {
            nombre: 'Matemáticas',
            profesor: 'Rocío',
            horas_semana: 4,
            estudiantes: {
                connect: [{ id: est1.id }, { id: est2.id }],
            },
        },
    });

    const rob = await prisma.asignatura.create({
        data: {
            nombre: 'Robótica',
            profesor: 'Pedro',
            horas_semana: 2,
            estudiantes: {
                connect: [{ id: est2.id }, { id: est3.id }],
            },
        },
    });

    console.log('Asignaturas created');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
