import Vue from 'vue';
import VueRouter from 'vue-router';
// import { getToken } from '@/utils/common'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/todo-list',
        component: () => import('@/views/Home.vue'),
        children: [
            {
                path: '/todo',
                name: 'todo',
                component: () => import('@/views/todo/Todo.vue'),
                children: [
                    {
                        path: '/todo-list',
                        name: 'todo-list',
                        component: () => import('@/views/todo/TodoListNew.vue'),
                    },
                    {
                        path: '/todo-done-list',
                        name: 'todo-done-list',
                        component: () => import('@/views/todo/TodoDoneList.vue'),
                    },
                ],
            },
            {
                path: '/sign',
                name: 'sign',
                component: () => import('@/views/SignHome.vue'),
            },
            {
                path: '/setting',
                name: 'setting',
                component: () => import('@/views/Setting.vue'),
            },
        ],
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/About.vue'),
    },
];

const router = new VueRouter({
    mode: process.env.IS_ELECTRON ? 'hash' : 'history',
    base: process.env.BASE_URL,
    routes,
});

// 登陆页面路由 name
// const LOGIN_PAGE_NAME = 'login';
//
// router.beforeEach((to, from, next) => {
//     const token = /*getToken() || */"";
//     if (!token && to.name !== LOGIN_PAGE_NAME) {
//         // 未登录且要跳转的页面不是登录页
//         next({
//             name: LOGIN_PAGE_NAME // 跳转到登录页
//         })
//     } else if (!token && to.name === LOGIN_PAGE_NAME) {
//         // 未登陆且要跳转的页面是登录页
//         next() // 跳转
//     } else if (token && to.name === LOGIN_PAGE_NAME) {
//         // 已登录且要跳转的页面是登录页
//         next({
//             name: 'index' // 跳转到 index 页
//         })
//     } else {
//         if (token) {
//             next() // 跳转
//         } else {
//             next({
//                 name: LOGIN_PAGE_NAME
//             })
//         }
//     }
// });
//
// // 跳转之后
// router.afterEach(to => {
//     //
// })

export {router};
