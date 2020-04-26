import { request } from '@/http';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import lodash from 'lodash';
import moment from 'moment';
import './moment-locale'; // 中文支持
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import Vue, {VueConstructor} from 'vue';
import mavonEditor from 'mavon-editor';
import leMarkdownEditor from 'le-markdown-editor';
import 'mavon-editor/dist/css/index.css'

// 设置为中文
moment.locale('zh-ch');

Vue.use(mavonEditor);

Vue.use(leMarkdownEditor);

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
