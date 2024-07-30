<script setup>
import AchievementDefiner from "@/components/AchievementDefiner.vue";

const props = defineProps({
  achievement: {
    type: String,
    default: ""
  }
});

try {
  const a1 = document.getElementById('ob3-definer').dataset;
  props.achievement = a1.achievement || '';
} catch (e) {}
</script>

<template>
  <main class="container">
    <AchievementDefiner :achievement="achievement"/>
  </main>
</template>

<style scoped>
</style>
