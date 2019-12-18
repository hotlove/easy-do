import Vue from "vue";
import request from "@/http/index";
import moment from "moment";

Vue.use(v => {
    v.prototype.$http = request;
});

Vue.use(v => {
    // 这里配合vue.d.ts使用
    v.prototype.$moment = moment;
});
