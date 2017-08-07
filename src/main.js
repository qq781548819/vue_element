// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import App from './App'
import store from './store/'
import './config/rem' 
require('es6-promise').polyfill()
import VueAwesomeSwiper from 'vue-awesome-swiper'
// var vConsole = require('src/config/vconsole.min.js');

Vue.config.productionTip = false

// mount with global
Vue.use(VueAwesomeSwiper)
Vue.use(VueRouter)
const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	store
})
