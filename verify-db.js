const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    try {
        const students = await prisma.estudiante.findMany({
            include: {
                grupo: true,
                asignaturas: true
            }
        })
        console.log('--- ESTUDIANTES ---')
        console.log(JSON.stringify(students, null, 2))

        const groups = await prisma.grupo.findMany()
        console.log('--- GRUPOS ---')
        console.log(groups.length)

        const subjects = await prisma.asignatura.findMany()
        console.log('--- ASIGNATURAS ---')
        console.log(subjects.length)

    } catch (error) {
        console.error('ERROR:', error)
    } finally {
        await prisma.$disconnect()
    }
}

main()
