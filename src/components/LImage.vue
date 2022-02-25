<template>
  <img :src="src" :style="styleProps">
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useComponentCommon from "@/hooks/useComponentCommon";
import { imageDefaultProps, transformProps, imageStyleProps } from "@/defaultProps";

const defaultProps = transformProps(imageDefaultProps)
export default defineComponent({
  props: {
    ...defaultProps
  },
  setup(props) {
    const { handleClick, styleProps } = useComponentCommon(props, imageStyleProps());
    return {
      handleClick,
      styleProps
    }
  }
})
</script>

<style scoped>
img {
  position: relative !important;
}
</style>
