<script setup>
import {ref, watch} from "vue";

const emit = defineEmits(['change']);

const related = ref([]);

watch(related, (newRelated) => {
  //credential.alignment = newAlignment;
  emit('change', newRelated);
});
</script>

<template>
  <FormKit
      #default="{ items, node, value }"
      type="list"
      v-model="related"
      name="related"
      dynamic
  >
    <h5>Related Credentials
      <button type="button" @click="() => node.input(value.concat({}))" class="btn btn-sm btn-primary ms-3">
        Add Related Credential
      </button>
    </h5>
    <p class="form-text">A list of credentials related to this one.</p>

    <FormKit
      type="group"
      wrapper-class="card"
      v-for="(item, index) in items"
      :key="item"
      :index="index"
    >
      <div class="card mb-3">
        <h5 class="card-header">Credential {{index+1}}
          <button type="button" @click="() => node.input(value.filter((_, i) => i !== index))" class="btn btn-secondary btn-sm float-end">
            Remove
          </button>
        </h5>

        <div class="card-body pb-0">
          <FormKit
              type="hidden"
              name="type"
              :value="[ 'Related' ]"
          />

          <FormKit
              type="innerLabelTextInput"
              label="ID"
              name="id"
              inner-class="input-group"
              label-class="input-group-text"
              wrapper-class="required"
              validation="uri:required:trim"
              help="The URI of the related achievement."
          />

          <FormKit
              type="innerLabelTextInput"
              label="Language"
              name="inLanguage"
              inner-class="input-group"
              label-class="input-group-text"
              :validation="[['matches', '/^[a-z]{2,4}(-[A-Z][a-z]{3})?(-([A-Z]{2}|[0-9]{3}))?$/']]"
              help="The language of the related achievement as a BCP47 language code."
          />

          <FormKit
              type="innerLabelTextInput"
              label="Version"
              name="version"
              inner-class="input-group"
              label-class="input-group-text"
              help="The version of the related achievement."
          />
        </div>
      </div>
    </FormKit>
  </FormKit>
</template>

<style>
.input-group>.form-label {
  margin-bottom: 0;
}
</style>
