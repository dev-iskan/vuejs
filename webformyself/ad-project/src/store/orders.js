import * as fb from 'firebase'

// класс Order для хранения обьектов
class Order {
  constructor (name, phone, adId, done = false, id = null) {
    this.name = name
    this.phone = phone
    this.adId = adId
    this.done = done
    this.id = id
  }
}

export default {
  state: {
    orders: []
  },
  mutations: {
    loadOrders (state, payload) {
      state.orders = payload
    }
  },
  getters: {
    // получаем заказы которые сделаны
    doneOrders (state) {
      return state.orders.filter(order => order.done)
    },
    // получаем заказы которые не выполнены
    undoneOrders (state) {
      return state.orders.filter(order => !order.done)
    },
    // получаем все заказы
    orders (state, getters) {
      return getters.undoneOrders.concat(getters.doneOrders)
    }
  },
  actions: {
    // создаем заказ и сохраняем его в бд
    async createOrder ({commit}, {name, phone, adId, ownerId}) {
      const order = new Order(name, phone, adId)
      commit('clearError')
      try {
        await fb.database().ref(`/users/${ownerId}/orders`).push(order)
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },

    // получаем все заказы из бд метод похож из ads.js
    async fetchOrders ({commit, getters}) {
      commit('clearError')
      commit('setLoading', true)
      const resultOrders = []
      try {
        const fbVal = await fb.database().ref(`/users/${getters.user.id}/orders`).once('value')
        const orders = fbVal.val()
        Object.keys(orders).forEach(key => {
          const order = orders[key]
          resultOrders.push(
            new Order(
              order.name,
              order.phone,
              order.adId,
              order.done,
              key
            )
          )
        })
        commit('loadOrders', resultOrders)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },

    // маркируем заказ как выполненный просто обновляя его свойство done
    async markOrderDone ({commit, getters}, payload) {
      try {
        commit('clearError')
        await fb.database().ref(`/users/${getters.user.id}/orders`).child(payload).update({
          done: true
        })
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    }
  }
}
