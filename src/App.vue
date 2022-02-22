<template>
  <div class="app-container">
    <uploader action="http://localhost:7001/upload" :before-upload="beforeUpload">
      <template #uploaded="uploadedData">
        <i>成功了: {{ uploadedData.uploadedData }}</i>
      </template>
    </uploader>
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
import Uploader from '@/components/Uploader'

export default {
  components: { Uploader },
  setup() {
    const beforeUpload = (data) => {
      console.log('beforeUpload', data instanceof File)
      return data
    }
    return {
      beforeUpload
    }
  }
}
</script>
