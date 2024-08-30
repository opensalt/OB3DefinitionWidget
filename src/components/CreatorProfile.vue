<script setup>
import {onBeforeMount, ref} from "vue";
import AddressComponent from "@/components/AddressComponent.vue";
import CredentialImage from "@/components/AchievementImage.vue";
import OtherIdentifiers from "@/components/OtherIdentifiers.vue";

const creator=defineModel({ default: {} });
const creatorIs=ref('noCreator');

onBeforeMount(() => {
  if (Object.keys(creator.value).length === 0) {
    creatorIs.value = 'noCreator';

    return;
  }

  // Default to organization
  creatorIs.value = 'organization';

  if (creator.value.dateOfBirth || null) {
    creatorIs.value = 'individual';
  }
});
</script>

<template>
  <div class="card">
    <h5 class="card-header">
      <formKit
          type="select"
          label="Creator"
          v-model="creatorIs"
          input-class="$reset formkit-input form-select"
          :options="{
              noCreator: 'Do not add a creator field',
              organization: 'The creator is an Organization',
              individual: 'The creator is a Person',
          }"
          ignore="true"
      />
    </h5>

    <FormKit
      type="group"
      name="creator"
      v-model="creator"
      v-if="creatorIs !== 'noCreator'"
    >
      <div class="card-body">
        <FormKit
          type="text"
          label="ID"
          name="id"
          wrapper-class="required"
          validation="uri:required:trim"
          help="Unique URI for the creator."
          />

        <FormKit
            type="hidden"
            name="type"
            :value="[ 'Profile' ]"
        />

        <FormKit
            type="text"
            label="Name"
            name="name"
            help="The name of the entity or organization."
        />

        <FormKit
            type="text"
            label="Description"
            name="description"
            help="A short description of the issuer entity or organization."
        />

        <CredentialImage
            help="An image that represents the creator.  Must be a PNG or SVG image."
            v-model="creator.image"
        />

        <FormKit
            type="text"
            label="Official"
            name="official"
            help="If the entity is an organization, `official` is the name of an authorized official of the organization."
            v-if="creatorIs === 'organization'"
        />

        <FormKit
            type="text"
            label="URL"
            name="url"
            validation="url"
            help="The homepage or social media profile of the entity, whether individual or institutional. Should be a URL/URI Accessible via HTTP."
        />

        <FormKit
            type="text"
            label="Email"
            name="email"
            validation="email"
            help="An email address for the creator."
        />

        <FormKit
            type="text"
            label="Phone"
            name="phone"
            help="A phone number for the creator."
        />

        <AddressComponent
            v-model="creator.address"
        />

        <FormKit
          type="text"
          label="Date of Birth"
          name="dateOfBirth"
          format="yyyy-MM-dd"
          help="Birthdate of the person."
          v-if="creatorIs === 'individual'"
          />

        <OtherIdentifiers
            label="Other Identifiers"
            v-model="creator.otherIdentifier"
            help="Other unique identifiers for the creator."
        />

        <FormKit
          type="text"
          label="Parent Org"
          name="parentOrg"
          placeholder="--TO BE EXPANDED--"
          v-if="false"
          />

        <FormKit
            type="text"
            label="Endorsement JWT"
            name="endorsementJwt"
            help="Allows endorsers to make specific claims about the individual or organization represented by this profile. These endorsements are signed with the VC-JWT proof format."
            placeholder="--TO BE EXPANDED --"
            v-if="false"
        />

        <FormKit
            type="text"
            label="Endorsement"
            name="endorsement"
            help="Allows endorsers to make specific claims about the individual or organization represented by this profile."
            placeholder="--TO BE EXPANDED --"
            v-if="false"
        />
      </div>
    </FormKit>
  </div>
</template>

<style scoped>

</style>
