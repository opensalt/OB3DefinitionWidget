<script setup>
import {toRefs} from "vue";
import {useCredentialStore} from "@/stores/credential";

const credential = useCredentialStore();

function handleImage(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onerror = (e) => {
    credential.image = null;
  };
  reader.onload = (e) => {
    // Use the loaded image data to set the badgeImage
    credential.image = reader.result;
  };

  try {
    reader.readAsDataURL(file);
  } catch (e) {
    credential.image = null;
  }
}
</script>

<template>
  <div class="mb-3">
    <label for="badgeImage" class="form-label">Image</label>
    <input id="badgeImage" type="file" accept="image/png, image/svg+xml" @change="handleImage" class="form-control">
    <img :src="credential.image" alt="Achievement Image" class="img-thumbnail" id="cm-image-thumbnail" v-if="credential.image">
  </div>
</template>

<style scoped>
#cm-image-thumbnail {
  max-width: 200px;
  max-height: 200px;
  object-fit: contain;
  margin-bottom: 10px;
}
</style>
