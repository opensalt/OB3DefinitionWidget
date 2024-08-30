<script setup>
import {onBeforeMount, ref, watch} from "vue";
import { getNode } from "@formkit/core";

const props = defineProps({
  help: {
    type: String,
    default: 'An image that represents the credential.  Must be a PNG or SVG image.'
  }
})

const model = defineModel({ default: { id: '', type: '', caption: ''} });
const emit = defineEmits(['update:modelValue']);
const image = ref('');
const caption = ref('');
const id = ref('');

onBeforeMount(() => {
  id.value = model.value.id || null;
  caption.value = model.value.caption || null;
  if (id.value) {
    model.value.type = 'Image';
  }
});

watch(caption, (newCaption) => {
  // console.log('watching caption', newCaption);
  model.value.caption = newCaption;
});

watch(id, (newId) => {
  // console.log('watching id', newId);
  model.value.id = newId;
  model.value.type = newId ? 'Image' : null;
  model.value.caption = newId ? caption.value : null;
})

watch(image, (newImage) => {
  // console.log('watching image', newImage);
  if (!newImage) {
    return;
  }

  id.value = newImage;
});

function handleImage(e) {
  // console.log('handle image', e);

  if (0 === Object.keys(e).length) {
    // console.log('no keys');
    image.value = null;

    return;
  }

  const file = e[0].file;
  const reader = new FileReader();

  reader.onerror = (err) => {
    // console.log('image error');
    image.value = null;
  };
  reader.onload = (evt) => {
    // Use the loaded image data to set the badgeImage
    image.value = reader.result;
    // console.log('onload');

    if (image.value.substring(0, 11) !== 'data:image/') {
      // console.log(image.value);
      image.value = null;

      return false;
    }

    let f = getNode('ob3-file-upload-input');
    // console.log(f);
    f.context.handlers.resetFiles(evt);
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
  <div class="card mb-3">
    <div class="card-header">
      Image for the Credential
    </div>
    <div class="card-body">
      <FormKit
        type="group"
        name="image"
      >
        <div class="row">
          <div class="col-md-8">
            <FormKit
                label="ID"
                type="innerLabelTextInput"
                v-model="id"
                name="id"
                :help="props.help+' Can be a URL or data URI.'"
                inner-class="input-group"
                label-class="input-group-text"
                validation="uri"
                :validation-messages="{
                    uri: 'Please enter a valid URL or upload an image.'
                }"
            />
            <FormKit
                type="hidden"
                name="type"
                value="Image"
            />
          </div>
          <div class="col-md-4">
            <FormKit
                label="Upload Image"
                type="file"
                id="ob3-file-upload-input"
                accept="image/png, image/svg+xml"
                inner-class="d-none"
                label-class="btn btn-secondary"
                help="You can upload an image to save it as a data URI."
                @input="handleImage"
                ignore="true"
            >
              <template #fileList></template>
              <template #noFiles></template>
            </FormKit>
          </div>
        </div>

        <FormKit
            label="Caption"
            type="innerLabelTextInput"
            v-model="caption"
            name="caption"
            help="A caption for the image."
            inner-class="input-group"
            label-class="input-group-text"
            v-show="id"
        />

        <figure class="figure ms-3 mt-2" v-show="id">
          <img :src="id" alt="Image preview" class="img-thumbnail figure-img img-fluid rounded" id="cm-image-thumbnail">
          <figcaption class="figure-caption text-center">Image preview</figcaption>
        </figure>

      </FormKit>
    </div>
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
