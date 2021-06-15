import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import native_data from './native_data'
import data_api from './data_api'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {user,native_data,data_api}
})