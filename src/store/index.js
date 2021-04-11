import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
  cartList: []
}

// 1.安装插件
Vue.use(Vuex)

// 2.创建store对象
const store = new Store({
  state,
  mutations,
  actions,
  getters
})

// 3.导出然后挂载Vue实例上
export default store
