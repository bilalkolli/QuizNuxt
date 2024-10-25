<script setup>
import { ref, watch } from 'vue';

const name = ref('')
const category = ref('')
const questionsCount = ref(null)
const difficulty = ref('')
const quiz = ref([{ question: '', rightAnswer: '', wrongAnswers: ['', ''] }])
const successMessage = ref('')
const showPopup = ref(false)

watch(questionsCount, (newCount) => {
  quiz.value = Array.from({ length: newCount }, (_, index) => ({
    question: '',
    rightAnswer: '',
    wrongAnswers: ['', '']
  }))
})

async function handleFormSubmit() {
  const quizData = {
    author: name.value,
    category: category.value,
    level: difficulty.value,
    questions: quiz.value.map(q => ({
      question: q.question,
      rightAnswer: q.rightAnswer,
      wrongAnswers: q.wrongAnswers
    }))
  }

  try {
    const res = await $fetch('/api/CreateQuiz', {
      method: 'POST',
      body: quizData
    })
    successMessage.value = `Quiz créé avec succès ! Cliquez ici pour le voir : 
      <a href="/quiz/${res.id}" class="text-blue-600 underline">Voir le Quiz</a>`;
    showPopup.value = true
  } catch (error) {
    console.error('Erreur lors de la création du quiz :', error)
  }
}

function closePopup() {
  showPopup.value = false
}
</script>

<template>
  <form @submit.prevent="handleFormSubmit" class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-6 text-center">Create Your Quiz</h2>
    
    <div class="mb-5">
      <input
        v-model="name"
        type="text"
        placeholder="Name"
        required
        class="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-blue-600 ring-gray-100"
      />
    </div>

    <div class="mb-5">
      <select v-model="difficulty" id="difficulty" class="w-full px-4 py-3 border-2 rounded-md">
        <option class="text-gray-600" value="" disabled selected hidden>Level</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
    </div>

    <div class="mb-5">
      <input
        v-model="category"
        type="text"
        placeholder="Category"
        required
        class="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-blue-600 ring-gray-100"
      />
    </div>

    <div class="mb-5">
      <input
        v-model.number="questionsCount"
        type="number"
        placeholder="Number of questions"
        required
        min="1"
        max="5"
        class="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-blue-600 ring-gray-100"
      />
    </div>

    <div class="mb-5">
      <div v-for="(questionObj, index) in quiz" v-if="questionsCount" :key="index" class="mb-6 p-4 border rounded-md bg-gray-50 shadow-md">
        <label class="block mb-2 font-medium">{{ index + 1 }}.</label>
        <input
          v-model="questionObj.question"
          type="text"
          placeholder="Type your question here"
          required
          class="w-full mb-2 px-4 py-2 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-blue-600 ring-gray-100"
        />
        <input
          v-model="questionObj.rightAnswer"
          type="text"
          placeholder="Type the right answer"
          required
          class="w-full mb-2 px-4 py-2 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-blue-600 ring-gray-100"
        />
        <input
          v-model="questionObj.wrongAnswers[0]"
          type="text"
          placeholder="Type a wrong answer"
          required
          class="w-full mb-2 px-4 py-2 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-blue-600 ring-gray-100"
        />
        <input
          v-model="questionObj.wrongAnswers[1]"
          type="text"
          placeholder="Type a wrong answer"
          required
          class="w-full mb-2 px-4 py-2 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-blue-600 ring-gray-100"
        />
      </div>
    </div>
    
    <LandingButton type="submit" size="lg" block>Create Your Quiz</LandingButton>

    <!-- Popup -->
    <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
        <h3 class="text-xl font-bold mb-4">Quiz Created!</h3>
        <div class="mb-4" v-html="successMessage"></div>
        <button @click="closePopup" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
          Close
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped>
.error {
  color: red
}
</style>