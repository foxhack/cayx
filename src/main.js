import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
//import VeeValidate from 'vee-validate'

//import UI Components
import { Cell, Field } from 'mint-ui'
import { Dialog, Button, Message, Loading, Checkbox } from 'element-ui'

Vue.config.productionTip = false
//Vue.use(VeeValidate)

Vue.filter('money', fMoney)
// UI Components
Vue.component(Field.name, Field)
Vue.component(Cell.name, Cell)
Vue.component(Dialog.name, Dialog)
Vue.component(Button.name, Button)
Vue.component(Checkbox.name, Checkbox)
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
  if (s===null || s===undefined) s = 0
  s = s/100
  s = parseFloat((s+'').replace(/[^\d\.-]/g, '')).toFixed(n)+''
  var l = s.split('.') [0].split('').reverse(),
    r = s.split('.') [1]
  var t = ''
  for (var i = 0; i < l.length; i++) {
    t += l[i]+((i+1)%3==0 && (i+1)!=l.length ? ',' : '')
  }
  return t.split('').reverse().join('')+'.'+r
}
function fName(userName) {
  if (userName==null) userName = ''
  let nameLength = userName.length
  let userNameAfterReplaced
  if (nameLength <= 1) {
    userNameAfterReplaced = '*'
  } else if (nameLength==2) {
    userNameAfterReplaced = replaceAction(userName, '(?<=\\w{0})\\w(?=\\w{1})')
  } else if (nameLength >= 3 && nameLength <= 6) {
    userNameAfterReplaced = replaceAction(userName, '(?<=\\d{1})\\d(?=\\d{1})')
  } else if (nameLength==7) {
    userNameAfterReplaced = replaceAction(userName, '(?<=\\d{1})\\d(?=\\d{2})')
  } else if (nameLength==8) {
    userNameAfterReplaced = replaceAction(userName, '(?<=\\d{2})\\d(?=\\d{2})')
  } else if (nameLength==9) {
    userNameAfterReplaced = replaceAction(userName, '(?<=\\d{2})\\d(?=\\d{3})')
  } else if (nameLength==10) {
    userNameAfterReplaced = replaceAction(userName, '(?<=\\d{3})\\d(?=\\d{3})')
  } else if (nameLength >= 11) {
    userNameAfterReplaced = replaceAction(userName, '(?<=\\d{3})\\d(?=\\d{4})')
  }
  return userNameAfterReplaced
}


