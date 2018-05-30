import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { unit, toCent, toYuan, fMoney, fMobile, fIDCardNo, fEmail, fAddress, fName, fBankCardNo } from './utils/filters'
import { post} from './utils/common'
import { mixin } from '@/utils/mixin'

//import UI Components
import { Cell, Field, InfiniteScroll } from 'mint-ui'
import { Dialog, Message, Checkbox } from 'element-ui'

Vue.config.productionTip = false

Vue.filter('unit', unit)
Vue.filter('toCent', toCent)
Vue.filter('toYuan', toYuan)
Vue.filter('money', fMoney)
Vue.filter('name', fName)
Vue.filter('mobile', fMobile)
Vue.filter('email', fEmail)
Vue.filter('IDCardNo', fIDCardNo)
Vue.filter('address', fAddress)
Vue.filter('bankCardNo', fBankCardNo)
// UI Components
Vue.use(InfiniteScroll)
Vue.component(Field.name, Field)
Vue.component(Cell.name, Cell)
Vue.component(Dialog.name, Dialog)
Vue.component(Checkbox.name, Checkbox)
Vue.mixin(mixin)
Vue.prototype.$message = Message
Vue.prototype.$post = post
new Vue({
  el         : '#app',
  store,
  router,
  components : { App },
  template   : '<App/>'
})



