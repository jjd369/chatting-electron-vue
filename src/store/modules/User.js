import router from '@/router'
import { login, logout } from '@/apis/auth'
import { getRefreshToken } from '@/utils/token'
import Cookies from 'js-cookie'
import { Message } from 'element-ui'
import { getAllUSer } from '@/apis/user'

const state = {
  current_user: '',
  all_users: [],
}

const mutations = {
  SET_NAME(state, newVal) {
    state.current_user = newVal
  },
  SET_ALL_USERS(state, newVal) {
    state.all_users = newVal
  },
}

const actions = {
  async login({ commit, dispatch }, newVal) {
    try {
      const { name, password } = newVal
      const { data } = await login({ name, password })

      Cookies.set('accessToken', data.accessToken)
      Cookies.set('refreshToken', data.refreshToken)
      commit('SET_NAME', name)

      await dispatch('fetchUsers')
      await dispatch('Chat/fetchAllMessages', name, { root: true })

      router.push({ name: 'userList' }).catch(() => {})
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
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
  },
  async fetchUsers({ commit }) {
    const { data } = await getAllUSer()
    commit('SET_ALL_USERS', data)
  },
}

export default {
  state,
  mutations,
  actions,
  namespaced: true,
}
