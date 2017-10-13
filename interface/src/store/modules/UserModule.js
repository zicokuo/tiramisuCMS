import Vue from 'vue'
import Vuex from 'vuex'
// import VueCookie from '../../assets/js/cookies'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    info: {isLogin: false}, express: 0,
  },
})