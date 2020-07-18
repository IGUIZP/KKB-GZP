import Vue from 'vue'
import App from './App.vue'
import router from './kgrouter'
import store from './kgstore'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
