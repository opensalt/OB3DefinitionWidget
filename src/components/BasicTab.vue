<script setup>
import CredentialImage from "@/components/CredentialImage.vue";
import CredentialType from "@/components/CredentialType.vue";
import CredentialCriteria from "@/components/CredentialCriteria.vue";

const model = defineModel({ default: {
/*  name: '',
  achievementType: null,
  image: null,
  description: '',
  criteria: { },*/
} });
</script>

<template>
    <div class="tab-pane fade show active" id="tab-basic" role="tabpanel" aria-labelledby="basic-tab">
      <FormKit
          type="text"
          label="Credential Name"
          name="name"
          wrapper-class="required"
          validation="required:trim"
          v-model="model.name"
          help="The name of the achievement."
      />

      <CredentialType v-model="model.achievementType" />
      <CredentialImage v-model="model.image"/>

      <FormKit
          type="textarea"
          label="Description"
          name="description"
          wrapper-class="required"
          rows="5"
          validation="required:trim"
          v-model="model.description"
          help="A short description of the achievement."
      />

      <CredentialCriteria
          v-model="model.criteria"
      />
    </div>
</template>

