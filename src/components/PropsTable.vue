<template>
  <div class="props-table">
    <div
        v-for="(item,k) in finalProps"
        :key="k"
        class="form-label"
        :id="`item-${k}`"
        :class="{'no-text': ['fontWeight', 'fontStyle', 'textDecoration'].includes(k)}"
    >
      <span v-if="item.text">{{ item.text }}:</span>
      <component
          v-if="item"
          :is="componentList[item.component] || item.component"
          :[item.valueProp]="item.value"
          v-bind="item.extraProps"
          v-on="item.events"
          :class="['form-component']"
      >
        <template v-if="item.subComponent">
          <component :is="item.subComponent"
                     v-for="(option, key) in item.options"
                     :key="key"
                     :value="option.value"
          >
            <render-vnode :v-node="option.text"></render-vnode>
          </component>
        </template>
      </component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, FunctionalComponent, PropType, VNode } from "vue";
import { ImageDefaultProps, TextDefaultProps } from "@/defaultProps";
import { reduce } from "lodash";
import { AllProps, mapPropsToForm } from "../propsMap";
import RenderVnode from "@/components/renderVnode";
import { AntdIconProps } from "@ant-design/icons-vue/lib/components/AntdIcon";
import IconSwitch from "@/components/IconSwitch.vue";
import ImageProcesser from "@/components/ImageProcesser.vue";


interface FormProps {
  component: string;
  subComponent?: string;
  value: string;
  extraProps?: { [key: string]: any };
  text?: string;
  options?: { text: string | VNode; value: any }[];
  initialTransForm?: (val: any) => any;
  valueProp: string;
  eventName: string;
  events: { [key: string]: (e: any) => void };
}

const props = defineProps({
  props: {
    type: Object as PropType<AllProps>,
    required: true
  }
})
const emit = defineEmits(['change']);

const finalProps = computed(() => {
  return reduce(props.props, (result, value, key) => {
    const newKey = key as keyof AllProps
    const item = mapPropsToForm[newKey]
    if (item) {
      const { valueProp = 'value', eventName = 'change', initialTransForm, afterTransForm } = item
      const newItem: FormProps = {
        ...item,
        value: initialTransForm ? initialTransForm(value) : value,
        eventName,
        valueProp,
        events: {
          [eventName]: (e: any) =>
            emit('change', { key, value: afterTransForm ? afterTransForm(e) : e })
        }
      }
      result[newKey] = newItem
    }
    return result
  }, {} as { [key: string]: FormProps })
})
const componentList = {
  'iconSwitch': IconSwitch,
  'imageProcesser': ImageProcesser
}
</script>

<style scoped>
.props-table {
  padding: 15px;
  text-align: left;
}

.form-label {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.form-label > span {
  width: 28%;
}
.form-component {
  width: 70%;
}
.form-label.no-text {
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-right: 10px;
}
#item-fontWeight {
  margin-left: 28%;
}
</style>
