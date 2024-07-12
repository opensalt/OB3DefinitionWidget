<template>
  <h3>Earning Criteria</h3>

  <ul class="nav nav-tabs" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link" :class='{"active": true}' type="button" id="edit-tab" aria-controls="criteria-edit"
              role="tab" :aria-selected="criteriaTab === 'edit'" @click="selectTab('edit')">Edit
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" :class='{"active": false}' type="button" id="preview-tab"
              aria-controls="criteria-preview" role="tab" :aria-selected="criteriaTab === 'preview'"
              @click="selectTab('preview')">Preview
      </button>
    </li>
  </ul>

  <div class="tab-content" id="criteria-tab">
    <div class="tab-pane fade" :class="{'show': (criteriaTab === 'edit'), 'active': (criteriaTab === 'edit')}"
         id="criteria-edit" role="tabpanel" aria-labelledby="edit-tab" v-show="criteriaTab === 'edit'">
      <div class="mb-3">
        <label for="criteria" class="form-label">Narration</label>
        <textarea id="criteria" class="form-control" rows="5" v-model="credential.criteria"></textarea>
      </div>
      <div class="mb-3">
        <label for="criteriaUrl" class="form-label">Criteria URL</label>
        <input id="criteriaUrl" type="text" class="form-control" v-model="credential.criteriaUrl">
      </div>
    </div>

    <div class="tab-pane fade" :class="{'show': (criteriaTab === 'preview'), 'active': (criteriaTab === 'preview')}"
         id="criteria-preview" role="tabpanel" aria-labelledby="preview-tab" v-show="criteriaTab === 'preview'">
      <label>Criteria Preview</label>
      <MarkdownRenderer :source="credential.criteria"/>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useCredentialStore} from "@/stores/credential";
import MarkdownRenderer from "@/components/MarkdownRenderer.vue";

const credential = useCredentialStore();
const criteriaTab = ref("edit");

function selectTab(tab) {
  criteriaTab.value = tab;
}
</script>

<style scoped>
#criteria-preview {
  min-height: 250px;
}
</style>
