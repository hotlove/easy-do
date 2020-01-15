import { request } from '@/http';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import lodash from 'lodash';
import moment from 'moment';
import MuseUI from 'muse-ui';
import Toast from 'muse-ui-toast';
import 'muse-ui/dist/muse-ui.css';
import Vue, {VueConstructor} from 'vue';

const ToastOption = {
    position: 'top', // 弹出的位置
    time: 2000, // 显示的时长
    closeIcon: 'close', // 关闭的图标
    close: true, // 是否显示关闭按钮
    successIcon: 'check_circle', // 成功信息图标
    infoIcon: 'info', // 信息信息图标
    warningIcon: 'priority_high', // 提醒信息图标
    errorIcon: 'warning', // 错误信息图标
};

// @ts-ignore
Vue.use(Toast.install, ToastOption);

// muse-ui
Vue.use(MuseUI);

// element-ui
Vue.use(ElementUI);

// http
Vue.use((vue: VueConstructor<Vue>) => {
    vue.prototype.$http = request;
});

// moment
Vue.use((vue: VueConstructor<Vue>) => {
    // 这里配合vue.d.ts使用
    vue.prototype.$moment = moment;
});

// lodash
Vue.use((vue: VueConstructor<Vue>) => {
    vue.prototype.$_ = lodash;
});
