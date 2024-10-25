<script setup>
definePageMeta({
  layout: "landing"
})
</script>

<template>
  <LandingContainer>
    <LandingSectionhead>
      <template v-slot:title>Create your own Quiz</template>
      <template v-slot:desc>Help people to improve theyre general knowledge.</template>
    </LandingSectionhead>

    <div class="mx-auto max-w-4xl mt-16">
      <div>
        <LandingContactform />
      </div>
    </div>
  </LandingContainer>
</template>