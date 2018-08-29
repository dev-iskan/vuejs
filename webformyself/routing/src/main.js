import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

new Vue({
  el: '#app',
  render: h => h(App),
  router
});
