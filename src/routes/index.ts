import {createRouter, createWebHistory} from "vue-router"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('@/views/index.vue'),
            children: [
                {path: '', name: 'home', component: () => import('@/views/Home.vue')},
                {path: 'template/:id', name: 'template', component: () => import('@/views/TemplateDetail.vue')}
            ]
        },
        {
            path: '/edit',
            name: 'editor',
            component: () => import('@/views/Editor.vue')
        }
    ]
})

export default router
