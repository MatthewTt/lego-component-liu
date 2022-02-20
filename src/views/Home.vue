<template>
  <template-list :list="list"></template-list>
</template>
<script lang="ts" setup>
// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import { computed } from 'vue';
import TemplateList from "@/components/TemplateList.vue";
import { useStore } from "vuex"
import { GlobalDataProps } from "@/store";

const store = useStore<GlobalDataProps>()
const list = computed(() => store.state.templates.data)
</script>
<style>
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}

.page-title {
  color: #fff;
  text-align: left;
}
</style>
