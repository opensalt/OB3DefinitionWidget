<script setup>
import {onBeforeMount, onMounted, ref, watch} from "vue";

const props = defineProps({
  help: {
    type: String,
    default: 'An image that represents the credential.  Must be a PNG or SVG image.'
  }
})

const model = defineModel({ default: { id: '', type: 'Image', caption: ''} });
const emit = defineEmits(['update:modelValue']);
const image = ref('');
const caption = ref('');

onBeforeMount(() => {
  // console.log('Mounted', model.value);
  image.value = model.value.id || null;
  caption.value = model.value.caption || null;
})

watch(caption, (newCaption) => {
  // console.log('watching caption', newCaption);
  model.value.caption = newCaption;
  emit('update:modelValue', model.value);
});

watch(image, (newImage) => {
  // console.log('watching', newImage);
  model.value.id = newImage;
  model.value.type = newImage ? 'Image' : null;
  emit('update:modelValue', model.value);
});

function handleImage(e) {
  // console.log('handle image');

  if (0 === Object.keys(e).length) {
    // console.log('no keys');
    image.value = null;
    caption.value = null;

    return;
  }

  const file = e[0].file;
  const reader = new FileReader();

  reader.onerror = (e) => {
    // console.log('image error');
    image.value = null;
  };
  reader.onload = (e) => {
    // Use the loaded image data to set the badgeImage
    image.value = reader.result;
    // console.log('onload');

    if (image.value.substring(0, 11) !== 'data:image/') {
      // console.log(image.value);
      image.value = null;

      return false;
    }
  };

  try {
    reader.readAsDataURL(file);
  } catch (e) {
    // console.log('error', e);
    image.value = null;
  }
}
</script>

<template>
  <FormKit
    type="group"
    ignore="true"
  >
    <FormKit
      label="Image"
      type="file"
      accept="image/png, image/svg+xml"
      :help="props.help"
      inner-class=""
      @input="handleImage"
      ignore="true"
    >
      <template #fileList></template>
      <template #suffix>
        <figure class="figure ms-3 mt-2" v-show="image">
          <img :src="image" alt="Image preview" class="img-thumbnail figure-img img-fluid rounded" id="cm-image-thumbnail" v-show="image">
          <figcaption class="figure-caption text-center">Image preview</figcaption>
        </figure>
      </template>
    </FormKit>

    <FormKit
      label="Image Caption"
      type="text"
      v-model="caption"
      help="A caption for the image."
      v-show="image"
      ignore="true"
    />
  </FormKit>
</template>

<style scoped>
#cm-image-thumbnail {
  max-width: 200px;
  max-height: 200px;
  object-fit: contain;
  margin-bottom: 10px;
}
</style>
