import { Module } from "vuex";
import { GlobalDataProps } from "@/store/index";

export interface UserDataProps {
    userName?: string;
}

export interface UserProps {
    data: UserDataProps;
    isLogin: boolean;
}

const user: Module<UserProps, GlobalDataProps> = {
    state: {
        data: {},
        isLogin: false
    },
    mutations: {
        login(state) {
            state.data = { ...state.data, userName: 'BOBO' }
            state.isLogin = true
        },
        logout(state) {
            state.isLogin = false
        }
    }
}
export default user
