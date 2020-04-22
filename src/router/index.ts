import Vue from 'vue';
import VueRouter from 'vue-router';
// import { getToken } from '@/utils/common'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        children: [
            {
                path: 'todo',
                name: 'todo',
                component: () => import('@/views/todo/Todo.vue'),
                children: [
                    {// 未完成todo列表
                        name: 'todo-list',
                        path: 'todo-list',
                        component: () => import('@/views/todo/TodoListNew.vue'),
                    },
                    {// 完成todo列表
                        name: 'todo-done-list',
                        path: 'todo-done-list',
                        component: () => import('@/views/todo/TodoDoneList.vue'),
                    },
                    {// 任务详情
                        path: 'task-info',
                        name: 'task-info',
                        component: () => import('@/views/todo/TaskInfo.vue'),
                    },
                ],
            },
            {
                path: 'note', // markdown笔记本
                name: 'note',
                component: () => import('@/views/note/Note.vue'),
                children: [
                    {
                        path: 'create/:code',
                        name: 'note-create',
                        component: () => import('@/views/note/NewNote.vue'),
                    }
                ]
            },
            {
                path: 'sign',
                name: 'sign',
                component: () => import('@/views/SignHome.vue'),
            },
            {
                path: 'setting',
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
