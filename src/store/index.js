import { createStore } from 'vuex'

export default createStore({
  state: {
    loading: false,
    showHeader: true,
    dockedHeader: false,
  },
  getters: {
    loading: state => state.loading,
    showHeader: state => state.showHeader,
    dockedHeader: state => state.dockedHeader,
  },
  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },
    setShowHeader(state, data) {
      state.showHeader = data;
    },
    setDockedHeader(state, data) {
      state.dockedHeader = data;
    },
  },
  actions: {
  }
})
