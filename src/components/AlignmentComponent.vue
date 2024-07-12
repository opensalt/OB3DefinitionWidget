<script setup>
import {ref} from "vue";

const alignment = ref({});

</script>

<template>
  <form>
    <div class="mb-3 input-group">
      <label for="alignmentName" class="input-group-text">Name</label>
      <input id="alignmentName" type="text" class="form-control" required="required" v-model="alignment.targetName">
    </div>

    <div class="mb-3 input-group">
      <label for="alignmentUrl" class="input-group-text">URL</label>
      <input id="alignmentUrl" type="text" class="form-control" required="required" v-model="alignment.targetUrl">
    </div>

    <div class="mb-3 input-group">
      <label for="alignmentFramework" class="input-group-text">Framework</label>
      <input id="alignmentFramework" type="text" class="form-control" required="required" v-model="alignment.targetFramework">
    </div>

    <div class="mb-3 input-group">
      <label for="description" class="input-group-text">Description</label>
      <textarea id="description" class="form-control" rows="3" v-model="alignment.description"></textarea>
    </div>

    <div class="mb-3 input-group">
      <label for="alignmentCode" class="input-group-text">Code</label>
      <input id="alignmentCode" type="text" class="form-control" required="required" v-model="alignment.targetCode">
    </div>

    <div class="mb-3 input-group">
      <label for="alignment-id" class="input-group-text">Alignment Type</label>
      <select id="alignment-id" class="form-select" aria-label="Alignment Type" v-model="alignment.targetType">
        <option value="CFItem">CFItem</option>
        <option value="CFRubric">CFRubric</option>
        <option value="CFRubricCriterion">CFRubricCriterion</option>
        <option value="CFRubricCriterionLevel">CFRubricCriterionLevel</option>
        <option value="ceasn:Competency">ceasn:Competency</option>
        <option value="ceterms:Credential">ceterms:Credential</option>
        <option value="CTDL">CTDL</option>
        <option value="other">Other (ext:)</option>
      </select>
      <div v-if="alignment.targetType === 'other'">
        <label for="alignmentTypeExt" class="visually-hidden">Extended Type</label>
        <div class="input-group ms-3 me-5 pe-3">
          <span class="input-group-text" id="extended-prefix" aria-label="ext:">ext:</span>
          <input type="text" id="alignmentTypeExt" class="form-control" aria-label="Extended Alignment Type" v-model="alignment.typeExt">
        </div>
      </div>
    </div>
  </form>
</template>
