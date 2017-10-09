import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'

Vue.use(Vuex)
const state = {info: {}}
const mutations = {
  updateInfo (state, payload) {
    state.info = payload
  }
}
export default new Vuex.Store({
  state,
  mutations,
})