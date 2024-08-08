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
  <div class="container">
    <AchievementDefiner :achievement="achievement"/>
  </div>
</template>

<style scoped>
</style>
