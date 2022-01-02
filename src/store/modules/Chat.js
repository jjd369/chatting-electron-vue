const state = {
  group: ['general', 'randam', 'jokes', 'javascript'],
  message: {},
  target_room_id: '',
}

const mutations = {
  SET_MESSAGES(state, newVal) {
    state.message = newVal
  },

  DECREMENT_MAIN_COUNTER(state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER(state) {
    state.main++
  },
}

const actions = {
  someAsyncTask({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  },
  callSetMeesages({ commit }, newVal) {
    commit('SET_MESSAGES', newVal)
  },
}

export default {
  state,
  mutations,
  actions,
  namespaced: true,
}
