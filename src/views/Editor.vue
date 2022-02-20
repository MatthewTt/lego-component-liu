<template>
  <a-layout class="layout-container">
    <a-layout-sider theme="light" width="300">
      <component-list :list="templateList" @onItemClick="addComponent"></component-list>
    </a-layout-sider>
    <a-layout>
      <a-layout-content class="content-container">
        <p>画布区域</p>
        <div class="preview-list">
          <edit-wrapper
              v-for="component in components"
              :key="component.id"
              :id="component.id"
              @setActive="setActive"
              @removeActive="removeActive"
              :active="component.id === (currentElement && currentElement.id)"
          >
            <component
                :is="component.name"
                v-bind="component.props"
            />
          </edit-wrapper>
        </div>
      </a-layout-content>
    </a-layout>
    <a-layout-sider theme="light" width="300">
      <props-table :props="currentElement && currentElement.props" @change="componentChange" />
      <pre>{{ currentElement && currentElement.props }}</pre>
    </a-layout-sider>
  </a-layout>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { GlobalDataProps } from "@/store";
import { computed, h } from "vue";
import { ComponentData } from "@/store/editor";
import ComponentList from "@/components/ComponentList.vue";
import { textDefaultTemplates as templateList } from "@/defaultTemplates";
import EditWrapper from "@/components/EditWrapper.vue";
import PropsTable from "@/components/PropsTable.vue";

const store = useStore<GlobalDataProps>()
const currentElement = computed<ComponentData >(() => store.getters.getCurrentElement)
const components = computed<ComponentData[]>(() => store.state.editor.components)
const addComponent = (data: any) => {
  store.commit('addComponent', data)
}

const setActive = (id: string) => {
  store.commit('setActive', id)
}
const componentChange = (val: any) => {
  store.commit('updateComponent', val)
}
const removeActive = () => {
  store.commit('removeActive')
}

</script>

<style scoped>
.layout-container {
  height: 100%;
}

.content-container {
  position: relative;
  padding: 20px;
}
</style>
