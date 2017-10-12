import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
// import VueCookie from '../../assets/js/cookies'

Vue.use(Vuex)
const USER_UPDATE = 'USER_UPDATE'
export default new Vuex.Store({
  state: {
    info: {isLogin: false}, express: 0,
  },
  mutations: {
    [USER_UPDATE] (state, payload) {
      state.info = _.extend(state.info, payload)
      console.log(_.extend(state.info, payload))
    }
  },
  actions: {
    updateUser (context) {
      context.commit(USER_UPDATE)
    }
  }
  ,
})