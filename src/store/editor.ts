import { v4 as uuidv4 } from "uuid";
import { Module } from "vuex";
import { GlobalDataProps } from "@/store/index";
import lText from "@/components/LText.vue";
import { TextDefaultProps } from "@/defaultProps";
import { defineAsyncComponent, shallowRef, toRefs } from "vue";
import { cloneDeep } from "lodash";


export interface ComponentData {
    props: { [key: string]: any }; // 组件各种属性
    id: string; // 组件id，uuid生成
    name: any; // 组件对象
}

export interface EditorProps {
    components: ComponentData[];
    currentElement: string; // 和id对应
}

export const testEditorList: ComponentData[] = [{
    id: uuidv4(),
    name: 'lText',
    props: {
        text: 'ddsds',
        fontSize: '20px',
        color: 'red',
        fontWidth: 'bold',
        actionType: 'url',
        url: 'http://baidu.com',
        position: 'relative'
    }
}, {
    id: uuidv4(),
    name: 'lText',
    props: {
        text: 'hello2',
        position: 'relative'
    }
}]

const editor: Module<EditorProps, GlobalDataProps> = {
    state: {
        components: testEditorList,
        currentElement: '',
    },
    mutations: {
        addComponent(state, props: Partial<TextDefaultProps>) {
            const newComponent = {
                id: uuidv4(),
                name: 'lText',
                props
            }
            state.components.push(newComponent)
        },
        setActive(state, currentId: string) {
            state.currentElement = currentId
        },
        updateComponent(state, { key, value }) {
            const newState = cloneDeep(state)
            const index = newState.components.findIndex(item => item.id === newState.currentElement)
            const current = newState.components[index]
            if (current) {
                current.props[key] = value
            }
            state.components[index] = current
        },
        removeActive(state) {
            const current = state.components.findIndex(item => item.id === state.currentElement)
            if (current) {
                state.components.splice(current, 1)
            }
        }
    },
    getters: {
        getCurrentElement(state) {
            return state.components.find(item => item.id === state.currentElement)
        }
    }

}
export default editor
