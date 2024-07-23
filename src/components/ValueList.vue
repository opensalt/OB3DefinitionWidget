<script setup>
import {ref, watch} from "vue";
import {FormKitIcon} from '@formkit/vue'
import {vAutoAnimate} from '@formkit/auto-animate'

const values = ref([]);
const model = defineModel({ default: [] });

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
    <FormKit v-model="values" name="allowedValue" type="list" dynamic #default="{ items, node, value }">
      <h5>Allowed Values
        <button type="button" @click="values.push(null)" class="btn btn-sm btn-primary ms-3">
          Add Value
        </button>
      </h5>
      <p class="form-text">
        An ordered list of allowed values. The values should be ordered from low to high as determined by the achievement creator.
      </p>

      <div class="ms-5 mb-3 p-3 border rounded col-md-8" v-if="items.length > 0">
        <div v-for="(item, index) in items" :key="item" class="value-item">
          <FormKit
              type="innerLabelTextInput"
              :index="index"
              inner-class="input-group"
              label-class="input-group-text"
              :validation-rules="{ distinct }"
              validation="required:trim|distinct"
              :validation-messages="{
                'required': 'A value is required.',
                'distinct': 'The values must all be different.',
              }"
              outer-class="$reset"
              :aria-label="'Allowed value '+(index+1)"
          >
            <template #label="context">
              <label :class="context.classes.label">{{ index + 1 }}</label>
            </template>
          </FormKit>
          <ul class="controls mt-2">
            <li>
              <button
                  type="button"
                  @click="values.splice(index - 1, 0, values.splice(index, 1)[0])"
                  class="button"
              >
                <FormKitIcon icon="arrowUp"/>
              </button>
            </li>
            <li>
              <button
                  type="button"
                  @click="values.splice(index + 1, 0, values.splice(index, 1)[0])"
                  class="button"
              >
                <FormKitIcon icon="arrowDown"/>
              </button>
            </li>
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
