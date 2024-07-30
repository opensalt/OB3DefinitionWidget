<script setup>
import AlignmentComponent from "@/components/AlignmentComponent.vue";

const levels = defineModel({ default: {} });
</script>

<template>
  <FormKit
      #default="{ items, node, value }"
      type="list"
      v-model="levels"
      name="rubricCriterionLevel"
      dynamic
  >
    <h5>Rubric Criterion Levels
      <button type="button" @click="() => node.input(value.concat({}))" class="btn btn-sm btn-primary ms-3">
        Add Level
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
        <h5 class="card-header">Level {{index+1}}
          <button type="button" @click="() => node.input(value.filter((_, i) => i !== index))" class="btn btn-secondary btn-sm float-end">
            Remove
          </button>
        </h5>

        <div class="card-body">
          <FormKit
              type="hidden"
              name="type"
              :value="[ 'RubricCriterionLevel' ]"
          />

          <FormKit
              type="innerLabelTextInput"
              label="ID"
              name="id"
              inner-class="input-group"
              label-class="input-group-text"
              validation="required:trim"
              wrapper-class="required"
          />

          <FormKit
              type="innerLabelTextInput"
              label="Name"
              name="name"
              inner-class="input-group"
              label-class="input-group-text"
              validation="required:trim"
              wrapper-class="required"
          />

          <FormKit
              type="innerLabelTextareaInput"
              label="Description"
              name="description"
              inner-class="input-group"
              label-class="input-group-text"
          />

          <FormKit
              type="innerLabelTextInput"
              label="Level"
              name="level"
              inner-class="input-group"
              label-class="input-group-text"
          />

          <FormKit
              type="innerLabelTextInput"
              label="Points"
              name="points"
              inner-class="input-group"
              label-class="input-group-text"
          />

          <AlignmentComponent v-model="levels[index].alignment"/>
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
