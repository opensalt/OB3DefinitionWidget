<script setup>
import {onMounted, ref, watch} from "vue";

const model = defineModel({ default: ''});
const achievementType = ref('');
const typeExt = ref('');

onMounted(() => {
  if (model.value && model.value.substring(0, 4) === 'ext:') {
    achievementType.value = 'other';
    typeExt.value = model.value.substring(4);

    return;
  }

  achievementType.value = model.value ? model.value : '';
  typeExt.value = '';
});

watch(achievementType, (value) => {
  if (value === 'other') {
    model.value = 'ext:'+typeExt.value;

    return;
  }

  model.value = value;
});

watch(typeExt, (value) => {
  if (achievementType.value === 'other') {
    model.value = 'ext:'+value;

    return;
  }

  model.value = achievementType.value;
});
</script>

<template>
  <FormKit
    type="hidden"
    name="achievementType"
    v-model="model"
  />
  <FormKit
      type="select"
      label="Credential Type"
      v-model="achievementType"
      name="achievementTypeInput"
      ignore="true"
      input-class="$reset formkit-input form-select"
      inner-class=""
      placeholder="Select the Credential Type"
      help="The type of the credential"
      :options="{
        '': 'Select the Credential Type',
        'Achievement': 'Achievement',
        'ApprenticeshipCertificate': 'Apprenticeship Certificate',
        'Assessment': 'Assessment',
        'Assignment': 'Assignment',
        'AssociateDegree': 'Associate Degree',
        'Award': 'Award',
        'Badge': 'Badge',
        'BachelorDegree': 'Bachelor Degree',
        'Certificate': 'Certificate',
        'CertificateOfCompletion': 'Certificate Of Completion',
        'Certification': 'Certification',
        'CommunityService': 'Community Service',
        'Competency': 'Competency',
        'Course': 'Course',
        'CoCurricular': 'Co-Curricular',
        'Degree': 'Degree',
        'Diploma': 'Diploma',
        'DoctoralDegree': 'Doctoral Degree',
        'Fieldwork': 'Fieldwork',
        'GeneralEducationDevelopment': 'General Education Development',
        'JourneymanCertificate': 'Journeyman Certificate',
        'LearningProgram': 'Learning Program',
        'License': 'License',
        'Membership': 'Membership',
        'ProfessionalDoctorate': 'Professional Doctorate',
        'QualityAssuranceCredential': 'Quality Assurance Credential',
        'MasterCertificate': 'Master Certificate',
        'MasterDegree': 'Master Degree',
        'MicroCredential': 'Micro Credential',
        'ResearchDoctorate': 'Research Doctorate',
        'SecondarySchoolDiploma': 'Secondary School Diploma',
        'other': 'Other (ext:)',
      }"
  />
  <FormKit
      v-if="achievementType === 'other'"
      type="innerLabelTextInput"
      label="Extended Type"
      v-model="typeExt"
      name="typeExt"
      ignore="true"
      aria-label="Extended Alignment Type"
      inner-class="input-group ms-3 me-5 pe-3"
      outer-class="$reset"
      label-class="visually-hidden"
      before="ext:"
      :validation="[['matches', '/^[a-z|A-Z|0-9|.|-|_]+$/'], ['required']]"
      help="Extended value for Credential Type"
  >
    <template #prefix>
      <span class="input-group-text" aria-label="ext:">ext:</span>
    </template>
  </FormKit>
</template>

<style scoped>
[data-placeholder="true"] {
  color: #999;
}
</style>
