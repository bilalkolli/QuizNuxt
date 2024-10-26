<template>
  <LandingContainer>
    <LandingSectionhead>
      <template v-slot:title>Quiz #{{ route.params.id }}</template>
      <template v-slot:desc>Try to answer all the questions!</template>
    </LandingSectionhead>

    <div>
      <h2 class="text-2xl font-bold mt-6 mb-4">Questions</h2>

      <div v-if="status === 'pending'" v-for="index in 3" :key="index" class="bg-white shadow-lg rounded-lg p-4 mb-4">
        <div class="p-2 h-8 w-1/3 bg-gray-300 rounded mb-5"></div>
        <ul class="list-none pl-0 animate-pulse" v-for="index in 3">
          <li :key="index" class="mb-2 p-3 h-2 w-1/5 bg-gray-300 rounded"></li>
        </ul>
      </div>

      <div v-else v-for="question in quiz.questions" :key="question.id" class="bg-white shadow-lg rounded-lg p-4 mb-4">
        <h3 class="font-semibold text-lg mb-2">{{ question.question }}</h3>
        <ul class="list-none pl-0">
          <li
            v-for="answer in shuffleAnswers(question)"
            :key="answer"
            @click="selectAnswer(question.id, answer)"
            :class="getAnswerClass(question.id, answer)"
            class="cursor-pointer hover:bg-gray-200 rounded p-2 transition duration-300"
          >
            {{ answer }}
          </li>
        </ul>
      </div>
      <div class="mt-4">
        <p class="font-bold text-lg">Score: <span class="text-blue-600">{{ score }}</span></p>
        <button @click="submitQuiz" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
          Submit Quiz
        </button>
      </div>
    </div>

    <!-- Popup -->
    <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
        <h3 class="text-xl font-bold mb-4">Quiz Completed!</h3>
        <p class="mb-4">Your score is: <span class="font-semibold text-blue-600">{{ score }}</span></p>
        <p class="mb-6">Thank you for participating!</p>
        <button @click="closePopup" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
          Close
        </button>
      </div>
    </div>
  </LandingContainer>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useFetch } from '#app'
import { ref } from 'vue'

definePageMeta({
  layout: "landing"
})

const route = useRoute()
const { data: quiz, status } = await useLazyFetch(`/api/get-Quiz-by-id/${route.params.id}`)

const selectedAnswers = ref({})
const score = ref(0)
const showPopup = ref(false)

function selectAnswer(questionId, answer) {
  if (!isAnswered(questionId)) {
    const question = quiz.value.questions.find(q => q.id === questionId)
    
    if (question && question.rightAnswer === answer) {
      score.value++
    }
    
    selectedAnswers.value[questionId] = answer
  }
}

function getAnswerClass(questionId, answer) {
  const question = quiz.value.questions.find(q => q.id === questionId)
  
  if (isAnswered(questionId)) {
    if (answer === question.rightAnswer) {
      return 'bg-green-500 text-white'
    } else if (answer === selectedAnswers.value[questionId]) {
      return 'bg-red-500 text-white'
    }
  }
  return 'text-gray-800'
}

function isAnswered(questionId) {
  return !!selectedAnswers.value[questionId]
}

function shuffleAnswers(question) {
  const answers = [question.rightAnswer, ...question.wrongAnswers.map(w => w.answer)]
  return answers.sort(() => Math.random() - 0.5)
}

function submitQuiz() {
  showPopup.value = true
}

function closePopup() {
  showPopup.value = false
}
</script>

<style scoped>
.error {
  color: red
}
</style>