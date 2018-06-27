import { authorDomain, wxAppId } from '@/api/config'
import { Message, Notification } from 'element-ui'
import { Indicator, Toast } from 'mint-ui'
import { CODE } from '@/utils/config'
import { api } from '@/api/api'
import { requireEncryption, pubKey } from '@/utils/config'
import { ENV } from '@/utils/env'

export function getCodeByType(type) {
  let keys = Object.keys(CODE)
  for (let i = 0; i < keys.length; i++) {
    if (CODE[keys[i]].type===type) return parseInt(keys[i])
  }
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

export function post(apiName, postData, options) {
  console.log(':::::::::::发送请求'+apiName, postData)
  options = options || {}
  if (options.showProgress) {
    console.log('打开loading窗口')
    setTimeout(() => {
      Indicator.open(options.showProgress || '请稍候......')
    }, 0)
  }

  options.showSuccessMsg = options.showSuccessMsg===undefined ? false : options.showSuccessMsg
  options.showErrorMsg = options.showErrorMsg===undefined ? true : options.showErrorMsg
  options.showFailMsg = options.showFailMsg===undefined ? true : options.showFailMsg

  api(apiName, encrypt(postData))
    .done(result => {
      if (result.code==getCodeByType('success')) {
        if (options.showSuccessMsg) {
          //Notification({
          //  showClose : true,
          //  message   : result.msg,
          //  type      : 'success'
          //})
          Toast({
            message   : '操作成功',
            iconClass : 'el-icon-success',
            duration  : 2000
          })
        }
        if (options.callback && typeof options.callback.success==='function') options.callback.success(result.data, result.msg)
      } else if (result.code==getCodeByType('processing')) {
        if (options.callback && typeof options.callback.process==='function') options.callback.process(result.data, result.msg)
      }
      else {
        if (options.showErrorMsg) {
          Notification({
            showClose : true,
            title     : '出错了',
            message   : result.msg,
            duration  : 0,
            type      : 'error'
          })
        }
        if (options.callback && typeof options.callback.error==='function') options.callback.error({ code : result.code, msg : result.msg }, result.data)
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
        console.log('关闭loading窗口')
        setTimeout(() => {Indicator.close()}, 400)
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

export function debounce(func, wait, immediate) {
  // immediate默认为false
  let timeout, args, context, timestamp, result

  let later = function() {
    let last = _.now()-timestamp
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait-last)
    } else {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function() {
    context = this
    args = arguments
    timestamp = _.now()
    var callNow = immediate && !timeout
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

function merge(a, b) {
  return Object.assign({}, a, b)
}

function encrypt(dataObject) {
  if (ENV=='development') return dataObject
  let encrypt = new JSEncrypt()
  encrypt.setPublicKey(pubKey)
  requireEncryption.forEach(k => {
    if (k in dataObject) dataObject[k] = encrypt.encrypt(dataObject[k])
  })
  console.log('加密后'+dataObject)
  return dataObject
}

export function Area(areaData) {
  Area.prototype.areaData = areaData
}
Area.prototype.setSelectedItem = function(key, value) {
  this.check(key, value)
  let selectedItem = this.list.find(res => {return res[key]==value})
  if (selectedItem) {
    this.selectedIndex = selectedItem.index
    this.selectedName = selectedItem.name
    this.selectedCode = selectedItem.code
  } else {
    console.log('找不到匹配的内容')
    return
  }
}
Area.prototype.getList = function() {
  return this.list
}
Area.prototype.getSelectedIndex = function() {
  return this.selectedIndex
}
Area.prototype.getSelectedName = function() {
  return this.selectedName
}
Area.prototype.getSelectedCode = function() {
  return this.selectedCode
}
Area.prototype.province = {
  list          : [],
  selectedIndex : -1,
  selectedCode  : '',
  selectedName  : '',
  check         : function(key, value) {
    if (key=='code' && value.length!==2) {
      console.log('不是有效的provincecode')
      return
    }
    if (key=='name' && !value) {
      console.log('没有提供provincename')
      return
    }
  },
  setList       : function() {
    this.list = Area.prototype.areaData.map((value, index) => {return { name : value.name, code : value.code, index : index }})
  }
}
Area.prototype.city = {
  list          : [],
  selectedIndex : -1,
  selectedCode  : '',
  selectedName  : '',
  check         : function(key, value) {
    if (key=='code' && value.length!==4) {
      console.log('不是有效的citycode')
      return
    }
    if (key=='name' && !value) {
      console.log('没有提供cityname')
      return
    }
  },
  setList       : function() {
    if (Area.prototype.province.selectedIndex== -1) {
      console.log('无法获取城市列表，所选省份不存在')
      return
    }
    this.list = Area.prototype.areaData[Area.prototype.province.selectedIndex].children.map((value, index) => {return { name : value.name, code : value.code, index : index }})
  }
}
Area.prototype.district = {
  list          : [],
  selectedIndex : -1,
  selectedCode  : '',
  selectedName  : '',
  check         : function(type, value) {
    if (type=='code' && value.length!==6) {
      console.log('不是有效的districtcode')
      return
    }
    if (type=='name' && !value) {
      console.log('没有提供districtname')
      return
    }
  },
  setList       : function() {
    if (Area.prototype.province.selectedIndex== -1 || Area.prototype.city.selectedIndex== -1) {
      console.log('无法获取地区列表，所选省份或者城市不存在')
      return
    }
    this.list = Area.prototype.areaData[Area.prototype.province.selectedIndex].children[Area.prototype.city.selectedIndex].children.map((value, index) => {return { name : value.name, code : value.code, index : index }})
  }
}
Area.prototype.initArea = function() {
  this.province.setList()
  this.province.selectedIndex = 0
  this.province.selectedName = this.province.list[this.province.selectedIndex].name
  this.province.selectedCode = this.province.list[this.province.selectedIndex].code
  this.city.setList()
  this.city.selectedIndex = 0
  this.city.selectedName = this.province.list[this.city.selectedIndex].name
  this.city.selectedCode = this.province.list[this.city.selectedIndex].code
  this.district.setList()
  this.district.selectedIndex = 0
  this.district.selectedName = this.district.list[this.district.selectedIndex].name
  this.district.selectedCode = this.district.list[this.district.selectedIndex].code
}
Area.prototype.setAreaByCode = function(code) {
  this.district.check('code', code)
  this.province.setList()
  this.setSelectedItem.call(this.province, 'code', code.substr(0, 2))
  this.city.setList()
  this.setSelectedItem.call(this.city, 'code', code.substr(0, 4))
  this.district.setList()
  this.setSelectedItem.call(this.district, 'code', code)
}
Area.prototype.getAreaFullName = function() {
  return this.getSelectedName.call(this.province)+this.getSelectedName.call(this.city)+this.getSelectedName.call(this.district)
}












