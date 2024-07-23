<script setup>
const alignment = defineModel({ default: {} });
</script>

<template>
  <FormKit
      #default="{ items, node, value }"
      type="list"
      v-model="alignment"
      name="alignment"
      dynamic
  >
    <h5>Alignments
      <button type="button" @click="() => node.input(value.concat({}))" class="btn btn-sm btn-primary ms-3">
        Add Alignment
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
        <h5 class="card-header">Target {{index+1}}
          <button type="button" @click="() => node.input(value.filter((_, i) => i !== index))" class="btn btn-secondary btn-sm float-end">
            Remove
          </button>
        </h5>

        <div class="card-body pb-0">
          <FormKit
              type="hidden"
              name="type"
              :value="[ 'Alignment' ]"
          />

          <FormKit
              type="innerLabelTextInput"
              label="Name"
              name="targetName"
              inner-class="input-group"
              label-class="input-group-text"
              wrapper-class="required"
              validation="required:trim"
              help="Name of the alignment."
          />

          <FormKit
              type="innerLabelTextInput"
              label="URL"
              name="targetUrl"
              inner-class="input-group"
              label-class="input-group-text"
              wrapper-class="required"
              validation="required:trim|url"
              help="URL linking to the official description of the alignment target, for example an individual standard within an educatinoal framework."
          />

          <FormKit
              type="innerLabelTextInput"
              label="Framework"
              name="targetFramework"
              inner-class="input-group"
              label-class="input-group-text"
              help="Name of the framework for the alignment target."
          />

          <FormKit
            type="innerLabelTextareaInput"
            label="Description"
            name="description"
            rows="2"
            inner-class="input-group"
            label-class="input-group-text"
            help="Short description of the alignment target."
          />

          <FormKit
              type="innerLabelTextInput"
              label="Code"
              name="targetCode"
              inner-class="input-group"
              label-class="input-group-text"
              help="If applicable, a locally unique string identifier that identifies the alignment target within its framework and/or targetUrl."
          />

          <FormKit
              type="selectInputGroup"
              label="Alignment Type"
              name="targetType"
              inner-class="input-group"
              label-class="input-group-text"
              input-class="$reset formkit-input form-select"
              placeholder="Target Type"
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
              help="The type of the alignment target node."
          >
            <template #suffix>
                <FormKit
                    v-if="value[index].targetType === 'other'"
                    type="innerLabelTextInput"
                    label="Extended Type"
                    name="typeExt"
                    aria-label="Extended Alignment Type"
                    inner-class="input-group ms-3 me-5 pe-3"
                    outer-class="$reset"
                    label-class="visually-hidden"
                    before="ext:"
                    :validation="[['matches', '/^[a-z|A-Z|0-9|.|-|_]+$/']]"
                    placeholder="Name of extended type"
                >
                  <template #prefix>
                    <span class="input-group-text" id="extended-prefix" aria-label="ext:">ext:</span>
                  </template>
                </FormKit>
            </template>
          </FormKit>
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
