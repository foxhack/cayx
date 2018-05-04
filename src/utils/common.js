import { authorDomain, wxAppId } from '@/api/config'
import { Message, Notification } from 'element-ui'
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
//  showProgress:'submit'||'fetch'
//  showSuccessMsg  : true,
//  showErrorMsg    : true,
//  showFailMsg     : true,
//  callback : {success:function,error:function,fail:function,always:function},
//}

export function post(promise, options) {
  if (options==undefined) options = {}
  if (options.showProgress) {
    console.log('打开loading窗口')
    setTimeout(() => {
      Indicator.open(options.showProgress || '请稍候......')
    }, 0)
  }

  options.showSuccessMsg = options.showSuccessMsg || false
  options.showErrorMsg = options.showErrorMsg || true
  options.showFailMsg = options.showFailMsg || true

  promise
    .done(result => {
      if (result.code==getCodeByType('success')) {
        if (options.showSuccessMsg) {
          Notification({
            showClose : true,
            message   : result.msg,
            type      : 'success',
          })
        }
        if (options.callback && typeof options.callback.success==='function') options.callback.success(result.data, result.msg)
      } else {
        if (options.showErrorMsg) {
          Notification({
            showClose : true,
            message   : result.msg,
            duration  : 0,
            type      : 'error'
          })
        }
        if (options.callback && typeof options.callback.error==='function') options.callback.error({ err : { code : result.code, msg : result.msg } }, result.data)
      }
    })
    .fail(error => {
      if (options.showFailMsg) {
        Message({
          showClose : true,
          message   : '服务器好像没有反应哦',
          duration  : 0,
          type      : 'error'
        })
      }
      console.error(error)
      if (options.callback && typeof options.callback.fail==='function') options.callback.fail(error)
    })
    .always(() => {
      if (options.showProgress) {
        Indicator.close()
        console.log('关闭loading窗口')
      }
      if (options.callback && typeof options.callback.always==='function') options.callback.always()
    })
}

export function initAppData(promises, callbacks, next) {
  Indicator.open('数据获取中，请稍候......')
  Promise.all(promises)
         .then(result => {
           result.forEach((r, k) => {
             if (r.code==getCodeByType('success')) {
               if (callbacks[k] && typeof callbacks[k]==='function') callbacks[k](r.data)
             } else {
               Message({
                 showClose : true,
                 message   : r.msg,
                 duration  : 0,
                 type      : 'error'
               })
             }
           })
           if (result.every(r => {return r.code==getCodeByType('success') })) next()
         })
         .catch((error) => {
           Message({
             showClose : true,
             message   : '服务器好像没有反应哦',
             duration  : 0,
             type      : 'error'
           })
           console.error(error)
         })
         .finally(() => {
           Indicator.close()
         })
}

function merge(a, b) {
  return Object.assign({}, a, b)
}






