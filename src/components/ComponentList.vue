<template>
  <div class="component-list">
    <div v-for="(component, index) in list" :key="index" @click="onItemClick(component)">
      <l-text v-bind="component"></l-text>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import LText from "@/components/LText.vue";

defineProps({
  list: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['onItemClick']);

const onItemClick = (component: any) => {
  emit('onItemClick', component)
}
</script>

<style scoped>
.component-list {
  padding: 20px;
}
</style>
