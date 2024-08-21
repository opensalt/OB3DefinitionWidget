<script setup>
import {onMounted, ref, watch} from "vue";
import MarkdownRenderer from "@/components/MarkdownRenderer.vue";

const model = defineModel({ default: {
}});
const preview = ref('');

watch(model, () => {
  preview.value = model.value.narrative;
})

onMounted(() => {
  preview.value = model.value.narrative ? model.value.narrative : '';
})

const criteriaTab = ref("edit");

function selectTab(tab) {
  criteriaTab.value = tab;
}
</script>

<template>
  <div class="formkit-wrapper required">
    <label class="form-label">Earning Criteria</label>
  </div>

  <ul class="nav nav-tabs" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link" :class='{"active": criteriaTab === "edit"}' type="button" id="edit-tab" aria-controls="criteria-edit"
              role="tab" :aria-selected="criteriaTab === 'edit'" @click="selectTab('edit')">Edit
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" :class='{"active": criteriaTab === "preview"}' type="button" id="preview-tab"
              aria-controls="criteria-preview" role="tab" :aria-selected="criteriaTab === 'preview'"
              @click="selectTab('preview')">Preview
      </button>
    </li>
  </ul>

  <div class="tab-content" id="criteria-tab">
    <div class="tab-pane fade" :class="{'show': (criteriaTab === 'edit'), 'active': (criteriaTab === 'edit')}"
         id="criteria-edit" role="tabpanel" aria-labelledby="edit-tab" v-show="criteriaTab === 'edit'">
      <FormKit type="group" name="criteria" v-model="model">
        <FormKit
          type="textarea"
          label="Narrative"
          name="narrative"
          rows="5"
          validation="require_one:id"
          help="A narrative of what is needed to earn the credential. Markdown is allowed."
          />

        <FormKit
          type="text"
          label="Criteria URL"
          name="id"
          validation="require_one:narrative|url"
          help="The URL of a webpage that describes in a human-readable format the criteria for the credential."
          />
      </FormKit>
    </div>

    <div class="tab-pane fade" :class="{'show': (criteriaTab === 'preview'), 'active': (criteriaTab === 'preview')}"
         id="criteria-preview" role="tabpanel" aria-labelledby="preview-tab" v-show="criteriaTab === 'preview'">
      <label class="mt-3 mb-2">Narrative Preview</label>
      <MarkdownRenderer :source="preview" class="border rounded p-3"/>
    </div>
  </div>
</template>

<style scoped>
#criteria-preview {
  min-height: 302px;
}
</style>
