import * as firebase from 'firebase'

export default {
  state: {
    loadedMeetups: []
  },

  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.date) {
        meetup.date = payload.date
      }
      if (payload.description) {
        meetup.title = payload.description
      }
    }

  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    }
  },
  actions: {
    createMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      commit('clearError')
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let key
      firebase.database().ref('meetups').push(meetup)
      .then((data) => {
        key = data.key
        return key
      })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          return fileData.ref.getDownloadURL()
        })
        .then(imageSrc => {
          firebase.database().ref('meetups').child(key).update({
            imageUrl: imageSrc
          })
          commit('createMeetup', {
            ...meetup,
            imageUrl: imageSrc,
            id: key
          })
          commit('setLoading', false)
        })
      .catch((error) => {
        commit('setError', error)
        commit('setLoading', false)
      })
    },
    loadMeetups ({commit}) {
      commit('setLoading', true)
      commit('clearError')
      firebase.database().ref('meetups').once('value')
      .then((data) => {
        const meetups = []
        const obj = data.val()
        for (let key in obj) {
          meetups.push({
            id: key,
            title: obj[key].title,
            description: obj[key].description,
            imageUrl: obj[key].imageUrl,
            date: obj[key].date,
            location: obj[key].location,
            creatorId: obj[key].creatorId
          })
        }
        commit('setLoadedMeetups', meetups)
        commit('setLoading', false)
      })
      .catch((error) => {
        commit('setError', error)
        commit('setLoading', false)
      })
    },
    updateMeetup ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')

      const updatedMeetup = {}
      if (payload.title) {
        updatedMeetup.title = payload.title
      }
      if (payload.description) {
        updatedMeetup.description = payload.description
      }
      if (payload.date) {
        updatedMeetup.date = payload.date
      }
      firebase.database().ref('meetups').child(payload.id).update(updatedMeetup)
      .then(() => {
        commit('setLoading', false)
        commit('updateMeetup', payload)
      })
      .catch(err => {
        commit('setLoading', false)
        commit('setError', err)
      })
    }
  }
}
