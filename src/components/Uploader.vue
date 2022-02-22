<template>
  <div class="file-upload">
    <div @click="triggerUpload">
      <slot name="uploading" v-if="isUploading">
        <button disabled>正在上传</button>
      </slot>
      <slot name="uploaded" v-else-if="lastFileData && lastFileData.loaded" :uploadedData="lastFileData.response">
        <button>上传成功</button>
      </slot>
      <slot v-else>
        <button>点击上传</button>
      </slot>
    </div>
    <input type="file" name="file" style="display: none" ref="fileUploader" @change="handleUploadChange"/>
    <ul>
      <li :class="`upload-file upload-${file.status}`"
          v-for="file in uploadFiles"
          :key="file.uid"
      >
        <div class="icon">
          <check-circle-outlined v-if="file.status === 'success'"/>
          <loading-outlined v-if="file.status === 'uploading'"/>
          <close-circle-outlined v-else-if="file.status === 'fail'"/>
        </div>
        <span>{{ file.name }}</span>
        <delete-outlined class="del-icon"/>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, PropType, reactive, ref } from "vue";
import axios from "axios"
import { v4 as uuidv4 } from "uuid";
import { DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { last } from "lodash";


type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail'
type CheckUpload = (file: File) => boolean | Promise<File>

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status: UploadStatus;
  raw: File;
  response?: any;
}

const props = defineProps({
  action: {
    type: String,
    required: true
  },
  beforeUpload: {
    type: Function as PropType<CheckUpload>
  }
});
const fileUploader = ref<null | HTMLInputElement>(null)
const uploadFiles = ref<UploadFile[]>([])

const isUploading = computed(() => uploadFiles.value.some((file) => file.status === 'uploading'))
const lastFileData = computed(() => {
  const lastFile = last(uploadFiles.value)
  if (lastFile) {
    return {
      loaded: lastFile.status === 'success',
      response: lastFile.response
    }
  }
  return false
})
const triggerUpload = () => {
  if (fileUploader.value) {
    fileUploader.value.click()
  }
}

const postFile = (file: File) => {
  const formData = new FormData();
  formData.append(file.name, file)
  const fileObj = reactive<UploadFile>({
    uid: uuidv4(),
    name: file.name,
    size: file.size,
    status: 'uploading',
    raw: file
  })
  uploadFiles.value.push(fileObj)
  axios.post(props.action, formData, {
    headers: {
      'Content-type': 'multipart/form-data'
    }
  }).then((res) => {
    fileObj.status = 'success'
    fileObj.response = res.data
  }).catch(error => {
    fileObj.status = 'fail'
    console.log(error)
  }).finally(() => {
    if (fileUploader.value) {
      fileUploader.value.value = ''
    }
  })
}
const handleUploadChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files) {
    const file = files[0]
    if (props.beforeUpload) {
      const result = props.beforeUpload(file)
      if (result && result instanceof Promise) {
        result.then(fileData => {
          postFile(fileData)
        }).catch(error => {
          console.error(error)
        })
      } else if(result) {
        postFile(file)
      }
    } else {
      postFile(file)
    }
  }
}
</script>

<style scoped>
.upload-file {
  position: relative;
  display: flex;
  align-items: center;
  list-style: none;
  cursor: pointer;
}

.upload-file:hover {
  background-color: #eee;
}

.upload-file:hover .del-icon {
  display: block;
}

.upload-success span {
  color: #42b983;
}

.upload-fail span {
  color: crimson;
}

.upload-uploading span {
  color: sandybrown;
}

.icon {
  margin-right: 10px;
}

.del-icon {
  display: none;
  position: absolute;
  right: 0;
}
</style>
