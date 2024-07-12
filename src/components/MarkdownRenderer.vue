<script setup>
import MarkdownIt from "markdown-it";

const markdown = MarkdownIt();

const props = defineProps({
  source: {
    type: String,
    default: ""
  }
});
</script>

<template>
  <div class="mb-3" v-html="markdown.render(source)" />
</template>

<style scoped>

</style>
