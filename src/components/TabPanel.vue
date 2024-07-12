<script setup>
import {ref} from "vue";

const isActive = ref(true);

const props = defineProps({
  title: {
    type: String,
    default: "Tab"
  }
});
</script>

<template>
  <div v-show="isActive">
    <slot></slot>
  </div>
</template>

<style scoped>

</style>
