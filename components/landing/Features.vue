<script setup>
const features = [
  {
    title: "Bring Your Own Knowledge",
    description:
      "Easily create quizzes for friends, family, or students. Choose your topics and add questions to engage and challenge their knowledge!",
    icon: "bx:bxs-briefcase"
  },
  {
    title: "Test Your Knowledge and Culture",
    description:
      "Challenge yourself with interactive quizzes crafted by a community of contributors, ensuring diverse and engaging content.",
    icon: "bx:bxs-user"
  },
  {
  title: "On-Demand Quiz Components",
  description:
    "Need interactivity? QuizNuxt automatically activates quiz components when they are visible, ensuring smooth performance and an engaging experience for users.",
  icon: "bx:bxs-data"
  }
]
</script>

<template>
  <div class="mt-16 md:mt-0">
    <h2 class="text-4xl lg:text-5xl font-bold lg:tracking-tight">
      Everything You Need for an Engaging Quiz Experience
    </h2>
    <p class="text-lg mt-4 text-slate-600">
      Nuxt Powers Your Quiz: Combining Top Tools with Innovative Features
    </p>
  </div>

  <div class="grid sm:grid-cols-2 md:grid-cols-3 mt-16 gap-16">
    <div v-for="item of features" class="flex gap-4 items-start">
      <div class="mt-1 bg-black rounded-full p-2 w-8 h-8 shrink-0">
        <Icon class="text-white" :name="item.icon" />
      </div>
      <div>
        <h3 class="font-semibold text-lg">{{ item.title }}</h3>
        <p class="text-slate-500 mt-2 leading-relaxed">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>
