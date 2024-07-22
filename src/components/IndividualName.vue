<script setup>

</script>

<template>
  <FormKit
      type="group"
  >
    <FormKit
        type="text"
        label="Given Name"
        name="givenName"
        help="Given name. In the western world, often referred to as the 'first name' of a person."
    />

    <FormKit
        type="text"
        label="Additional Name"
        name="additionalName"
        help="Additional name. Includes what is often referred to as 'middle name' in the western world."
    />

    <FormKit
        type="text"
        label="Family Name Prefix"
        name="familyNamePrefix"
        help="Family name prefix. As used in some locales, this is the leading part of a family name (e.g. 'de' in the name 'de Boer')."
    />

    <FormKit
        type="text"
        label="Family Name"
        name="familyName"
        help="Family name. In the western world, often referred to as the 'last name' of a person."
    />

    <FormKit
        type="text"
        label="Patronymic Name"
        name="patronymicName"
        help="Patronynmic name."
        v-if="false"
    />

    <FormKit
        type="text"
        label="Honorific Prefix"
        name="honorificPrefix"
        help="Honorific prefix(es) preceding a person's name (e.g. 'Dr', 'Mrs' or 'Mr')."
    />

    <FormKit
        type="text"
        label="Honorific Suffix"
        name="honorificSuffix"
        help="Honorific suffix(es) following a person's name (e.g. 'M.D, PhD')."
    />
  </FormKit>
</template>

<style scoped>

</style>
