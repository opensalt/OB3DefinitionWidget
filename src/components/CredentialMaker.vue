<script setup>
import {reactive, ref, watch} from "vue";
import {useCredentialStore} from "@/stores/credential.js";
import BasicTab from "@/components/BasicTab.vue";
import DetailTab from "@/components/DetailTab.vue";
import AlignmentsTab from "@/components/AlignmentsTab.vue";
import AdditionalTab from "@/components/AdditionalTab.vue";

const tab = ref("basic");
const submitted = ref(false);

const formData = reactive({
  basic: {},
  detail: {},
  alignments: {},
  additional: {},
});

const credential = useCredentialStore();

watch(formData, (value) => {
  Object.assign(credential, value.basic);
  Object.assign(credential, value.detail);
  Object.assign(credential, value.alignments);
  Object.assign(credential, value.additional);
});

function selectTab(selected) {
  tab.value = selected;
}

function save(formData) {
  console.log('Submitting', formData);
}

function showErrors(node) {
  submitted.value = true;
}
</script>

<template>
  <div class="clearfix">
    <ul class="nav nav-tabs" role="tablist">
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

    <div class="tab-content mt-3" id="tab-content">
      <FormKit
          type="form"
          :actions="false"
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
</style>
