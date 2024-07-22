<script setup>
import AlignmentsComponent from "@/components/AlignmentsComponent.vue";
import ResultDescription from "@/components/ResultDescription.vue";

const model = defineModel({ default: {} });
</script>

<template>
    <div class="tab-pane fade show active" id="tab-alignments" role="tabpanel" aria-labelledby="alignments-tab">
      <ResultDescription v-model="model.resultDescription"/>

      <AlignmentsComponent v-model="model.alignment"/>
    </div>
</template>

<style scoped>

</style>
