<script setup>
import AlignmentsComponent from "@/components/AlignmentsComponent.vue";
import ResultDescription from "@/components/ResultDescription.vue";

const model = defineModel({ default: {} });
</script>

<template>
    <div class="tab-pane fade show active" id="tab-alignments" role="tabpanel" aria-labelledby="alignments-tab">
      <AlignmentsComponent v-model="model.alignment" title="Badge Alignments" />

      <hr />

      <ResultDescription v-model="model.resultDescription"/>
    </div>
</template>

<style scoped>

</style>
