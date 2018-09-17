import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store/index'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import Alert from './components/Shared/Alert'
import EditDialog from './components/Edits/EditDialog'
import EditDate from './components/Edits/EditDate'
import EditTime from './components/Edits/EditTime'
import RegisterDialog from './components/Registration/RegisterDialog'
Vue.use(Vuetify, {
  theme: {
    primary: '#7E57C2',
    secondary: '#303F9F',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})

Vue.filter('date', DateFilter)
Vue.component('app-alert', Alert)
Vue.component('edit-dialog', EditDialog)
Vue.component('edit-date', EditDate)
Vue.component('edit-time', EditTime)
Vue.component('register-dialog', RegisterDialog)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAavIDhM34rpmSmisQnvQ-VgxTR6Hgnknw',
      authDomain: 'academind-vue.firebaseapp.com',
      databaseURL: 'https://academind-vue.firebaseio.com',
      projectId: 'academind-vue',
      storageBucket: 'academind-vue.appspot.com',
      messagingSenderId: '498107050653'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
