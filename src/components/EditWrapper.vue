<template>
<div class="edit-wrapper" @click="onItemClick" :class="{ 'active': active }">
  <slot></slot>
</div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  id: String,
  active: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['set-active'])

const onItemClick = () => {
  emit('set-active', props.id)
}
</script>

<style scoped>
.edit-wrapper {
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;
}
.edit-wrapper:hover {
  border: 1px dashed #999;
}
.edit-wrapper.active {
  border: 1px solid #1890ff;
}
</style>
