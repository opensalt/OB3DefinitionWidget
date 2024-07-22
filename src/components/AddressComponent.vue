<script setup>
import {ref} from "vue";

const model = defineModel({ default: {} });
const show = ref(false);
</script>

<template>
  <FormKit
      type="group"
      name="address"
      v-model="model"
  >
    <FormKit
        type="checkbox"
        label="Include address"
        v-model="show"
        wrapper-class="form-check form-switch"
        input-class="$reset form-check-input"
        label-class="$reset form-check-label"
        role="switch"
        ignore="true"
    />

    <div v-show="show">
      <FormKit
          type="hidden"
          name="type"
          :value="[ 'Address' ]"
      />

      <FormKit
          type="text"
          label="Street Address"
          name="streetAddress"
          help="Street address of the creator."
      />

      <FormKit
          type="text"
          label="Post Office Box Number"
          name="postOfficeBoxNumber"
          help="A post office box number for PO box addresses."
      />

      <FormKit
          type="text"
          label="City"
          name="addressLocality"
          help="A locality within the region."
      />

      <FormKit
          type="text"
          label="State"
          name="addressRegion"
          help="The region within the country."
      />

      <FormKit
          type="text"
          label="Postal Code"
          name="postalCode"
          help="A postal code."
      />

      <FormKit
          type="text"
          label="Country"
          name="addressCountry"
          help="Country name."
      />

      <FormKit
          type="text"
          label="Country Code"
          name="addressCountryCode"
          help="Country code.  The value must be a ISO 3166-1 alpha-2 country code, such as 'US'."
      />

      <FormKit
          type="group"
          label="Geo"
          name="geo"
          v-if="false"
      >
        <FormKit
            type="hidden"
            name="type"
            :value="'GeoCoordinates'"
        />

        <FormKit
            type="text"
            label="Latitude"
            name="latitude"
            help="The latitude of the geographic point."
        />
        <FormKit
            type="text"
            label="Longitude"
            name="longitude"
            help="The longitude of the geographic point."
        />
      </FormKit>
    </div>
  </FormKit>
</template>

<style scoped>

</style>
