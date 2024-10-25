import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createQuiz = async (data: any) => {
  return await prisma.quiz.create({
    data: {
      author: data.author,
      category: data.category,
      level: data.level,
      questions: {
        create: data.questions.map((q: any) => ({
          question: q.question,
          rightAnswer: q.rightAnswer,
          wrongAnswers: {
            create: q.wrongAnswers.map((answer: string) => ({
              answer,
            })),
          },
        })),
      },
    },
  });
};