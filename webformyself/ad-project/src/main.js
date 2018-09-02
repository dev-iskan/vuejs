import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import BuyModal from './components/Shared/BuyModal'
import * as fb from 'firebase'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import './stylus/main.styl'
Vue.use(Vuetify/* , {
  theme: {
    primary: colors.red.darken2
  }
} */)
Vue.component('app-buy-modal', BuyModal)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, /* ключ значение совпадают поэтому просо router или router: router */
  store,
  components: { App },
  template: '<App/>',
  created () {
    var config = {
      apiKey: 'AIzaSyDIzA0KJEVXj5gXt93c7oUtQzpJ8CVYryM',
      authDomain: 'vuejs-ads-project.firebaseapp.com',
      databaseURL: 'https://vuejs-ads-project.firebaseio.com',
      projectId: 'vuejs-ads-project',
      storageBucket: 'vuejs-ads-project.appspot.com',
      messagingSenderId: '166833174003'
    }
    fb.initializeApp(config)

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
})
