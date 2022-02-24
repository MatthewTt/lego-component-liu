<template>
  <div class="app-container" >
    <uploader action="http://localhost:7001/upload" :before-upload="beforeUpload" @change="onChange" ref="uploadRef" :auto-upload="false" list-type="picture">
      <div class="drag-area">
        <p>click or drag file to this area to upload</p>
      </div>
    </uploader>
    <div>
      <a-button @click="upload">上传</a-button>
    </div>
    <router-view/>
  </div>
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.app-container {
  height: 100%;
}

</style>
<script>
import Uploader from '@/components/Uploader.vue'
import { onMounted, ref } from 'vue'

export default {
  components: { Uploader },
  setup() {
    const uploadRef = ref(null)
    const beforeUpload = (data) => {
      console.log('beforeUpload', data instanceof File)
      return data
    }
    const onChange = (data) => {
      console.log(data, 'change')
    }
    function upload(){
      if (uploadRef.value) {
        uploadRef.value.submit()
      }
    }
    return {
      beforeUpload,
      onChange,
      upload,
      uploadRef
    }
  }
}
</script>
