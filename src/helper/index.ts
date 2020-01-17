import { request } from '@/http';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import lodash from 'lodash';
import moment from 'moment';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import Vue, {VueConstructor} from 'vue';


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
