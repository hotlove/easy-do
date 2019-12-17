import Vue from "vue";
import request from "@/http/index";
import moment from "moment";

Vue.use(v => {
    v.prototype.$http = request;
});
// Vue.prototype.moment = moment;
Vue.use(v => {
    v.prototype.$moment = moment.fn;
});
