declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}

// import VueRouter, {Route} from 'vue-router';
// declare module 'vue/types/vue' {
//     interface Vue {
//         $router: VueRouter,
//         $route: Route
//     }
// }
//
// // 支持this.$http.post模式
// import HttpRequest from "@/http/HttpRequest";
// declare module 'vue/types/vue' {
//     interface Vue {
//         $http: HttpRequest, //自定义微信接口
//     }
// }
