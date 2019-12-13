import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import { getToken } from '@/utils/common'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
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

export default router
