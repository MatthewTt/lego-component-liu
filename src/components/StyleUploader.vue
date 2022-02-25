<template>
  <uploader
      class="style-upload-container"
      multiple
      :show-file-list="false"
      @success="handleChange"
      action="http://localhost:7001/upload"
      :before-upload="commonBeforeUploadCheck"
  >
    <div class="upload-container">
      <file-add-outlined/>
      <h4>上传文件</h4>
    </div>
    <template #uploading>
      <div class="upload-container">
        <loading-outlined/>
        <h4>上传中</h4>
      </div>
    </template>
    <template #uploaded>
      <div class="upload-container">
        <file-add-outlined/>
        <h4>上传图片</h4>
      </div>
    </template>
  </uploader>
</template>

<script lang="ts" setup>
import Uploader from "@/components/Uploader.vue";
import { FileAddOutlined, LoadingOutlined, } from "@ant-design/icons-vue";
import { commonBeforeUploadCheck } from "@/helper";
import { defineEmits } from "vue";
const emit = defineEmits(['change'])
const handleChange = (e: any) => {
  emit('change', e)
}
</script>

<style scoped>
.style-upload-container {
  width: 150px;
  height: 30px;
  color: #fff;
  background-color: #1890ff;
}

.upload-container {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.upload-container h4 {
  color: inherit;
  margin: 0;
}
</style>
