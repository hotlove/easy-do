import '@/helper/index';
import Vue from 'vue';
import App from './App.vue';
import {router} from './router';
import {store} from './store';
import EventBus from 'vue-bus-ts';

Vue.config.productionTip = false;
Vue.use(EventBus);
const bus = new EventBus.Bus();

new Vue({
  bus,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
