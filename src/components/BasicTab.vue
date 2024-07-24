<script setup>
import AchievementImage from "@/components/AchievementImage.vue";
import AchievementType from "@/components/AchievementType.vue";
import AchievementCriteria from "@/components/AchievementCriteria.vue";

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
      <div class="card mb-3">
        <div class="card-body">
          <p class="mb-0">
            This tab contains all of the required fields for a credential.<br/>
            <em>Credential Type</em> and <em>Image</em> are not required, but it is suggested that all credentials have them.
          </p>
        </div>
      </div>

      <FormKit
          type="text"
          label="Credential Name"
          name="name"
          wrapper-class="required"
          validation="required:trim"
          v-model="model.name"
          help="The name of the credential."
      />

      <AchievementType v-model="model.achievementType" />
      <AchievementImage v-model="model.image"/>

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

      <AchievementCriteria
          v-model="model.criteria"
      />
    </div>
</template>

