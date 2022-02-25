import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from "@/routes";
import store from "@/store";

const app = createApp(App);
/**
 * 全局捕获异常
 * @param err
 * @param instance
 * @param info
 */
app.config.errorHandler = (err, instance, info) => {
    console.error(err)
    console.error(instance)
    console.error(info)
}

app.use(Antd).use(router).use(store).mount('#app')
