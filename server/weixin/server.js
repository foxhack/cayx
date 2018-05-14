const express = require('express')
const config = require('./config')
const sha1 = require('sha1')
const wechat = require('./weixin')
const app = express()

app.get('/wx', function(req, res) {
  console.log('收到来自微信的请求')
  let v = [config.token, req.query.timestamp, req.query.nonce].sort().join('')
  if (sha1(v)===req.query.signature) {
    res.send(req.query.echostr).end()
    console.log('通过微信认证')
  } else {
    res.status(404).end()
  }
  console.log(v, sha1(v), req.query.signature)
})


var server = app.listen(8082, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('获取微信API地址为 http://%s:%s', host, port)
})
