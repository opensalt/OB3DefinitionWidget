<script setup>
const props = defineProps({
  help: {
    type: String,
    default: 'Other identifiers for this credential.'
  }
});

const identifiers = defineModel({ default: [] });
</script>

<template>
  <FormKit
      #default="{ items, node, value }"
      type="list"
      v-model="identifiers"
      name="identifier"
      dynamic
  >
    <h5>Other Identifiers
      <button type="button" @click="() => node.input(value.concat({}))" class="btn btn-sm btn-primary ms-3">
        Add Identifier
      </button>
    </h5>
    <p class="form-text">{{ props.help }}</p>

    <FormKit
        type="group"
        v-for="(item, index) in items"
        :key="item"
        :index="index"
    >
      <div class="card mb-3">
        <h5 class="card-header">Other Identifier {{index+1}}
          <button type="button" @click="() => node.input(value.filter((_, i) => i !== index))" class="btn btn-secondary btn-sm float-end">
            Remove
          </button>
        </h5>

        <div class="card-body">
          <FormKit
              type="hidden"
              name="type"
              :value="'IdentifierEntry'"
          />

          <FormKit
              type="innerLabelTextInput"
              label="Identifier"
              name="identifier"
              aria-label="Identifier"
              inner-class="input-group"
              label-class="input-group-text"
              wrapper-class="required"
              validation="required:trim"
          />
          <FormKit
              type="selectInputGroup"
              label="Identifier Type"
              name="identifierType"
              inner-class="input-group"
              label-class="input-group-text"
              input-class="$reset formkit-input form-select"
              wrapper-class="required"
              placeholder="Select the Identifier Type"
              validation="required"
              :options="{
                'name': 'name',
                'sourcedId': 'sourcedId',
                'systemId': 'systemId',
                'productId': 'productId',
                'userName': 'userName',
                'accountId': 'accountId',
                'emailAddress': 'emailAddress',
                'nationalIdentityNumber': 'nationalIdentityNumber',
                'isbn': 'isbn',
                'issn': 'issn',
                'lisSourcedId': 'lisSourcedId',
                'oneRosterSourcedId': 'oneRosterSourcedId',
                'sisSourcedId': 'sisSourcedId',
                'ltiContextId': 'ltiContextId',
                'ltiDeploymentId': 'ltiDeploymentId',
                'ltiToolId': 'ltiToolId',
                'ltiPlatformId': 'ltiPlatformId',
                'ltiUserId': 'ltiUserId',
                'identifier': 'identifier',
                'other': 'Other (ext:)',
              }"
          />
          <FormKit
              v-if="value[index].identifierType === 'other'"
              type="innerLabelTextInput"
              label="Extended Type"
              name="typeExt"
              aria-label="Extended Identifier Type"
              inner-class="input-group ms-3 me-5 pe-3"
              outer-class="$reset"
              label-class="visually-hidden"
              before="ext:"
              :validation="[['matches', '/^[a-z|A-Z|0-9|.|-|_]+$/']]"
          >
            <template #prefix>
              <span class="input-group-text" aria-label="ext:">ext:</span>
            </template>
          </FormKit>
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
