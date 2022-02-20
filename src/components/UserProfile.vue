<template>
  <a-button type="primary" v-if="!user.isLogin" @click="login">登陆</a-button>
  <div v-else>
    <a-dropdown-button>
      {{ user.data.userName }}
      <template #overlay>
        <a-menu>
          <a-menu-item key="1" @click="logout">
            <UserOutlined/>
            登出
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown-button>
  </div>
</template>

<script lang="ts" setup>
import { message } from "ant-design-vue";
import { UserOutlined } from "@ant-design/icons-vue"
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { defineProps, PropType } from "vue";
import { GlobalDataProps } from "@/store";
import { UserProps } from "@/store/user";

const store = useStore<GlobalDataProps>()
const router = useRouter()

defineProps({
  user: Object as PropType<UserProps>
})

const login = () => {
  store.commit('login')
}
const logout = () => {
  store.commit('logout')
  message.success('登出成功，2秒后自动返回首页')
  setTimeout(() => router.push('/'), 2000)
}

</script>

<style scoped>

</style>
