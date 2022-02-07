import router from '@/router'
import { login, logout } from '@/apis/auth'
import { getRefreshToken, setAccessToken, setRefreshToken, removeAccessToken, removeRefreshToken } from '@/utils/token'
import { Message } from 'element-ui'
import { getAllUSer } from '@/apis/user'

const state = {
  current_user: '',
  all_users: [],
  login_users: [],
}

const mutations = {
  SET_NAME(state, newVal) {
    state.current_user = newVal
  },
  SET_ALL_USERS(state, newVal) {
    state.all_users = newVal
  },
  SET_LOGIN_USER(state, newVal) {
    state.login_users = newVal
  },
}

const actions = {
  async login({ commit, dispatch }, newVal) {
    try {
      const { name, password } = newVal
      const { data } = await login({ name, password })

      setAccessToken(data.accessToken)
      setRefreshToken(data.refreshToken)

      commit('SET_NAME', name)

      Promise.all([
        await dispatch('fetchUsers'),
        await dispatch('Chat/fetchAllMessages', name, { root: true }),
      ])

      router.push({ name: 'userList' }).catch()
    } catch (e) {
      Message({
        message: e.response.data,
        type: 'error',
      })
    }
  },
  async logout({ commit, state }) {
    await logout({ token: getRefreshToken(), name: state.current_user })
    commit('SET_NAME', '')
    removeAccessToken()
    removeRefreshToken()
  },
  async fetchUsers({ commit }) {
    const { data } = await getAllUSer()
    commit('SET_ALL_USERS', data)
  },
  setLoginUser({ commit }, arr) {
    commit('SET_LOGIN_USER', arr)
  },
}

export default {
  state,
  mutations,
  actions,
  namespaced: true,
}
