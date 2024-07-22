<script setup>
import AlignmentComponent from "@/components/AlignmentComponent.vue";
import ValueList from "@/components/ValueList.vue";
import CriterionLevels from "@/components/CriterionLevels.vue";
import ResultType from "@/components/ResultType.vue";

const results = defineModel({ default: [] });
</script>

<template>
  <FormKit
      #default="{ items, node, value }"
      type="list"
      name="resultDescription"
      v-model="results"
      dynamic
  >
    <h5>Result Descriptions
      <button type="button" @click="() => node.input(value.concat({}))" class="btn btn-sm btn-primary ms-3">
        Add Result Description
      </button>
    </h5>

    <FormKit
        type="group"
        wrapper-class="card"
        v-for="(item, index) in items"
        :key="item"
        :index="index"
    >
      <div class="card mb-3">
        <h5 class="card-header">Result Description {{index+1}}
          <button type="button" @click="() => node.input(value.filter((_, i) => i !== index))" class="btn btn-secondary btn-sm float-end">
            Remove
          </button>
        </h5>

        <div class="card-body">
          <FormKit
              type="innerLabelTextInput"
              label="ID"
              name="id"
              inner-class="input-group"
              label-class="input-group-text"
              wrapper-class="required"
              validation="required:trim"
              help="The unique URI for this result description. Required so a result can link to this result description."
          />

          <FormKit
              type="hidden"
              name="type"
              :value="[ 'ResultDescription' ]"
          />

          <FormKit
              type="innerLabelTextInput"
              label="Name"
              name="name"
              inner-class="input-group"
              label-class="input-group-text"
              wrapper-class="required"
              validation="required:trim"
              help="The name of the result."
          />

          <ResultType v-model="results[index].resultType" />
<!--
          <FormKit
              type="selectInputGroup"
              label="Result Type"
              name="resultTypeType"
              inner-class="input-group"
              label-class="input-group-text"
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
                  v-if="results[index].resultTypeType === 'other'"
                  type="innerLabelTextInput"
                  label="Extended Type"
                  name="typeExt"
                  aria-label="Extended Result Type"
                  inner-class="input-group ms-3 me-5 pe-3"
                  outer-class="$reset"
                  label-class="visually-hidden"
                  before="ext:"
                  :validation="[['matches', '/^[a-z|A-Z|0-9|.|-|_]+$/']]"
              >
                <template #prefix>
                  <span class="input-group-text" id="extended-prefix" aria-label="ext:">ext:</span>
                </template>
              </FormKit>
            </template>
          </FormKit>-->

          <ValueList v-model="results[index].allowedValue"/>

          <FormKit
              type="innerLabelTextInput"
              label="Minimum Value"
              name="valueMin"
              inner-class="input-group"
              label-class="input-group-text"
              help="The minimum possible `value` that may be asserted in a linked result."
          />

          <FormKit
              type="innerLabelTextInput"
              label="Maximum Value"
              name="valueMax"
              inner-class="input-group"
              label-class="input-group-text"
              help="The maximum possible `value` that may be asserted in a linked result."
          />

          <CriterionLevels v-model="results[index].rubricCriterionLevel"/>

          <FormKit
              type="innerLabelTextInput"
              label="Required Level"
              name="requiredLevel"
              inner-class="input-group"
              label-class="input-group-text"
              help="The `id` of the rubric criterion level required to pass as determined by the achievement creator."
          />

          <FormKit
              type="innerLabelTextInput"
              label="Required Value"
              name="requiredValue"
              inner-class="input-group"
              label-class="input-group-text"
              help="A value from `allowedValue` or within the range of `valueMin` to `valueMax` required to pass as determined by the achievement creator."
          />

          <AlignmentComponent v-model="results[index].alignment"/>
        </div>
      </div>
    </FormKit>
  </FormKit>
</template>

<style>
.input-group>.form-label {
  margin-bottom: 0;
}
</style>
