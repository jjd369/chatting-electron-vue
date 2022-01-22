import { getAllmessages } from '@/apis/message'
const state = {
  group: [],
  messages: {},
  target_room_id: '',
}

const mutations = {
  SET_MESSAGES(state, newVal) {
    state.message_obj[state.target_room_id] = [...newVal]
  },
  SET_NEW_MESSAGE(state, { chatName, content, sender }) {
    state.message_obj[chatName].push({ content, sender })
  },
  SET_ROOM_ID(state, newVal) {
    state.target_room_id = newVal
  },
  SET_ALL_MESSAGES(state, newVal) {
    state.messages = newVal
  },
}

const actions = {
  callSetMeesages({ commit }, newVal) {
    commit('SET_MESSAGES', newVal)
  },
  callSetRoomId({ commit }, newVal) {
    commit('SET_ROOM_ID', newVal)
  },
  callSetNewMessage({ commit }, newVal) {
    commit('SET_NEW_MESSAGE', newVal)
  },
  callSetAllMessage({ commit }, newVal) {
    commit('SET_ALL_MESSAGE', newVal)
  },
  async fetchAllMessages({ commit }, name) {
    const { data } = await getAllmessages({ name })
    commit('SET_ALL_MESSAGES', data)
  },
}

export default {
  state,
  mutations,
  actions,
  namespaced: true,
}
