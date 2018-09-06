import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {imageUrl: 'https://media.timeout.com/images/104692494/image.jpg', id: 'adasdae', title: 'Meetup in New-York', date: '2018-09-17', location: 'New York Madison Square Garden'},
      {imageUrl: 'http://mediad.publicbroadcasting.net/p/wamc/files/201704/paris.jpg', id: '352rfwsq', title: 'Meetup in Paris', date: '2018-09-17', location: 'Paris Louvre'}
    ],

    user: {
      id: 'asdaswer',
      registeredMeetups: ['adasdae']
    }
  },

  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
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
    createMeetup ({commit}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        imageUrl: payload.imageUrl,
        date: payload.date,
        id: '1231dare'
      }
      // Reach out firebase and store it
      commit('createMeetup', meetup)
    }
  }
})
