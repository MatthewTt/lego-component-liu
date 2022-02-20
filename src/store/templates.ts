import { Module } from "vuex";
import { GlobalDataProps } from "@/store/index";

export interface TemplateProps {
    id: number;
    title: string;
    coverImg: string;
    author: string;
    copiedCount: number;
}

export interface TemplatesProps {
    data: TemplateProps[];
}

const templateList = [{
    id: 1,
    title: '标题',
    coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-889755.png',
    copiedCount: 0,
    author: 'hj'
}, {
    id: 2,
    title: '标题2',
    coverImg: 'http://static-dev.imooc-lego.com/imooc-test/sZHlgv.png',
    copiedCount: 21,
    author: '阿瑟🤔'
}]

const templates: Module<TemplatesProps, GlobalDataProps> = {
    state: {
        data: templateList
    },
    getters: {
        getTemplateById: (state) => (id: number) => {
            return state.data.find(template => template.id === id)
        }
    }
}

export default templates
