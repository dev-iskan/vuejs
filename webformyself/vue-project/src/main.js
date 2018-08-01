import Vue from 'vue'
import App from './App.vue'
// import Car from './Car.vue'
//
// Vue.component('app-car', Car);

export const eventEmitter = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
})
