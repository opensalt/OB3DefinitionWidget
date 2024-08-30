<script setup>
import TagList from "@/components/TagList.vue";
import RelatedList from "@/components/RelatedList.vue";
import OtherIdentifiers from "@/components/OtherIdentifiers.vue";
import CreatorProfile from "@/components/CreatorProfile.vue";

const model = defineModel({ default: {} });
</script>

<template>
  <div class="tab-pane fade show active" id="tab-additional" role="tabpanel" aria-labelledby="additional-tab">
    <FormKit
      type="text"
      name="id"
      label="ID"
      v-model="model.id"
      validation="uri:trim"
      help="Unique URI for the Achievement."
      />

    <TagList v-model="model.tag"/>

    <RelatedList v-model="model.related" />

    <OtherIdentifiers v-model="model.otherIdentifier"/>

    <CreatorProfile v-model="model.creator" />
  </div>
</template>

<style scoped>

</style>
