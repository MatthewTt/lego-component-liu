import { createStore } from "vuex";
import templates, { TemplatesProps } from "@/store/templates";
import user, { UserProps } from "@/store/user";
import editor, { EditorProps } from "@/store/editor";


export interface GlobalDataProps {
    user: UserProps;
    templates: TemplatesProps;
    editor: EditorProps;
}


const store = createStore<GlobalDataProps>({
    modules: {
        templates,
        user,
        editor
    }
});

export default store

