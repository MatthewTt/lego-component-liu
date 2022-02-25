<template>
<div class="image-process">
  <div class="image-preview" :style="{'background-image': `url(${value})`}"></div>
  <uploader
    action="http://localhost:7001/upload"
    :show-file-list="false"
    @success="handleSuccess"
  >
    <a-button shape="round">
      <template #icon>
        <upload-outlined></upload-outlined>
      </template>
      更换图片
    </a-button>
    <template #uploading>
      <a-button shape="round">
        <template #icon>
          <loading-outlined></loading-outlined>
        </template>
        上传中..
      </a-button>
    </template>
    <template #uploaded>
      <a-button shape="round">
        <template #icon>
          <upload-outlined></upload-outlined>
        </template>
        更换图片
      </a-button>
    </template>
  </uploader>
</div>
</template>

<script lang="ts" setup>
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons-vue";

import Uploader from "@/components/Uploader.vue";
import { UploadImageResp } from "@/extraProps";
import { defineEmits, defineProps, ref } from "vue";
defineProps({
  value: String
})
const emit = defineEmits(['change']);
const handleSuccess = (data: UploadImageResp) => {
  emit('change', data.data.url)
}

</script>

<style scoped>
.image-process {
  display: flex;
  align-items: center;
}
.image-preview {
  width: 100px;
  height: 100px;
  margin-right: 10px;
  background: no-repeat 50%/contain;

}
</style>
