import { authorDomain, wxAppId } from '@/api/config'
import { Message } from 'element-ui'
import { Indicator } from 'mint-ui'
import { CODE } from '@/utils/config'

export function getCodeByType(type) {
  let keys = Object.keys(CODE)
  for (let i = 0; i < keys.length; i++) {
    if (CODE[keys[i]].type===type) return parseInt(keys[i])
  }
}

export function submitHandler(code, cb) {
  console.log(this)
  Indicator.open({
    text        : '数据提交中...',
    spinnerType : 'fading-circle'
  })
  setTimeout(() => {
    Indicator.close()
    Message({
      showClose : true,
      message   : this.$store.state.CODE[code].msg,
      type      : this.$store.state.CODE[code].type
    })
    if (typeof cb==='function') cb(code)
  }, 1000)
}

export function guideToAuth(router_mode) {
  console.log('去微信取code')
  const OPTIONS = {
    domain        : authorDomain,
    appId         : wxAppId,
    response_type : 'code',
    scope         : 'snsapi_base',
    state         : ''
  }
  let mode = router_mode=='hash' ? '#/' : ''
  const redirect_uri = encodeURIComponent(`http://${OPTIONS.domain}/${mode}author`)
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${OPTIONS.appId}&redirect_uri=${redirect_uri}&response_type=${OPTIONS.response_type}&scope=${OPTIONS.scope}&state=${OPTIONS.state}#wechat_redirect`
//  window.location.href = 'http://localhost:8080/author?code=123'
}

export function getQueryString(name) {
  var reg = new RegExp('(^|&)'+name+'=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r!=null) return unescape(r[2])
  return null
}
//options = {
//  showSuccessMsg  : true,
//  showErrorMsg    : true,
//  showFailMsg     : true,
//  callback : {success:function,error:function,fail:function,always:function},
//}
export function fetchData(promise, options) {
  if (options==undefined) options = {}
  options.showSuccessMsg = options.showSuccessMsg || false
  options.showErrorMsg = options.showErrorMsg || true
  options.showFailMsg = options.showFailMsg || true
  promise
    .done(result => {
      if (result.code==getCodeByType('success')) {
        if (options.showSuccessMsg) {
          Message({
            showClose : true,
            message   : result.msg,
            type      : 'success'
          })
        }
        if (options.callback && typeof options.callback.success==='function') options.callback.success(result.data)
      } else {
        if (options.showErrorMsg) {
          Message({
            showClose : true,
            message   : result.msg,
            duration  : 0,
            type      : 'error'
          })
        }
        if (options.callback && typeof options.callback.error==='function') options.callback.error(result.data)
      }
    })
    .fail(error => {
      if (options.showFailMsg) {
        Message({
          showClose : true,
          message   : '服务器出错了',
          duration  : 0,
          type      : 'error'
        })
      }
      console.error(error)
      if (options.callback && typeof options.callback.fail==='function') options.callback.fail(error)
    })
    .always(() => {
      if (options.callback && typeof options.callback.always==='function') options.callback.always()
    })
}

function merge(a, b) {
  return Object.assign({}, a, b)
}






