import { H3Event } from 'h3';
import { createQuiz } from '~/server/database/repository/quizRepository'

export default eventHandler(async (event: H3Event) => {
  try {
    const data = await readBody(event); // Récupérer le corps de la requête

    // Appeler la fonction de repository pour créer le quiz
    const quizData = await createQuiz(data);

    return quizData; // Retourner les données du quiz créé

  } catch (error) {
    console.error(error); // Afficher l'erreur dans la console
    return { message: 'Erreur lors de la création du quiz.' }; // Message d'erreur générique
  }
})