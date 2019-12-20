import Vue from "vue";
import request from "@/http/index";
import moment from "moment";
import MuseUI from 'muse-ui';
// import _ from "lodash";
import 'muse-ui/dist/muse-ui.css'

Vue.use(MuseUI);

Vue.use(v => {
    v.prototype.$http = request;
});

Vue.use(v => {
    // 这里配合vue.d.ts使用
    v.prototype.$moment = moment;
});
