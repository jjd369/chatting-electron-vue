import router from '@/router'
const state = {
  current_user: '',
  all_users: [],
}

const mutations = {
  SET_NAME(state, newVal) {
    state.current_user = newVal
  },
  SET_ALL_USERS(state, newVal) {
    state.all_users = [...newVal]
  },
}

const actions = {
  login({ commit }, newVal) {
    commit('SET_NAME', newVal)
    router.push({ name: 'userList' }).catch(() => {})
  },
  logout({ commit }) {
    commit('SET_NAME', '')
  },
  callSetAllUsers({ commit }, newVal) {
    commit('SET_ALL_USERS', newVal)
  },
}

export default {
  state,
  mutations,
  actions,
  namespaced: true,
}
