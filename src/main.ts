import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from "@/components/Nav.vue";

Vue.config.productionTip = false
Vue.component('Nav',Nav)//全局组件

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
