import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueRouter from 'vue-router'
import VueSession from 'vue-session'
import { routes } from './routes'
import { store } from './store/store'
import './registerServiceWorker'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(VueSession);
Vue.config.productionTip = false;

const router = new VueRouter({
  routes,
  mode: 'history'
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
      .register('./service-worker.js', { scope: './' })
      .then(function(registration) {
        console.log("Service Worker Registered");
      })
      .catch(function(err) {
        console.log("Service Worker Failed to Register", err);
      })
}


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');

