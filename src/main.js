import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
//import VeeValidate from 'vee-validate'

//import UI Components
import { Cell, Field } from 'mint-ui'
import { Dialog, Button, Message, Loading } from 'element-ui'

Vue.config.productionTip = false
//Vue.use(VeeValidate)

Vue.filter('money', fMoney)
// UI Components
Vue.component(Field.name, Field)
Vue.component(Cell.name, Cell)
Vue.component(Dialog.name, Dialog)
Vue.component(Button.name, Button)
Vue.prototype.$message = Message
Vue.use(Loading.directive)

new Vue({
  el         : '#app',
  store,
  router,
  components : { App },
  template   : '<App/>'
})

//filters
function fMoney(s) {
  let n = 2
  s = parseFloat((s+'').replace(/[^\d\.-]/g, '')).toFixed(n)+''
  var l = s.split('.') [0].split('').reverse(),
    r = s.split('.') [1]
  var t = ''
  for (var i = 0; i < l.length; i++) {
    t += l[i]+((i+1)%3==0 && (i+1)!=l.length ? ',' : '')
  }
  return t.split('').reverse().join('')+'.'+r
}
