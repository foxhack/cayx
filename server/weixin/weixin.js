const config = require('./config')
const request = require('superagent')
const fs = require('fs')
const accessTokenJson = require('./access_token')
const jsApiTicketJson = require('./jsapi_ticket')
const sha1 = require('sha1')
function requestGet(url, query) {
  return new Promise(function(resolve, reject) {
    request.get(url)
           .query(query)
           .then(res => {
             if (res.body.errcode) {
               console.log(res.body.errcode, res.body.errmsg)
               return
             }
             resolve(res.body)
           })
           .catch(err => {reject(err)})
  })
}

function requestPost(url, data) {
  return new Promise(function(resolve, reject) {
    request.post(url)
           .set('Content-Type', 'application/json')
           .send(data)
           .then(res => {
             if (res.body.errcode) {
               console.log(res.body.errcode, res.body.errmsg)
               return
             }
             resolve(res.body)
           })
           .catch(err => {reject(err)})
  })
}
function getSignature(reqData) {
  let v = [config.token, reqData.timestamp, reqData.nonce].sort().join('')
  return sha1(v)
}

function getAccessToken() {
  let currentTime = new Date().getTime()
  if (accessTokenJson.access_token==='' || accessTokenJson.expires_time < currentTime) {
    console.log('重新获取token')
    let url = config.appDomain+'cgi-bin/token'
    let query = {
      grant_type : 'client_credential',
      appid      : config.appID,
      secret     : config.appSecret
    }
    return new Promise(function(resolve, reject) {
      requestGet(url, query).then(result => {
        let newAccessTokenJson = {
          access_token : result.access_token,
          expires_time : new Date().getTime()+(parseInt(result.expires_in)-200)*1000
        }
        fs.writeFile('./server/weixin/access_token.json', JSON.stringify(newAccessTokenJson), (err) => {
          if (err) console.log(err)
        })
        resolve(result.access_token)
      }).catch(err => {reject(err)})
    })
  } else {
    console.log('已存在token')
    return Promise.resolve(accessTokenJson.access_token)
    //return new Promise(function(resolve){resolve(accessTokenJson.access_token)})
  }
}

function createMenu() {
  let url = 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token='+getAccessToken()
  let menu = {
    'button' : [
      {
        'type' : 'view',
        'name' : '严选理财',
        'url'  : 'http://caejfinance.s1.natapp.cc'
      }
    ]
  }
  requestPost(url, menu, res => {console.log('创建menu成功', res)})
}

function getJsApiTicket() {
  return new Promise(function(resolve, reject) {
    getAccessToken().then(value => {
      let currentTime = new Date().getTime()
      if (jsApiTicketJson.ticket==='' || jsApiTicketJson.expires_time < currentTime) {
        console.log('重新获取jsapi-ticket')
        let url = config.appDomain+'cgi-bin/ticket/getticket'
        let query = {
          access_token : value,
          type         : 'jsapi'
        }
        requestGet(url, query).then(result => {
          let newJsApiTicketJson = {
            ticket       : result.ticket,
            expires_time : new Date().getTime()+(parseInt(result.expires_in)-200)*1000
          }
          fs.writeFile('./server/weixin/jsapi_ticket.json', JSON.stringify(newJsApiTicketJson), (err) => {
            if (err) console.log(err)
          })
          resolve(result.ticket)
        }).catch(err => {reject(err)})
      }
      else {
        console.log('已存在jsapi-ticket')
        resolve(jsApiTicketJson.ticket)
      }
    }).catch(err => {reject(err)})
  })
}

function randomStr(length) {
  var str = Math.random().toString(36).substr(2)
  if (str.length >= length) {
    return str.substr(0, length)
  }
  str += random(length-str.length)
  return str
}

let params = {
  noncestr     : randomStr(8),
  jsapi_ticket : 'HoagFKDcsGMVCIY2vOjf9lZfxmvdLoNdnGHlKH1XXiWg5GvCgRfMh9gIF0amHsKkORGg8enbZWN7Jx_j0xhd8w',
  timestamp    : parseInt(new Date().getTime()/1000),
  url          : 'http://caejfinance.s1.natapp.cc/bank'
}

function generateSignature(params) {
  let keys = Object.keys(params).sort()
  let string = ''
  keys.forEach(k => {string += k+'='+params[k]+'&'})
  return sha1(string.slice(0, string.length-1))
}

function getWxConfig(url) {
  return new Promise(function(resolve, reject) {
    getJsApiTicket().then(ticket => {
      let params = {
        noncestr     : randomStr(8),
        jsapi_ticket : ticket,
        timestamp    : parseInt(new Date().getTime()/1000),
        url          : url
      }
      let wxConfig = {
        appID     : config.appID,
        timestamp : params.timestamp,
        nonceStr  : params.noncestr,
        signature : generateSignature(params)
      }
      resolve(wxConfig)
    }).catch(err => {reject(err)})

  })
}

const wechat = {
  getSignature,
  getAccessToken,
  createMenu,
  getJsApiTicket,
  getWxConfig
}

module.exports = wechat
