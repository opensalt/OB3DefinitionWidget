<script setup>
import {ref} from "vue";
import BasicTab from "@/components/BasicTab.vue";
import DetailTab from "@/components/DetailTab.vue";
import {useCredentialStore} from "@/stores/credential.js";
import ResultDescription from "@/components/ResultDescription.vue";
import AlignmentComponent from "@/components/AlignmentComponent.vue";
import AlignmentsTab from "@/components/AlignmentsTab.vue";

const tab = ref("basic");

const credential = useCredentialStore();

function selectTab(selected) {
  tab.value = selected;
}

function save() {
  console.log('Submitting');
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
      <form @submit.prevent="save">
        <BasicTab v-show="tab === 'basic'"/>
        <DetailTab v-show="tab === 'detail'"/>
        <AlignmentsTab v-show="tab === 'alignments'"/>

        <div v-show="tab === 'additional'">
          <ul>
            <li>alignment</li>
            <li>creator</li>
            <li>related</li>
            <li>resultDescription</li>
            <li>tag</li>
            <li>otherIdentifier</li>
            <li>id</li>
          </ul>

          <ResultDescription/>
        </div>

        <button class="btn btn-primary float-end mt-3" type="submit" :disabled="!credential.hasRequired">Save</button>
      </form>
    </div>
  </div>
</template>

