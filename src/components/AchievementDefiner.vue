<script setup>
import {onBeforeMount, reactive, ref, watch} from "vue";
import BasicTab from "@/components/BasicTab.vue";
import DetailTab from "@/components/DetailTab.vue";
import AlignmentsTab from "@/components/AlignmentsTab.vue";
import AdditionalTab from "@/components/AdditionalTab.vue";

const props = defineProps({
  achievement: {
    type: String,
    default: ""
  },
  submitText: {
    type: String,
    default: "Save"
  }
});
const emit = defineEmits(['saveDefinition']);

const tab = ref("basic");
const submitted = ref(false);
const form = ref(null);

const formData = reactive({
  type: ['Achievement'],
  basic: {},
  detail: {},
  alignments: {},
  additional: {},
});

const achievementData = reactive({});

onBeforeMount(() => {
  try {
    const achievement = JSON.parse(JSON.stringify(JSON.parse(props.achievement), (key, value) => {
      return value == null ? undefined : value;
    }));

    formData.basic = {
      name: achievement.name || '',
      achievementType: achievement.achievementType || null,
      image: achievement.image || {},
      description: achievement.description || '',
      criteria: achievement.criteria || {},
    };
    formData.detail = {
      humanCode: achievement.humanCode || null,
      inLanguage: achievement.inLanguage || null,
      version: achievement.version || null,
      creditsAvailable: achievement.creditsAvailable || null,
      specialization: achievement.specialization || null,
      fieldOfStudy: achievement.fieldOfStudy || null,
    };
    formData.alignments = {
      resultDescription: achievement.resultDescription || [],
      alignment: achievement.alignment || [],
    };
    formData.additional = {
      id: achievement.id || null,
      tag: achievement.tag || [],
      related: achievement.related || [],
      otherIdentifier: achievement.otherIdentifier || [],
      creator: achievement.creator || {},
    };
    /*
    achievementData.basic = {...achievement.basic };
    achievementData.detail = {...achievement.detail };
    achievementData.alignments = {...achievement.alignments };
    achievementData.additional = {...achievement.additional };
     */
  } catch (e) {
    // No valid OB3 Achievement definition was passed
    console.log('Error parsing passed achievement: ', e);
  }
});

watch(formData, (value) => {
  Object.assign(achievementData, value.basic);
  Object.assign(achievementData, value.detail);
  Object.assign(achievementData, value.alignments);
  Object.assign(achievementData, value.additional);
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
  if (!formData.image.id) {
    formData.image = null;
  }
  //console.log('formData', formData);
  const cleaned = removeEmpty(formData);
  //emit('saveDefinition', cleaned);
  const formEl = document.getElementById(form.value.node.props.id);
  formEl.dispatchEvent(new CustomEvent('saveDefinition', { bubbles: true, detail: JSON.stringify(cleaned) }));
  //console.log('Submitting', cleaned);
}

function sendChange(formData) {
  try {
    const formEl = document.getElementById(form.value.node.props.id);
    const valid = form.value.node.context.state.valid;
    const cleaned = removeEmpty(form.value.node.value);
    formEl.dispatchEvent(new CustomEvent('changed', {bubbles: true, detail: JSON.stringify(cleaned)}));
    if (valid) {
      formEl.dispatchEvent(new CustomEvent('updated', {bubbles: true, detail: JSON.stringify(cleaned)}));
    }
  } catch (e) {}
}

function showErrors(node) {
  submitted.value = true;
}
</script>

<template>
  <div>
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
          ref="form"
          @submit="save"
          @submit-invalid="showErrors"
          @change="sendChange"
          #default="{ state: { valid } }"
          validation-visibility="live"
      >
        <div class="alert alert-warning" role="alert" v-if="!valid && submitted">
          There are some errors in the form submission.  Please correct the errors and then resubmit the form.
        </div>

        <FormKit
            type="hidden"
            name="@context"
            :value="[ 'https://www.w3.org/2018/credentials/v2', 'https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json' ]"
        />

        <FormKit
          type="hidden"
          name="type"
          v-model="formData.type"
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

        <button class="btn btn-primary float-end mt-5" type="submit" :disabled="false">{{ submitText }}</button>
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
