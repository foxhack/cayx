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
  setTimeout(()=>{
    res.json({ code : 0, msg : '获取用户信息成功', data : mock.user })
  },1000)
})

app.post('/finance/sms/singlesend', function(req, res) {
  console.log('收到请求singlesend')
  console.log('返回1234')
  res.json({ code : 0, msg : '获取验证码成功', data : {} })
})

app.post('/finance/user/registmobile', function(req, res) {
  mock.user.userStatus.isRegisterCayx = true
  console.log('收到请求registmobile')
  mock.user.userStatus.isRegisterCayx=true
  mock.user.userInfo.mobile=req.body.mobile
  setTimeout(()=>{
    res.json({ code : 0, msg : '注册成功' })
  },3000)
})

app.post('/finance/user/binduseraccount', function(req, res) {
  let userID = req.body.userID
  mock.user.userStatus.isRegisterCayx = true
  console.log('收到请求binduseraccount,userID'+userID)
  console.log('返回成功')
  mock.user.userStatus.isRegisterCayx=true
  res.json({ code : 0, msg : '关联成功' })
})

app.post('/finance/product/getproductrate', function(req, res) {
  console.log('收到请求getproductrate')
  let pid = req.body.pid
  let rate = mock.productRate.filter(r => {return pid.indexOf(r.pid)!== -1})
  console.log('返回'+rate)
  setTimeout(()=>{
    if (rate) {
      res.json({ code : 0, msg : '获取产品收益率成功', data : rate })
    } else {
      res.json({ code : 1, msg : '抱歉，无法获取产品收益率信息' })
    }
  },2000)

})

app.post('/finance/user/updateinfo', function(req, res) {
  console.log('收到请求updateinfo')
  let post = req.body
  console.log('返回'+ post)
  for(k in post){
    mock.user.userInfo[k]=post[k]
  }
  setTimeout(()=>{
    res.json({ code : 0, msg : '更新成功' })
  },3000)
})

app.post('/finance/user/openaccount', function(req, res) {
  console.log('收到请求openaccount')
  let post = req.body
  console.log('返回'+ post)
  for(k in post){
    mock.user.userInfo[k]=post[k]
  }
  mock.user.userStatus.isBindCard=true
  setTimeout(()=>{
    res.json({ code : 0, msg : '开户成功' })
  },3000)
})

app.post('/finance/user/openaccount', function(req, res) {
  console.log('收到请求openaccount')
  let post = req.body
  console.log('返回'+ post)
  for(k in post){
    mock.user.userInfo[k]=post[k]
  }
  mock.user.userStatus.isBindCard=true
  setTimeout(()=>{
    res.json({ code : 0, msg : '开户成功' })
  },3000)
})

app.post('/finance/asset/assetquery', function(req, res) {
  console.log('收到请求assetquery')
  setTimeout(()=>{
    res.json({ code : 0, msg : '获取资产成功',data:mock.asset })
    console.log(mock.asset.totalAsset)
  },2000)
})


app.post('/finance/asset/pwdservice', function(req, res) {
  console.log('收到请求pwdservice')
  mock.user.userStatus.isSetPassword=true
  setTimeout(()=>{
    res.json({ code : 0, msg : '密码设置成功'})
  },1000)
})


app.post('/finance/capital/recharge', function(req, res) {
  console.log('收到请求recharge')
  let amount=req.body.amount
  setTimeout(()=>{
    res.json({ code : 0, msg : '冲值成功',data: {amount:5000}})
  },2000)
})

app.post('/finance/capital/takeout', function(req, res) {
  console.log('收到请求takeout')
  let amount=req.body.amount
  setTimeout(()=>{
    res.json({ code : 0, msg : '提现成功',data: {amount:200} })
  },2000)
})

var server = app.listen(8081, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('模拟后台地址为 http://%s:%s', host, port)
})
