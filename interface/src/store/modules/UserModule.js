import Vuex from 'vuex'
import VueCookie from '../../assets/js/cookies'

const state = {info: {isLogin: false}, express: 0}
const mutations = {
  updateInfo (state, payload) {
    state.info = payload
    state.express = Date.now()
    VueCookie.set('user_token', payload.user_token, 2)
  }
}
const actions = {
  update ({commit}, {amount: payload}) {
    commit('updateInfo', payload)
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
})