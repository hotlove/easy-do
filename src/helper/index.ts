import Vue from "vue";
import { request } from "@/http";
import moment from "moment";
import MuseUI from 'muse-ui';
import ElementUI from 'element-ui';
import lodash from "lodash";
import 'muse-ui/dist/muse-ui.css'
import 'element-ui/lib/theme-chalk/index.css';

// muse-ui
Vue.use(MuseUI);

// element-ui
Vue.use(ElementUI);

// http
Vue.use(v => {
    v.prototype.$http = request;
});

// moment
Vue.use(v => {
    // 这里配合vue.d.ts使用
    v.prototype.$moment = moment;
});

// lodash
Vue.use(v => {
    v.prototype.$_ = lodash;
});
