<template>
  <div class="file-upload" v-on="event">
    <template v-if="drag">
      <div :class="{'is-dragover': isDragOver}" class="drag-area">
        <slot></slot>
      </div>
    </template>
    <template v-else>
      <slot name="uploading" v-if="isUploading">
        <button disabled>正在上传</button>
      </slot>
      <slot name="uploaded" v-else-if="lastFileData && lastFileData.loaded" :uploadedData="lastFileData.response">
        <button>上传成功</button>
      </slot>
      <slot v-else>
        <button>点击上传</button>
      </slot>
    </template>
    <input type="file" :name="name" style="display: none" ref="fileUploader" :multiple="multiple" :accept="accept"
           @change="handleUploadChange"/>
    <ul style="padding: 0;" v-if="showFileList">
      <li :class="`upload-file upload-${file.status}`"
          v-for="file in uploadFiles"
          :key="file.uid"
      >
        <img v-if="listType === 'picture' && file.url" :src="file.url" :alt="file.name"  class="upload-img-thumb">
        <div class="icon">
          <check-circle-outlined v-if="file.status  === 'success'"/>
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
import { computed, defineEmits, defineExpose, defineProps, PropType, reactive, ref } from "vue";
import axios from "axios"
import { v4 as uuidv4 } from "uuid";
import { DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { last } from "lodash";
import { message } from "ant-design-vue";


type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail'
type CheckUpload = (file: File) => boolean | Promise<File>
type FileListType = 'picture' | 'text'

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status: UploadStatus;
  raw: File;
  response?: any;
  url?: string;
}

const props = defineProps({
  action: {
    type: String,
    required: true
  },
  beforeUpload: {
    type: Function as PropType<CheckUpload>
  },
  headers: Object,
  name: {
    type: String,
    default: 'file'
  },
  data: {
    type: Object
  },
  multiple: {
    type: Boolean,
    default: false
  },
  accept: String,
  drag: Boolean,
  autoUpload: {
    type: Boolean,
    default: true
  },
  listType: {
    type: String as PropType<FileListType>,
    default: 'text'
  },
  showFileList: {
    type: Boolean,
    default: true
  }
});
const emit = defineEmits(['change', 'success']);
const fileUploader = ref<null | HTMLInputElement>(null)
const uploadFiles = ref<UploadFile[]>([])
const isDragOver = ref(false)

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

function emitChange(option: any) {
  emit('change', option)
}

function onSuccess(file: UploadFile) {
  const info = {
    // file: file.response,
    // fileList: uploadFiles
    ...file.response
  }
  emit('success', info)
}

const onError = (error: any, file: UploadFile) => {
  const info = {
    type: 'error',
    file: file,
    fileList: uploadFiles
  }
  emitChange(info)
}
const onProgress = (e: ProgressEvent, file: UploadFile) => {
  const persent = e.loaded / e.total * 100
  const info = {
    events: e,
    file: { ...file, persent },
    fileList: uploadFiles
  }
  emitChange(info)
}
const postFile = (readyFile: UploadFile) => {
  const formData = new FormData();
  formData.append(readyFile.name, readyFile.raw)
  readyFile.status = 'uploading'
  axios.post(props.action, formData, {
    headers: {
      'Content-type': 'multipart/form-data',
      ...props.headers
    },
    data: props.data,
    onUploadProgress: (progressEvent => {
      onProgress(progressEvent, readyFile)
    })
  }).then((res) => {
    readyFile.status = 'success'
    readyFile.response = res.data
    onSuccess(readyFile)
  }).catch(error => {
    readyFile.status = 'fail'
    onError(error, readyFile)
  }).finally(() => {
    if (fileUploader.value) {
      fileUploader.value.value = ''
    }
  })
}

const addFilesToList = (file: File) => {
  const fileObj = reactive<UploadFile>({
    uid: uuidv4(),
    name: file.name,
    size: file.size,
    status: 'ready',
    raw: file
  })
  if (props.listType === 'picture') {
    /*try {
      fileObj.url = URL.createObjectURL(file)
    } catch (e) {
      console.error('upload file fail', e)
    }*/
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file)
    fileReader.addEventListener('load', () => {
      fileObj.url = fileReader.result as string
    })
  }
  uploadFiles.value.push(fileObj)
  if (props.autoUpload) {
    postFile(fileObj)
  }

}
/**
 * 上传文件列表函数
 * @param files
 */
const uploadFilesFn = (files: null | FileList) => {
  if (!files) return
  // const files = target.files
  if (files) {
    const file = files[0]
    if (props.beforeUpload) {
      const result = props.beforeUpload(file)
      if (result && result instanceof Promise) {
        result.then(fileData => {
          addFilesToList(fileData)
        }).catch(error => {
          console.error(error)
        })
      } else if (result) {
        addFilesToList(file)
      }
    } else {
      addFilesToList(file)
    }
  }
}
const handleUploadChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  uploadFilesFn(target.files)
}

const submit = () => {
  const readyFiles = uploadFiles.value;
  console.log('submit')
  const allReady = readyFiles.some(file => file.status === 'ready');
  if (allReady) {
    readyFiles.forEach(file => postFile(file))
  } else {
    message.warn('文件还没全部上传完毕，请稍后再试！！')
  }
}

let event: { [key: string]: (e: any) => void } = {
  'click': triggerUpload
}
/**
 * 处理移入移除，控制变量，加上类名
 * @param e
 * @param val
 */
const handleDrag = (e: DragEvent, val: boolean) => {
  e.preventDefault()
  isDragOver.value = val
}
const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragOver.value = false
  if (e.dataTransfer) {
    uploadFilesFn(e.dataTransfer.files)
  }
}
if (props.drag) {
  event = {
    ...event,
    'dragover': (e: any) => handleDrag(e, true),
    'dragleave': (e: any) => handleDrag(e, false),
    'drop': handleDrop
  }
}

defineExpose({ submit })
</script>

<style scoped>
.upload-file {
  position: relative;
  display: flex;
  align-items: center;
  list-style: none;
  cursor: pointer;
  padding: 0 20px 0 0 ;
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


.file-upload {
  display: inline-block;
}

.drag-area {
  cursor: pointer;
  width: 300px;
  border: 1px dashed #999;
  height: 150px;
  background-color: #fafafa
}

.drag-area:hover {
  border: 1px dashed #1890ff;
}

.is-dragover {
  border: 1px dashed #1890ff;
  background-color: rgba(24, 144, 255, 0.2);
}

.upload-img-thumb {
  display: inline-block;
  width: 75px;
  height: 75px;
}
</style>
