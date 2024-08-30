<script setup>
import AchievementDefiner from "@/components/AchievementDefiner.vue";

const props = defineProps({
  achievement: {
    type: String,
    default: ""
  },
  submitText: {
    type: String,
    default: "Save"
  }
});
</script>

<template>
  <div class="container">
    <AchievementDefiner :achievement="achievement" :submit-text="submitText"/>
  </div>
</template>

<style scoped>
</style>
