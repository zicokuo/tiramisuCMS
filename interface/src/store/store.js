import Vue from 'vue'
import Vuex from 'vuex'
import UserModule from './modules/UserModule'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {user: UserModule},
})
export default store