<script setup>
import {onMounted, ref, watch} from "vue";

const model = defineModel({ default: ''});
const targetType = ref('');
const typeExt = ref('');

onMounted(() => {
  console.log('model', model);
  if (model.value && model.value.substring(0, 4) === 'ext:') {
    typeExt.value = model.value.substring(4);
    targetType.value = 'other';

    return;
  }

  targetType.value = model.value ? model.value : '';
  typeExt.value = '';
});

watch(targetType, (value) => {
  if (value === 'other') {
    model.value = 'ext:'+typeExt.value;

    return;
  }

  model.value = value;
});

watch(typeExt, (value) => {
  if (targetType.value === 'other') {
    model.value = 'ext:'+value;

    return;
  }

  model.value = targetType.value;
});
</script>

<template>
  <FormKit
    type="hidden"
    name="targetType"
    v-model="model"
  />
  <FormKit
      type="selectInputGroup"
      label="Alignment Type"
      v-model="targetType"
      ignore="true"
      name="targetTypeInput"
      inner-class="input-group"
      label-class="input-group-text"
      input-class="$reset formkit-input form-select"
      placeholder="Target Type"
      help="The type of the alignment target node."
      :options="{
          '': '',
          'CFItem': 'CFItem',
          'CFRubric': 'CFRubric',
          'CFRubricCriterion': 'CFRubricCriterion',
          'CFRubricCriterionLevel': 'CFRubricCriterionLevel',
          'ceasn:Competency': 'ceasn:Competency',
          'ceterms:Credential': 'ceterms:Credential',
          'CTDL': 'CTDL',
          'other': 'Other (ext:)',
      }"
  >
    <template #suffix>
      <FormKit
          v-if="targetType === 'other'"
          type="innerLabelTextInput"
          label="Extended Type"
          v-model="typeExt"
          ignore="true"
          name="typeExt"
          aria-label="Extended Alignment Type"
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
[data-placeholder="true"] {
  color: #999;
}
</style>
