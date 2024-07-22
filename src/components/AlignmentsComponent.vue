<script setup>
import AlignmentComponent from "@/components/AlignmentComponent.vue";

const alignment = defineModel({ default: {} });
</script>

<template>
  <AlignmentComponent v-model="alignment"/>
</template>

<style scoped>

</style>
