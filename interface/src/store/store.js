import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

const userStore = new Vuex.Store({
  state: {
    info: {
      isLogin: false
    },
    express: 0,
  },
  getters: {
    getUser: function (state) {
      return state.info
    },
    isLogin: function (state) {
      return state.isLogin
    }
  },
  mutations: {
    updateUser (state, payload) {
      // console.log(state.info)
      state.info = _.extend(state.info, payload)
    }
  },
  actions: {
    USER_UPDATE ({commit}, user) {
      commit('updateUser', user)
    }
  }
})

export default userStore