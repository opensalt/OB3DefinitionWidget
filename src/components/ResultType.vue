<script setup>
import {onMounted, ref, watch} from "vue";

const model = defineModel({ default: ''});
const selectedType = ref('');
const typeExt = ref('');

onMounted(() => {
  if (model.value?.substring(0, 4) === 'ext:') {
    selectedType.value = 'other';
    typeExt.value = model.value.substring(4);

    return;
  }

  selectedType.value = model.value ? model.value : '';
  typeExt.value = '';
});

watch(selectedType, (value) => {
  if (value === 'other') {
    model.value = 'ext:'+typeExt.value;

    return;
  }

  model.value = value;
});

watch(typeExt, (value) => {
  if (selectedType.value === 'other') {
    model.value = 'ext:'+value;

    return;
  }

  model.value = selectedType.value;
});
</script>

<template>
  <FormKit
    type="selectInputGroup"
    label="Result Type"
    v-model="selectedType"
    name="selectedType"
    inner-class="input-group"
    label-class="input-group-text"
    input-class="$reset formkit-input form-select"
    wrapper-class="required"
    placeholder="Select Result Type"
    validation="required"
    :options="{
      'GradePointAverage': 'Grade Point Average',
      'LetterGrade': 'Letter Grade',
      'Percent': 'Percent',
      'PerformanceLevel': 'Performance Level',
      'PredictedScore': 'Predicted Score',
      'RawScore': 'Raw Score',
      'Result': 'Result',
      'RubricCriterion': 'Rubric Criterion',
      'RubricCriterionLevel': 'Rubric Criterion Level',
      'RubricScore': 'Rubric Score',
      'ScaledScore': 'Scaled Score',
      'Status': 'Status',
      'other': 'Other (ext:)'
    }"
    help="The type of result this description represents. This is an extensible enumerated vocabulary."
  >
    <template #suffix>
      <FormKit
        v-if="selectedType === 'other'"
        type="innerLabelTextInput"
        label="Extended Type"
        v-model="typeExt"
        name="typeExt"
        aria-label="Extended Result Type"
        inner-class="input-group ms-3 me-5 pe-3"
        outer-class="$reset"
        label-class="visually-hidden"
        before="ext:"
        :validation="[['matches', '/^[a-z|A-Z|0-9|.|-|_]+$/'], ['required']]"
      >
        <template #prefix>
          <span class="input-group-text" aria-label="ext:">ext:</span>
        </template>
      </FormKit>
    </template>
  </FormKit>
</template>

<style scoped>

</style>
