import Vue from 'vue'
import Vuex from 'vuex'
import { PRODUCTS, BANKS }from '@/utils/config'
Vue.use(Vuex)

export default new Vuex.Store({
  state     : {
    user         : null,
    toPath       : null,
    products     : PRODUCTS,
    productsRate : null,
    banks        : BANKS,
    title        : '',
    asset        : null
  },
  getters   : {
    productsWithRate   : state => {
      if (state.productsRate===null) return null
      let productsWithRate = JSON.parse(JSON.stringify(state.products))
      productsWithRate.forEach(pwr => {
        pwr.rate = state.productsRate.find(pr => {return pr.pid==pwr.pid}).rate
      })
      return productsWithRate
    },
    getProductById     : (state, getters) => (pid) => {
      if (getters.productsWithRate===null) return null
      return getters.productsWithRate.find(pwr => pwr.pid==pid)
    },
    getProductNameById : state => (pid) => {
      return state.products.find(p => {return p.pid==pid}).name
    }
  },
  mutations : {
    saveToTitle(s, title){
      s.title = title
    },
    saveToPath(s, toPath){
      s.toPath = toPath
    },
    setUser(s, user){
      s.user = user
    },
    setDefaultBindCard(s, bid){
      s.user.userInfo.defaultBindCard=bid
    },
    setAsset(s, asset){
      s.asset = asset
    },
    setUserPassword(s){
      s.user.userStatus.isSetPassword = true
    },
    saveProductsRate(s, r){
      s.productsRate = r
    }
  }
})

