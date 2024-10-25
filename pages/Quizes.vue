<template>
  <LandingContainer>
    <LandingSectionhead>
      <template v-slot:title>📚 Explore Our Quizzes</template>
      <template v-slot:desc>Find our General Knowledge quizzes sorted by difficulty levels.</template>
    </LandingSectionhead>

    <div class="mt-16 space-y-16">
      <div v-for="(level, index) in quizLevels" :key="index">
        <h2 class="text-2xl lg:text-4xl lg:tracking-tight text-gray-800">{{ level.title }}</h2>
        <p class="text-lg italic mt-2 text-gray-600">{{ level.description }}</p>

        <div v-for="quiz in quizzes.filter(q => q.level === level.key)" :key="quiz.id" class="mt-5">
          <NuxtLink
            :to="`/quiz/${quiz.id}`"
            class="flex items-center font-semibold border border-neutral-300 bg-white p-4 rounded-lg shadow hover:bg-gray-50 transition duration-300"
          >
            <p class="text-gray-700 font-medium">{{ quiz.createdAt.slice(0, 10).replace(/-/g, '/') }}</p>
            <p class="mx-5 bg-violet-600 text-white p-1.5 rounded-lg">{{ quiz.category }}</p>
            <p class="text-left border-b-2 border-slate-950">Quiz #{{quiz.id}} by {{ quiz.author }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </LandingContainer>
</template>

<script setup>
definePageMeta({
  layout: "landing"
})

const { data: quizzes } = await useFetch('/api/GetAllQuiz')

const quizLevels = [
  { key: 'Easy', title: 'General Culture - Easy', description: 'Ideal for testing your basic knowledge without taking too much on the chin.' },
  { key: 'Medium', title: 'General Culture - Medium', description: 'Turn up the heat to challenge your general knowledge.' },
  { key: 'Hard', title: 'General Culture - Hard', description: 'Get down to business by answering our challenging questions.' }
]
</script>