var express = require('express')
var app = express()
var bodyParser = require('body-parser')
//var multer = require('multer')
//var upload = multer() // for parsing multipart/form-data
var mock = require('./data')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended : true })) // for parsing application/x-www-form-urlencoded

app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.post('/finance/user/getuserbycode', function(req, res) {
  console.log('收到请求getuserbycode')
  console.log('返回'+mock.user)
  res.json({ code : 0, msg : '获取用户信息成功', data : mock.user })
})

app.post('/finance/user/getuserbyid', function(req, res) {
  console.log('收到请求getuserbyid')
  console.log('返回'+mock.user)
  res.json({ code : 0, msg : '获取用户信息成功', data : mock.user })
})

app.post('/finance/sms/singlesend', function(req, res) {
  console.log('收到请求singlesend')
  console.log('返回1234')
  res.json({ code : 0, msg : '获取验证码成功', data : {} })
})

app.post('/finance/user/registmobile', function(req, res) {
  mock.user.userStatus.isRegisterCayx = true
  console.log('收到请求registmobile')
  console.log('返回成功')
  res.json({ code : 0, msg : '注册成功' })
})

app.post('/finance/user/binduseraccount', function(req, res) {
  let userID = req.body.userID
  mock.user.userStatus.isRegisterCayx = true
  console.log('收到请求binduseraccount,userID'+userID)
  console.log('返回成功')
  res.json({ code : 0, msg : '关联成功' })
})

app.post('/finance/product/getproductrate', function(req, res) {
  console.log('收到请求getproductrate')
  let pid = req.body.pid
  let rate = mock.productRate.filter(r => {return pid.indexOf(r.pid)!== -1})
  console.log('返回'+rate)
  if (rate) {
    res.json({ code : 0, msg : '获取产品收益率成功', data : rate })
  } else {
    res.json({ code : 1, msg : '抱歉，无法获取产品收益率信息' })
  }
})

var server = app.listen(8081, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('模拟后台地址为 http://%s:%s', host, port)
})
