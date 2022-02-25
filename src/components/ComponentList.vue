<template>
  <div class="component-list">
    <div v-for="(component) in list" :key="component.id" @click="onItemClick(component)">
      <l-text v-bind="component"></l-text>
    </div>

  <style-uploader @change="uploadChange" />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import LText from "@/components/LText.vue";
import StyleUploader from "@/components/StyleUploader.vue";
import { v4 as uuidv4 } from "uuid";
import { UploadImageResp } from "@/extraProps";
import { imageDefaultProps } from "@/defaultProps";
import { ComponentData } from "@/store/editor";
import { getImageOrigin } from "@/helper";

defineProps({
  list: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['onItemClick']);

const onItemClick = (component: any) => {
  const newComponent = {
    id: uuidv4(),
    name: 'lText',
    props: component
  }
  emit('onItemClick', newComponent)
}
const uploadChange = (props: UploadImageResp) => {
  getImageOrigin(props.data.url).then(({ width }) => {
    const newComponent: ComponentData = {
      id: uuidv4(),
      name: 'lImage',
      props: imageDefaultProps
    }
    const maxWidth = 870
    newComponent.props.src = props.data.url
    newComponent.props.width = (width > maxWidth ? maxWidth : width) + 'px'
    emit('onItemClick', newComponent)
  })
}
</script>

<style scoped>
.component-list {
  padding: 20px;
}
</style>
