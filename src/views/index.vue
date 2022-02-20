<template>
  <div style="height: 100%;">
    <a-layout style="height: 100%;">
      <a-layout-header class="header">
        <div class="page-title">乐高</div>
        <user-profile :user="userInfo"/>
      </a-layout-header>
      <a-layout>
        <a-layout-content>
          <router-view/>
        </a-layout-content>
      </a-layout>
      <a-layout-footer>footer</a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { computed } from "vue";
import UserProfile from "@/components/UserProfile.vue";

const store = useStore()
const userInfo = computed(() => store.state.user)
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
