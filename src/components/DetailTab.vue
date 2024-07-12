<script setup>
import { ref } from "vue";
import { useCredentialStore } from "@/stores/credential";

const credential = useCredentialStore();
</script>

<template>
  <form>
    <div class="tab-pane fade show active" id="tab-detail" role="tabpanel" aria-labelledby="detail-tab">
      <h3>Additional Details</h3>

      <div class="mb-3">
        <label for="humanCode" class="form-label">Human Code</label>
        <input id="humanCode" type="text" class="form-control" required="required" v-model="credential.humanCode" @change="$emit('change', {'humanCode': credential.humanCode})">
      </div>

      <div class="mb-3">
        <label for="inLanguage" class="form-label">Language</label>
        <input id="inLanguage" type="text" class="form-control" required="required" v-model="credential.inLanguage" @change="$emit('change', {'inLanguage': credential.inLanguage})">
      </div>

      <div class="mb-3">
        <label for="version" class="form-label">Version</label>
        <input id="version" type="text" class="form-control" required="required" v-model="credential.version" @change="$emit('change', {'version': credential.version})">
      </div>

      <div class="mb-3">
        <label for="creditsAvailable" class="form-label">Credits Available</label>
        <input id="creditsAvailable" type="text" class="form-control" required="required" v-model.number="credential.creditsAvailable" @change="$emit('change', {'version': credential.creditsAvailable})">
      </div>

      <div class="mb-3">
        <label for="specialization" class="form-label">Specialization</label>
        <input id="specialization" type="text" class="form-control" required="required" v-model="credential.specialization" @change="$emit('change', {'version': credential.specialization})">
      </div>

      <div class="mb-3">
        <label for="fieldOfStudy" class="form-label">Field of Study</label>
        <input id="fieldOfStudy" type="text" class="form-control" required="required" v-model="credential.fieldOfStudy" @change="$emit('change', {'version': credential.fieldOfStudy})">
      </div>

    </div>
  </form>
</template>

<style scoped>
  #criteria-preview {
    min-height: 250px;
  }
</style>
