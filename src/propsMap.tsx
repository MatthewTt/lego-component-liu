import { ImageDefaultProps, TextDefaultProps } from "@/defaultProps";
import { FunctionalComponent, h, VNode } from "vue";
import { BoldOutlined } from "@ant-design/icons-vue";
import { AntdIconProps } from "@ant-design/icons-vue/lib/components/AntdIcon";
import IconSwitch from "@/components/IconSwitch.vue";


export interface PropToForm {
    component: string | any;
    subComponent?: string;
    extraProps?: { [key: string]: any };
    text?: string;
    options?: { text: string | VNode; value: any }[];
    // 传递给组件的值
    initialTransForm?: (val: any) => any;
    // 给html样式加的内容
    afterTransForm?: (val: any) => any;
    // 自定义组件需要的值，props
    valueProp?: string;
    eventName?: string;
}

export type AllProps = TextDefaultProps & ImageDefaultProps
export type PropsToForm = {
    [P in keyof AllProps]?: PropToForm
}

const fontFamilyArr = [
    { text: '宋体', value: '"SimSun","STSong"' },
    { text: '黑体', value: '"SimHei","STHeiti"' },
    { text: '楷体', value: '"KaiTi","STKaiti"' },
    { text: '仿宋', value: '"FangSong","STFangsong"' },
    { text: 'Arial', value: '"Arial", sans-serif' },
    { text: 'Arial Black', value: '"Arial Black", sans-serif' },
    { text: 'Comic Sans MS', value: '"Comic Sans MS"' },
    { text: 'Courier New', value: '"Courier New", monospace' },
    { text: 'Georgia', value: '"Georgia", serif' },
    { text: 'Times New Roman', value: '"Times New Roman", serif' }
]

const fontFamilOptions = fontFamilyArr.map(font => {
    return {
        value: font.value,
        text: h('span',{style: font.value}, font.text)
        // text: <span style={{ fontFamily: font.value }}>{font.text}</span> as VNode
    }
})

export const mapPropsToForm: PropsToForm = {
    text: {
        text: '文本',
        component: 'a-input',
        extraProps: {
            minRows: 3
        },
        afterTransForm: (e) => e.target.value
    },
    fontSize: {
        text: '字号',
        component: 'a-input-number',
        initialTransForm: (val: string) => parseFloat(val),
        afterTransForm: (e) => e ? `${e}px` : e
    },
    lineHeight: {
        text: '行高',
        component: 'a-slider',
        extraProps: {
            max: 3,
            min: 1,
            step: 0.1
        },
        initialTransForm: (val: string) => parseFloat(val),
        afterTransForm: (e) => parseFloat(e)
    },
    textAlign: {
        text: '对齐',
        component: 'a-radio-group',
        subComponent: 'a-radio-button',
        options: [{
            text: '左',
            value: 'left',
        }, {
            text: '中',
            value: 'center',
        }, {
            text: '右',
            value: 'right',
        }],
        afterTransForm: (e) => e.target.value

    },
    fontFamily: {
        text: '字体',
        component: 'a-select',
        subComponent: 'a-select-option',
        options: [
            { text: '无', value: '' },
            ...fontFamilOptions
        ]
    },
    fontWeight: {
        component: 'iconSwitch',
        extraProps: {
            iconName: 'BoldOutlined',
            tip: '加粗'
        },
        options: [{ value: '', text: '' }],
        valueProp: 'checked',
        initialTransForm: (val: string) => {
            return val === 'bold'
        },
        afterTransForm(e) {
            return e ? 'bold' : 'normal'
        }
    },
    fontStyle: {
        component: 'iconSwitch',
        extraProps: {
            iconName: 'ItalicOutlined',
            tip: '斜体'
        },
        options: [{ value: '', text: '' }],
        valueProp: 'checked',
        initialTransForm: (val: string) => {
            return val === 'italic'
        },
        afterTransForm(e) {
            return e ? 'italic' : 'normal'
        }
    },
    textDecoration: {
        component: 'iconSwitch',
        extraProps: {
            iconName: 'underline-outlined',
            tip: '下划线'
        },
        options: [{ value: '', text: '' }],
        valueProp: 'checked',
        initialTransForm: (val: string) => {
            return val === 'underline'
        },
        afterTransForm(e) {
            return e ? 'underline' : 'none'
        }
    },
    src: {
        component: 'imageProcesser',
    }
}
