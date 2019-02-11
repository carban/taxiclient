// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {store} from './store/store'

import { L } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
//IMPORT FOR ROUTING MACHINE
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import VuexFlash from 'vuex-flash';
//import VueFlashMessage from 'vue-flash-message';

// this part resolve an issue where the markers would not appear
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
//Vue.use(VueFlashMessage, { method: 'iPreferQuickSilver' });
Vue.use(VuexFlash, { mixin: true, method: 'flashMe' });
Vue.use(BootstrapVue);
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (store.getters.loggedIn) {
        next({
          name: 'map'
        })
      } else {
        next()
      }
    } else {
    next() // make sure to always call next()!
  }
})

new Vue({
  store: store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
/*
new Vue({
  store: store,
  render: h => h(App)
}).$mount('#main');
*/
