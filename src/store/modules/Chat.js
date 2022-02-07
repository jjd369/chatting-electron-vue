import { getAllmessages } from '@/apis/message'

const state = {
  messages: {},
  target_members: [],
  is_group: false,
}

const getters = {
  getLastMessageById: (state) => (id) => {
    const find_message_by_id = state.messages.find((el) => el._id === id)
    return find_message_by_id.messages[find_message_by_id.messages.length - 1]?.content
  },
  getMessageById: (state, getters) => {
    return state.messages.find((el) => el._id === getters.getIdByMembers)?.messages
  },
  getIdByMembers: (state) => {
    return state.messages.find((el) => {
      let condition_array = []
      state.target_members.forEach((member) => {
        el.members.includes(member) ? (condition_array.push(1)) : (condition_array.push(0))
      })
      return condition_array.every((el) => el === 1)
    })?._id
  },
  getExceptCurrentUser: (state, getters, rootState) => {
    return state.target_members.filter((el) => el !== rootState.User.current_user)
  },
}

const mutations = {
  SET_NEW_MESSAGE(state, { message, chatId }) {
    const find_index = state.messages.findIndex((el) => el._id === chatId)
    state.messages[find_index].messages.push(message)
  },
  SET_ALL_MESSAGES(state, newVal) {
    state.messages = newVal
  },
}

const actions = {
  callSetNewMessage({ commit }, newVal) {
    console.log(newVal)
    commit('SET_NEW_MESSAGE', newVal)
  },
  async fetchAllMessages({ commit }, name) {
    const { data } = await getAllmessages({ name })
    commit('SET_ALL_MESSAGES', data)
  },
}

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true,
}
