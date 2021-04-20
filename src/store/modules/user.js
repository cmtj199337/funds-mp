import { login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { Message } from 'element-ui'

const state = {
  token: getToken(),
  name: 'Kane X',
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const user = {
      userName: userInfo.userName.trim(),
      password: userInfo.password.trim()
    }
    return new Promise((resolve, reject) => {
      login(user).then(response => {
        commit('SET_TOKEN', response.result.token)
        commit('SET_NAME', 'Kane X')
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        localStorage.setItem('token', response.result.token)
        // 本应是获取个人信息后存的，因为文件上传问题，暂时存
        localStorage.setItem('name', 'Kane X')
        localStorage.setItem('avatar', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        setToken(response.result.token)
        resolve()
      }).catch(error => {
        // Message.error(error.msg)
        reject(error)
      })
    })
  },

  logout({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      localStorage.clear()
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

