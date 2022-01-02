const state = {
  handle_context_menu: false,
  position: {
    top: '',
    left: '',
  },
}

const mutations = {
  SET_HANDLE_MENU(state, newVal) {
    const { top, left, bool } = newVal
    state.handle_context_menu = bool
    state.position = { top, left }
  },
}
const actions = {
  callHandleMenu({ commit }, newVal) {
    commit('SET_HANDLE_MENU', newVal)
  },
}

export default {
  state,
  mutations,
  actions,
  namespaced: true,
}
