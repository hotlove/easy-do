import Vue from "vue";
import http from "@/http/http";
import moment from "moment";

Vue.prototype.$http = http;
Vue.prototype.moment = moment;
