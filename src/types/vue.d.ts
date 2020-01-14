
// 此单独文件用于声明vue扩展属性
import Vue, { VueConstructor } from 'vue';
import VueRouter, {Route} from 'vue-router';
declare module 'vue/types/vue' {
    interface Vue {
        $router: VueRouter;
        $route: Route;
    }
}

// 支持this.$http.post模式
import {HttpRequest} from '@/http/HttpRequest';
declare module 'vue/types/vue' {
    interface Vue {
        $http: HttpRequest; // 自定义微信接口
    }
}

import moment from 'moment';
declare module 'vue/types/vue' {
    interface Vue {
        // 这里声明作为全局使用
        $moment(inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, strict?: boolean): moment.Moment;
        $moment(inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, language?: string, strict?: boolean): moment.Moment;
    }
    interface VueConstructor {
        $moment(inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, strict?: boolean): moment.Moment;
        $moment(inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, language?: string, strict?: boolean): moment.Moment;
    }
}

// lodash
import lodash from 'lodash';
declare module 'vue/types/vue' {
    interface Vue {
        // 这里声明作为全局使用
        $_: typeof lodash;
    }
}