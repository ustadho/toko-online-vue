import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vSelect from 'vue-select'
import Datepicker from 'vuejs-datepicker';

Vue.config.productionTip = false
Vue.use(BootstrapVue);

Vue.component('v-select', vSelect)
Vue.component('vuejs-datepicker', Datepicker)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

