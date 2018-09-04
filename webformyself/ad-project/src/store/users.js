import * as fb from 'firebase'
// класс для хранения пользователей
class User {
  constructor (id) {
    this.id = id
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    // если пользователя нету в state то возвращает false, для проверки роутов
    isUserLoggedIn (state) {
      return state.user !== null
    }
  },
  actions: {
    // регистрируем пользователя
    async registerUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        // создаем пользователя передавая ему email и пароль и возвращаем пользователя в виде обьекта
        const user = await fb.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', new User(user.id))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    // логиним пользователя
    async loginUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        // получаем response после авторизации пользователя в firebase
        const response = await fb.auth().signInWithEmailAndPassword(email, password)
        // вызываем мутатор для добавления в state пользователя создавая обьект пользователя
        commit('setUser', new User(response.user.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error.message
      }
    },
    // авторегистрация если он не вышел из firebase, вызывается при создании обьекта
    autoLoginUser ({commit}, payload) {
      commit('setUser', new User(payload.uid))
    },
    // выход из firebase и вызов мутатора setUser
    logoutUser ({commit}) {
      fb.auth().signOut()
      commit('setUser', null)
    }
  }
}
