import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    province: [
      '河北','山西','辽宁','吉林','黑龙江','江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','广东','海南',
      '四川','贵州','云南','陕西','甘肃','青海','台湾','内蒙','广西','西藏','宁夏','新疆','北京','天津','上海','重庆','香港','澳门'
    ],
  },
  getters: {
    getProvince: (state) => state.province.map(area => ({ value: area, label: area }))
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
