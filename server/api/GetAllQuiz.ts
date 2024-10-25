import { H3Event } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default eventHandler(async (event: H3Event) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        questions: {
          include: {
            wrongAnswers: true,
          },
        },
      },
    });

    // Retourner les quiz
    return quizzes;
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
})