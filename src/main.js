import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import cookies from 'vue-cookies'
axios.headers['X-Api-Key'] = '3u8vLYVbrY7ApQF2HUxnY6SgR7fRW5lw2ddkc9uFWsMFg'
Vue.config.productionTip = false
Vue.prototype.$cookies = cookies
Vue.prototype.$axios = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
