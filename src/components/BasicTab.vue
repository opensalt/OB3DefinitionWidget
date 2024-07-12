<script setup>
import {useCredentialStore} from "@/stores/credential";
import CredentialImage from "@/components/CredentialImage.vue";
import CredentialType from "@/components/CredentialType.vue";
import CredentialCriteria from "@/components/CredentialCriteria.vue";

const credential = useCredentialStore();
</script>

<template>
  <form>
    <div class="tab-pane fade show active" id="tab-basic" role="tabpanel" aria-labelledby="basic-tab">
      <h3>General Information</h3>

      <div class="mb-3">
        <label for="credentialName" class="form-label">Credential Name</label>
        <input id="credentialName" type="text" class="form-control" required="required" v-model="credential.name">
      </div>

      <CredentialType />
      <CredentialImage />

      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea id="description" class="form-control" rows="5" v-model="credential.description"></textarea>
      </div>

      <CredentialCriteria/>
    </div>
  </form>
</template>

