<script setup>
import {ref, useSlots} from "vue";

const selectedIndex = ref(0);

const slots = useSlots();
const slotNames = Object.keys(slots);
console.log(slots, slotNames);

function selectTab(i, s) {
  selectedIndex.value = i;

  console.log(i, s);
}
</script>

<template>
  <div>
    <ul class="nav nav-tabs" role="tablist">
      <li v-for="(tab, index) of Object.keys($slots)" :key="tab.title" class="nav-item" role="presentation">
        <button class="nav-link active" :class='{"active": (index == selectedIndex)}' type="button" id="basic-tab" aria-controls="tab-basic" :aria-selected='{"true": (index == selectedIndex)}' @click="selectTab(index, $slots)">{{ tab.title }}</button>
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<style scoped>

</style>
