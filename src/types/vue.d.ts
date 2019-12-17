
// 此单独文件用于声明vue扩展属性
import VueRouter, {Route} from 'vue-router';
declare module 'vue/types/vue' {
    interface Vue {
        $router: VueRouter,
        $route: Route
    }
}

// 支持this.$http.post模式
import HttpRequest from "@/http/HttpRequest";
declare module 'vue/types/vue' {
    interface Vue {
        $http: HttpRequest, //自定义微信接口
    }
}

import moment from "moment";
declare module 'vue/types/vue' {
    interface Vue {
        $moment: moment.fn, //自定义微信接口
    }
}
