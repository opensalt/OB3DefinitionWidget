<script setup>
import AchievementDefiner from "@/components/AchievementDefiner.vue";

const props = defineProps({
  achievement: {
    type: String,
    default: ""
  }
});
</script>

<template>
  <main class="container">
    <AchievementDefiner :achievement="achievement"/>
  </main>
</template>

<style scoped>
</style>
