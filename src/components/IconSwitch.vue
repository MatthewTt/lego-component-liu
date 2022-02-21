<template>
  <div class="icon-template" @click.prevent="handleClick">
    <a-tooltip>
      <template #title>{{ tip }}</template>
      <a-button :type="checked ? 'primary' : 'default'" shape="circle">
        <template #icon>
          <component :is="iconName"></component>
        </template>
      </a-button>
    </a-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineProps } from "vue";
import { BoldOutlined,ItalicOutlined,UnderlineOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  props: {
    tip: String,
    checked: Boolean,
    iconName: {
      type: String,
      required: true
    }
  },
  components: {
    BoldOutlined,
    ItalicOutlined,
    UnderlineOutlined
  },
  emits: ['change'],
  setup(props, ctx) {
    const handleClick = () => {
      ctx.emit('change', !props.checked)
    }
    return {
      handleClick
    }
  }
})
</script>

<style scoped>
.icon-template {
  /*margin-left: 28%;*/
  display: inline-block;
}
</style>
