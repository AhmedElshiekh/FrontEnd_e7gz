import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import algoliasearch from 'algoliasearch/lite';
import InstantSearch from 'vue-instantsearch';

// window.algoliasearch = algoliasearch;
// Vue.use(InstantSearch);

// Vue.prototype.$apiAdress = 'https://api.aisent.net'
// Vue.prototype.$apiAdress = 'http://e7gz.aisent'
Vue.prototype.$apiAdress = 'http://api.dojaa.com'
Vue.config.performance = true
Vue.use(CoreuiVue)

new Vue({
  el: '#app',
  router,
  store,  
  icons,
  template: '<App/>',
  components: {
    App
  },
  
})
