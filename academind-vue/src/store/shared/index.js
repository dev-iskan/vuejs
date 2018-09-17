export default {
  state: {
    loading: false,
    error: null
  },

  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  getters: {
    error (state) {
      return state.error
    },
    loading (state) {
      return state.loading
    }
  }
}
