import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue);
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

