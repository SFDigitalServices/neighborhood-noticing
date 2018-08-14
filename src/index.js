import Vue from 'vue'

import App from './App.vue'

import router from './router'
import Citygram from './citygram'
import Store from './store'

Vue.prototype.$citygram = new Citygram(process.env.VUE_APP_CITYGRAM_URL, process.env.VUE_APP_CITYGRAM_TAG)
Vue.prototype.$store = new Store()

const vm = new Vue({
  router,
  render: h => h(App)
})

vm.$mount('#app')
