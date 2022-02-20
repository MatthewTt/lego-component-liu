import { v4 as uuidv4 } from "uuid";
import { Module } from "vuex";
import { GlobalDataProps } from "@/store/index";
import lText from "@/components/LText.vue";
import { TextDefaultProps } from "@/defaultProps";
import { shallowRef } from "vue";


export interface ComponentData {
    props: { [key: string]: any }; // 组件各种属性
    id: string; // 组件id，uuid生成
    name: any; // 组件对象
}

export interface EditorProps {
    components: ComponentData[];
    currentElement: string; // 和id对应
    testJson: any;
}


const lTextRef = shallowRef(lText);
export const testEditorList: ComponentData[] = [{
    id: uuidv4(),
    name: lTextRef,
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
    name: lTextRef,
    props: {
        text: 'hello2',
        position: 'relative'
    }
}]

const editor: Module<EditorProps, GlobalDataProps> = {
    state: {
        components: testEditorList,
        currentElement: '',
        testJson: {
            name: {
                last: true
            }
        }
    },
    mutations: {
        addComponent(state, props: Partial<TextDefaultProps>) {
            const newComponent = {
                id: uuidv4(),
                name: lTextRef,
                props
            }
            state.components.push(newComponent)
        },
        setActive(state, currentId: string) {
            state.currentElement = currentId
        },
        updateComponent(state, { key, value }) {
            const update = state.components.find(item => item.id === state.currentElement)
            if (update) {
                update.props[key] = value
            }
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
