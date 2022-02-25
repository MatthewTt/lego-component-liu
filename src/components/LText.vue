<template>
  <component :is="tag" :style="styleProps" @click="handleClick" class="text-component">{{ text }}</component>
</template>

<script lang="ts">
import { textDefaultProps, transformProps, textStyleProps, TextDefaultProps } from '@/defaultProps'
import { defineComponent } from "vue";
import useComponentCommon from "@/hooks/useComponentCommon";

const defaultProps = transformProps(textDefaultProps);
export default defineComponent({
  props: {
    tag: { type: String, default: 'div' },
    ...defaultProps
  },
  setup(props: Partial<TextDefaultProps>) {
    const { styleProps, handleClick } = useComponentCommon<TextDefaultProps>(props, textStyleProps());
    return {
      styleProps,
      handleClick
    }
  }
})
</script>

<style scoped>
.text-component {
  position: relative !important;
}
</style>
