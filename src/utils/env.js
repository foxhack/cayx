const ENV = 'development'
//const ENV='test'
//const ENV='production'

let backServerBaseUrl

if (ENV=='development') {
  backServerBaseUrl = 'http://caejback.s1.natapp.cc'//本地测试环境
}
if (ENV=='test') {
 // backServerBaseUrl = 'http://testfinance.s1.natapp.cc'//后端测试环境
  backServerBaseUrl = 'http://10.2.223.92:9191'//后端测试环境
}

if (ENV=='production') {
  backServerBaseUrl = 'http://caejback.s1.natapp.cc'//本地测试环境
  window.console.log = function() {
    return
  }
}

export { ENV, backServerBaseUrl }
