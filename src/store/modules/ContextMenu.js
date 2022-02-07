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
  SET_CLOSE_MENU(state) {
    state.handle_context_menu = false
  },
}
const actions = {
  callHandleMenu({ commit, rootState }, newVal) {
    const { isGroup, members } = newVal
    rootState.Chat.target_members = members
    rootState.Chat.is_group = isGroup
    commit('SET_HANDLE_MENU', newVal)
  },
  callCloseMenu({ commit }) {
    commit('SET_CLOSE_MENU')
  },
}

export default {
  state,
  mutations,
  actions,
  namespaced: true,
}
