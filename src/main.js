import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";

import axios from "axios";

// const DEPLOY_IP = 'https://api.mask-nearby.com';
const DEPLOY_IP = "https://mask-api.com";
const LOCAL_IP = "http://localhost:3000";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

axios.defaults.baseURL = DEPLOY_IP;
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
