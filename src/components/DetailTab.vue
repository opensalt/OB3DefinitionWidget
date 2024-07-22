<script setup>
const credential = defineModel({ default: {
  humanCode: null,
  inLanguage: null,
  version: null,
  creditsAvailable: null,
  additionalType: null,
} })
</script>

<template>
    <div class="tab-pane fade show active" id="tab-detail" role="tabpanel" aria-labelledby="detail-tab">
        <FormKit
          type="text"
          label="Human Code"
          v-model="credential.humanCode"
          name="humanCode"
          help="The code, generally human readable, associated with an achievement."
        />

        <FormKit
            type="text"
            label="In Language"
            v-model="credential.inLanguage"
            name="inLanguage"
            help="The language this credential is in as a BCP47 language code, such as 'en', 'en-US', or 'es-MX'"
            :validation="[['matches', '/^[a-z]{2,4}(-[A-Z][a-z]{3})?(-([A-Z]{2}|[0-9]{3}))?$/']]"
            :validation-messages="{
              'matches': 'The language must formatted as a BCP47 language code, such as \'en\', \'en-US\', or \'es-MX\'.'
            }"
        />

        <FormKit
            type="text"
            label="Version"
            v-model="credential.version"
            name="version"
            help="The version property allows issuers to set a version string for an Achievement. This is particularly useful when replacing a previous version with an update."
        />

        <FormKit
            type="number"
            label="Credits Available"
            number
            name="creditsAvailable"
            v-model="credential.creditsAvailable"
            help="Credit hours associated with this entity, or credit hours possible. For example 3.0."
        />

        <FormKit
            type="text"
            label="Specialization"
            v-model="credential.specialization"
            name="specialization"
            help="Name given to the focus, concentration, or specific area of study defined in the achievement. Examples include 'Entrepreneurship', 'Technical Communication', and 'Finance'."
        />

        <FormKit
            type="text"
            label="Field of Study"
            v-model="credential.fieldOfStudy"
            name="fieldOfStudy"
            help="Category, subject, area of study, discipline, or general branch of knowledge. Examples include Business, Education, Psychology, and Technology."
        />
    </div>
</template>

<style scoped>
  #criteria-preview {
    min-height: 250px;
  }
</style>
