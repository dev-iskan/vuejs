import Vue from 'vue'
import Vuex from 'vuex'
import ads from './ads'
import users from './users'
import common from './common'
import orders from './orders'
Vue.use(Vuex)

// так как у нас много ресурсов с которыми можно работать то мы их деструктуризируем по разным файлам
// и как модули добавим в главный файл index.js
export default new Vuex.Store({
  modules: {
    ads,
    users,
    common,
    orders
  }
})
