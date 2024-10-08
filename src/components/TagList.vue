<script setup>
import {onBeforeMount, ref, watch} from "vue";
import {FormKitIcon} from '@formkit/vue'
import {vAutoAnimate} from '@formkit/auto-animate'

const values = ref([]);
const model = defineModel({ default: [] });

onBeforeMount(() => {
  values.value = model.value;
});
function distinct(node) {
  // 👀 use node traversal to get the parent node
  const parent = node.at('$parent')
  if (parent.value) {
    // Ensure all the siblings are different values
    for (const childName in parent.value) {
      if (''+childName === ''+node.name) {
        continue;
      }
      if (parent.value[childName] === node.value) {
        return false;
      }
    }
  }
  return true
}

watch(values, (newValues) => {
  model.value = newValues;
});
</script>

<template>
  <div v-auto-animate>
    <FormKit v-model="values" name="tag" type="list" dynamic #default="{ items, node, value }">
      <h5>Tags
        <button type="button" @click="values.push(null)" class="btn btn-sm btn-primary ms-3">
          Add Tag
        </button>
      </h5>
      <p class="form-text">One or more short, human-friendly, searchable, keywords that describe the type of achievement.</p>

      <div class="ms-5 mb-3 p-3 border rounded" v-if="items.length > 0">
        <div v-for="(item, index) in items" :key="item" class="value-item">
          <FormKit
              type="text"
              :index="index"
              :validation-rules="{ distinct }"
              validation="required:trim|distinct"
              placeholder="Enter tag"
              :validation-messages="{
                'required': 'Value is required',
                'distinct': 'The tags must be distinct',
              }"
              outer-class="$reset"
          />
          <ul class="controls mt-2">
            <li>
              <button
                  type="button"
                  @click="values.splice(index, 1)"
                  class="button close"
              >
                <FormKitIcon icon="close"/>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </FormKit>
  </div>
</template>

<style scoped>
.value-item {
  display: flex;
  align-items: start;
  margin-bottom: 0.5rem;
}

.value-item:deep(.formkit-outer) {
  margin-bottom: 0;
  flex-grow: 1;
}

.controls {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

.controls .button {
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  color: #999;
  line-height: 1;
  transition: color 0.3s ease;
  appearance: none;
  font-size: 1em;
  color: var(--fk-color-primary);
  margin-left: 0.5rem;
}

.controls:deep(svg) {
  display: block;
  width: 1em;
  max-height: 1.25em;
  height: auto;
  fill: currentColor;
}

.controls .close {
  color: var(--fk-color-danger);
}
</style>
