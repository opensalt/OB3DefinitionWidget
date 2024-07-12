<script setup>
import {useCredentialStore} from "@/stores/credential";

const credential = useCredentialStore();
</script>

<template>
  <div class="mb-3">
    <label for="credentialType" class="form-label">Credential Type</label>
    <select id="credentialType" class="form-select" aria-label="Credential Type" v-model="credential.type">
      <option value="Achievement">Achievement</option>
      <option value="ApprenticeshipCertificate">Apprenticeship Certificate</option>
      <option value="Assessment">Assessment</option>
      <option value="Assignment">Assignment</option>
      <option value="AssociateDegree">Associate Degree</option>
      <option value="Award">Award</option>
      <option value="Badge">Badge</option>
      <option value="BachelorDegree">Bachelor Degree</option>
      <option value="Certificate">Certificate</option>
      <option value="CertificateOfCompletion">Certificate Of Completion</option>
      <option value="Certification">Certification</option>
      <option value="CommunityService">Community Service</option>
      <option value="Competency">Competency</option>
      <option value="Course">Course</option>
      <option value="CoCurricular">Co-Curricular</option>
      <option value="Degree">Degree</option>
      <option value="Diploma">Diploma</option>
      <option value="DoctoralDegree">Doctoral Degree</option>
      <option value="Fieldwork">Fieldwork</option>
      <option value="GeneralEducationDevelopment">General Education Development</option>
      <option value="JourneymanCertificate">Journeyman Certificate</option>
      <option value="LearningProgram">Learning Program</option>
      <option value="License">License</option>
      <option value="Membership">Membership</option>
      <option value="ProfessionalDoctorate">Professional Doctorate</option>
      <option value="QualityAssuranceCredential">Quality Assurance Credential</option>
      <option value="MasterCertificate">Master Certificate</option>
      <option value="MasterDegree">Master Degree</option>
      <option value="MicroCredential">Micro Credential</option>
      <option value="ResearchDoctorate">Research Doctorate</option>
      <option value="SecondarySchoolDiploma">Secondary School Diploma</option>
      <option value="other">Other (ext:)</option>
    </select>
    <div v-if="credential.type === 'other'" class="mt-3">
      <label for="credentialTypeExt" class="form-label ms-3 pe-3 visually-hidden">Extended Type</label>
      <div class="input-group mb-3 ms-3 pe-3">
        <span class="input-group-text" id="extended-prefix">ext:</span>
        <input type="text" id="credentialTypeExt" class="form-control" aria-label="Extended Credential Type" v-model="credential.typeExt">
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
