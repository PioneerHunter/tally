import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/index.less'

import './plugins/element.js'
import "vue-easytable/libs/theme-default/index.css"
import VueEasytable from "vue-easytable"
import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false
Vue.use(VueEasytable)
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
