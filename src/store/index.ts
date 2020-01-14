import { actions } from '@/store/actions';
import {getters} from '@/store/getter';
import {mutations} from '@/store/mutation';
import {state} from '@/store/state';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
});

export {store};
