import * as firebase from 'firebase'

export default {
  state: {
    user: null
  },

  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    registerUserForMeetup (state, payload) {
      const id = payload.id
      if (state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0) {
        return
      }
      state.user.registeredMeetups.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserFromMeetup (state, payload) {
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  },
  actions: {
    registerUserForMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.database().ref('/users/' + getters.user.id).child('/registration/')
      .push(payload)
      .then((data) => {
        commit('setLoading', false)
        commit('registerUserForMeetup', {
          id: payload,
          fbKey: data.key
        })
      })
      .catch(error => {
        commit('setError', error)
        commit('setLoading', false)
      })
    },
    unregisterUserFromMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      commit('clearError')
      const user = getters.user
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/registration/').child(fbKey)
      .remove()
      .then(() => {
        commit('unregisterUserFromMeetup', payload)
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setError', error)
        commit('setLoading', false)
      })
    },
    signUserUp ({commit}, {email, password}) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => {
        const newUser = {
          id: response.user.uid,
          registeredMeetups: [],
          fbKeys: {}
        }
        commit('setUser', newUser)
        commit('setLoading', false)
      })
      .catch(err => {
        commit('setLoading', false)
        commit('setError', err)
      })
    },

    signUserIn ({commit}, {email, password}) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        const user = {
          id: response.user.uid,
          registeredMeetups: [],
          fbKeys: {}
        }
        commit('setUser', user)
        commit('setLoading', false)
      })
      .catch(err => {
        commit('setLoading', false)
        commit('setError', err)
      })
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {
        id: payload.uid,
        registeredMeetups: [],
        fbKeys: {}
      })
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      commit('clearError')
      firebase.database().ref('/users/' + getters.user.id + '/registration/').once('value')
      .then(data => {
        const dataPairs = data.val()
        let registeredMeetups = []
        let swappedPairs = {}
        for (let key in dataPairs) {
          registeredMeetups.push(dataPairs[key])
          swappedPairs[dataPairs[key]] = key
        }
        const updatedUser = {
          id: getters.user.id,
          registeredMeetups: registeredMeetups,
          fbKeys: swappedPairs
        }
        commit('setUser', updatedUser)
        commit('setLoading', false)
      })
      .catch(err => {
        commit('setLoading', false)
        commit('setError', err)
      })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  }
}
