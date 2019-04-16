import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueRouter from 'vue-router'
import VueSession from 'vue-session'
import { routes } from './routes'
import { store } from './store/store'

Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(VueSession)
Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

