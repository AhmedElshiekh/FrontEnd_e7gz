import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import JsonExcel from 'vue-json-excel'

Vue.component('downloadExcel', JsonExcel)
import VueHtml2pdf from 'vue-html2pdf'
Vue.use(VueHtml2pdf)

// import Pulse Loader from 'vue-spinner/src/PulseLoader.vue'
// import algoliasearch from 'algoliasearch/lite';
// import InstantSearch from 'vue-instantsearch';


// window.algoliasearch = algoliasearch;
// Vue.use(InstantSearch);

// Vue.prototype.$apiAdress = 'http://api.e7gz.co'
Vue.prototype.$apiAdress = 'http://e7gz.aisent'

Vue.config.performance = true
Vue.use(CoreuiVue)
// Vue.use(VueMonthlyPicker)


new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App,
    JsonExcel,
    // PulseLoader
  }
})
