<template>
  <div class="work-detail-container">
    <a-row type="flex" justify="center">
      <a-col :span="8" class="cover-img">
        <img :src="currentTemplate.coverImg" alt="">
      </a-col>
      <a-col :span="8">
        <h2>{{ currentTemplate.title }}</h2>
        <p>{{ currentTemplate.desc }}</p>
        <div class="author">
<!--          <a-avatar :src="currentTemplate.user.picture" v-if="currentTemplate.user.picture">-->
<!--          </a-avatar>-->
          <a-avatar>
            <template v-slot:icon>
              <UserOutlined/>
            </template>
          </a-avatar>
          该模版由 <b>{{ currentTemplate.author }}</b> 创作
        </div>
        <div class="bar-code-area">
          <span>扫一扫，手机预览</span>
          <div ref="container"></div>
        </div>
        <div class="use-button">
          <a-button
              type="primary" size="large"
              :style="{'padding': '0 20px', 'height': '50px'}"
              @click="onCopy(currentTemplate.id)"
              :loading="isCreating"
          >
            {{ isCreating ? '创建中...' : '使用模版' }}
          </a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { UserOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";
import { TemplateProps } from "@/store/templates";

const router = useRouter()
const store = useStore();
const route = useRoute();
const currentId = route.params.id as string
const currentTemplate = computed<TemplateProps>(() => store.getters.getTemplateById(Number(currentId)))
console.log(currentTemplate)
function onCopy(id) {
  router.push('/edit')
}
</script>

<style scoped>
.work-detail-container {
  margin-top: 50px;
}

.cover-img {
  margin-right: 30px;
}

.cover-img img {
  width: 100%;
}

.use-button {
  margin: 30px 0;
}

.ant-avatar {
  margin-right: 10px;
}

.bar-code-area {
  margin: 20px 0;
}
</style>
