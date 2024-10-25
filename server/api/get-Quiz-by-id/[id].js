import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const quizId = Number(event.context.params.id);

    // Vérifiez si l'ID est valide
    if (isNaN(quizId)) {
        return createError({ statusCode: 400, statusMessage: 'Invalid quiz ID' });
    }

    // Essayer de récupérer le quiz
    try {
        let quiz = await prisma.quiz.findFirst({
            where: { id: quizId }, // Utilisez quizId ici
            include: {
                questions: {
                    include: {
                        wrongAnswers: true,
                    },
                },
            },
        });

        // Si aucun quiz n'est trouvé
        if (!quiz) {
            return createError({ statusCode: 404, statusMessage: 'Quiz not found' });
        }

        // Retourner le quiz
        return quiz;

    } catch (error) {
        console.error('Error fetching quiz:', error);
        return createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
    }
});