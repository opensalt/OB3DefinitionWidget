<script setup>
import {reactive, ref, watch} from "vue";
import BasicTab from "@/components/BasicTab.vue";
import DetailTab from "@/components/DetailTab.vue";
import AlignmentsTab from "@/components/AlignmentsTab.vue";
import AdditionalTab from "@/components/AdditionalTab.vue";

const emit = defineEmits(['saveCredential']);

const tab = ref("basic");
const submitted = ref(false);
const form = ref(null);

const formData = reactive({
  basic: {},
  detail: {},
  alignments: {},
  additional: {},
});

const credential = reactive({});

watch(formData, (value) => {
  Object.assign(credential, value.basic);
  Object.assign(credential, value.detail);
  Object.assign(credential, value.alignments);
  Object.assign(credential, value.additional);
});

function selectTab(selected) {
  tab.value = selected;
}

function removeEmpty(obj) {
  /*
  return Object.fromEntries(
      Object.entries(obj)
          .filter(([_, v]) => v != null && v !== '' && (!Array.isArray(v) || v.length > 0))
          .map(([k, v]) => [k, (v === Object(v) && !Array.isArray(v)) ? removeEmpty(v) : v])
  );
   */
  return JSON.parse(JSON.stringify(obj, (key, value) => {
    return ((value === null || value === '' || (Array.isArray(value) && value.length === 0)) ? undefined : value);
  }));
}

function save(formData) {
  const cleaned = removeEmpty(formData);
  emit('saveCredential', cleaned);
  const formEl = document.getElementById(form.value.node.props.id);
  formEl.dispatchEvent(new CustomEvent('saveCredential', { bubbles: true, detail: JSON.stringify(cleaned) }));
  //console.log('Submitting', cleaned);
}

function showErrors(node) {
  submitted.value = true;
}
</script>

<template>
  <div class="clearfix">
    <ul class="nav nav-tabs col-md-6" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link" :class='{"active": (tab === "basic")}' type="button" id="basic-tab" role="tab" aria-controls="tab-basic" :aria-selected="(tab === 'basic') ? 'true' : 'false'" @click="selectTab('basic')">Primary Details</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" :class='{"active": (tab === "detail")}' type="button" id="detail-tab" role="tab" aria-controls="tab-detail" :aria-selected="(tab === 'detail') ? 'true' : 'false'" @click="selectTab('detail')">Additional Details</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" :class='{"active": (tab === "alignments")}' type="button" id="detail-tab" role="tab" aria-controls="tab-alignments" :aria-selected="(tab === 'alignments') ? 'true' : 'false'" @click="selectTab('alignments')">Alignments</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" :class='{"active": (tab === "additional")}' type="button" id="additional-tab" role="tab" aria-controls="tab-additional" :aria-selected="(tab === 'additional') ? 'true' : 'false'" @click="selectTab('additional')">Additional Information</button>
      </li>
    </ul>

    <div class="tab-content mt-3 col-md-6" id="tab-content">
      <FormKit
          type="form"
          :actions="false"
          ref="form"
          @submit="save"
          @submit-invalid="showErrors"
          #default="{ state: { valid } }"
          validation-visibility="live"
      >
        <div class="alert alert-warning" role="alert" v-if="!valid && submitted">
          There are some errors in the form submission.  Please fix the errors before submitting the form.
        </div>

        <FormKit
            type="hidden"
            name="@context"
            :value="[ 'https://www.w3.org/2018/credentials/v2', 'https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json' ]"
        />

        <FormKit
          type="hidden"
          name="type"
          :value="[ 'Achievement' ]"
        />

        <BasicTab
            v-model="formData.basic"
            v-show="tab === 'basic'"
        />
        <DetailTab
            v-model="formData.detail"
            v-show="tab === 'detail'"
        />
        <AlignmentsTab
            v-model="formData.alignments"
            v-show="tab === 'alignments'"
        />
        <AdditionalTab
            v-model="formData.additional"
            v-show="tab === 'additional'"
        />

        <button class="btn btn-primary float-end mt-5" type="submit" :disabled="false">Save</button>
      </FormKit>
    </div>
  </div>
</template>

<style>
.formkit-wrapper.required .form-label:before{
   color: red;
   content: "*";
   position: absolute;
   margin-left: -10px;
}

[data-invalid="true"] .form-control {
  border-color: #dc3545;
  padding-right: calc(1.5em + 0.75rem);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

[data-invalid="true"] .invalid-feedback {
  display: inline;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}
</style>
