var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const config = require('./weixin/config')
const wechat = require('./weixin/weixin')
var multer = require('multer')
var upload = multer({ dest : 'static/uploads/' })
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

app.post('/finance/user/openaccount', upload.fields([{ name : 'cardPhotoF' }, { name : 'cardPhotoB' }]), function(req, res) {
  console.log('收到请求openaccount')
  let post = req.body
  console.log(post)
  console.log(req.files)
  for (k in post) {
    mock.user.userInfo[k] = post[k]
  }
  post.bindId = randomStr(8)
  mock.user.userInfo.bindCard.push({bindId:post.bindId, bankCode:post.bankCode, bankCardNo:post.bankCardNo})
  mock.user.userStatus.isOpenAccount = true
  setTimeout(() => {
    res.json({ code : 0, msg : '开户成功', data : mock.user })
  }, 1000)
})

app.post('/finance/user/getuserbycode', function(req, res) {
  console.log('收到请求getuserbycode')
  console.log('返回'+mock.user)
  res.json({ code : 0, msg : '获取用户信息成功', data : mock.user })
})

app.post('/finance/user/getuserbyid', function(req, res) {
  console.log('收到请求getuserbyid')
  console.log('返回'+mock.user)
  setTimeout(() => {
    res.json({ code : 0, msg : '获取用户信息成功', data : mock.user })
  }, 1000)
})

app.post('/finance/sms/singlesend', function(req, res) {
  console.log('收到请求singlesend')
  console.log('返回1234')
  res.json({ code : 0, msg : '获取验证码成功', data : {} })
})

app.post('/finance/user/registmobile', function(req, res) {
  mock.user.userStatus.isRegisterCayx = true
  console.log('收到请求registmobile')
  mock.user.userStatus.isRegisterCayx = true
  mock.user.userInfo.mobile = req.body.mobile
  mock.user.userInfo.name = ''
  mock.user.userInfo.cardNo = ''
  mock.user.userInfo.email = ''
  mock.user.userInfo.address = ''
  setTimeout(() => {
    res.json({ code : 0, msg : '注册成功', data : mock.user })
  }, 1000)
})

app.post('/finance/sms/validUser', function(req, res) {
  console.log('收到请求validUser')
  if (req.body.mobile==mock.user.userInfo.mobile && req.body.identifyCode=='1234') {
    setTimeout(() => {
      res.json({ code : 0, msg : '验证通过', data : mock.user })
    }, 1000)
  }
})

app.post('/finance/user/binduseraccount', function(req, res) {
  let userID = req.body.userID
  console.log('收到请求binduseraccount,userID'+userID)
  console.log('返回成功')
  mock.user.userStatus.isRegisterCayx = true
  setTimeout(() => {
    res.json({ code : 0, msg : '用户信息关联成功', data : mock.user })
  }, 1000)
})

app.post('/finance/product/getproductrate', function(req, res) {
  console.log('收到请求getproductrate')
  let pid = req.body.pid
  let rate = mock.productRate.filter(r => {return pid.indexOf(r.pid)!== -1})
  console.log('返回'+rate)
  setTimeout(() => {
    if (rate) {
      res.json({ code : 0, msg : '获取产品收益率成功', data : rate })
    } else {
      res.json({ code : 1, msg : '抱歉，无法获取产品收益率信息' })
    }
  }, 1000)

})

app.post('/finance/user/updateinfo', function(req, res) {
  console.log('收到请求updateinfo')
  let post = req.body
  console.log('返回'+post)
  for (k in post) {
    mock.user.userInfo[k] = post[k]
  }
  setTimeout(() => {
    res.json({ code : 0, msg : '更新成功', data : mock.user })
  }, 1000)
})

app.post('/finance/user/bindcard', function(req, res) {
  console.log('收到请求bindcard')
  let post = req.body
  post.bindId = randomStr(8)
  console.log('返回'+post)
  mock.user.userInfo.bindCard.push(post)
  setTimeout(() => {
    res.json({ code : 0, msg : '绑卡成功', data : mock.user })
  }, 1000)
})

app.post('/finance/user/setdefaultbindcard', function(req, res) {
  console.log('收到请求setdefaultbindcard')
  let post = req.body
  mock.user.userInfo.defaultBindCard = post.bindId
  console.log('返回'+post)
  setTimeout(() => {
    res.json({ code : 0, msg : '设置成功' })
  }, 1000)
})

app.post('/finance/user/unbindCard', function(req, res) {
  console.log('收到请求unbindCard')
  let post = req.body
  console.log('返回'+post)
  let index = mock.user.userInfo.bindCard.indexOf(post.bindId)
  mock.user.userInfo.bindCard.splice(index, 1)
  if (mock.user.userInfo.bindCard.length==1) mock.user.userInfo.defaultBindCard = mock.user.userInfo.bindCard[0]
  if (mock.user.userInfo.bindCard.length==0) mock.user.userInfo.defaultBindCard = ''
  setTimeout(() => {
    res.json({ code : 0, msg : '移除成功', data : mock.user })
  }, 1000)
})

app.post('/finance/asset/assetquery', function(req, res) {
  console.log('收到请求assetquery')
  setTimeout(() => {
    res.json({ code : 0, msg : '获取资产成功', data : mock.asset })
  }, 1000)
})

app.post('/finance/asset/pwdservice', function(req, res) {
  console.log('收到请求pwdservice')
  mock.user.userStatus.isSetPassword = true
  setTimeout(() => {
    res.json({ code : 0, msg : '密码设置成功' })
  }, 1000)
})

app.post('/finance/asset/validpwd', function(req, res) {
  console.log('收到请求validpwd')
  setTimeout(() => {
    res.json({ code : 0, msg : '密码验证成功' })
  }, 800)
})

app.post('/finance/capital/recharge', function(req, res) {
  console.log('收到请求recharge')
  let amount = parseFloat(req.body.amount)
  mock.asset.availableAsset += amount
  setTimeout(() => {
    res.json({ code : 0, msg : '冲值成功', data : mock.asset })
  }, 2000)
})

app.post('/finance/capital/takeout', function(req, res) {
  console.log('收到请求takeout')
  let amount = parseFloat(req.body.amount)
  mock.asset.availableAsset -= amount
  setTimeout(() => {
    res.json({ code : 0, msg : '提现成功', data : mock.asset })
  }, 2000)
})

app.post('/finance/asset/applybuy', function(req, res) {
  console.log('收到请求applybuy')
  let amount = parseFloat(req.body.amount)
  let pid = req.body.pid
  mock.asset.detailAsset.find(a => {return a.productId==pid}).totalAsset += amount
  mock.asset.availableAsset -= amount
  mock.asset.totalAsset += amount
  setTimeout(() => {
    res.json({ code : 0, msg : '购买成功', data : mock.asset })
  }, 1000)
})

app.post('/finance/asset/applyredeem', function(req, res) {
  console.log('收到请求applyredeem')
  let amount = parseFloat(req.body.amount)
  let pid = req.body.pid
  mock.asset.detailAsset.find(a => {return a.productId==pid}).totalAsset -= amount
  mock.asset.availableAsset += amount
  mock.asset.totalAsset -= amount
  setTimeout(() => {
    res.json({ code : 0, msg : '赎回成功', data : mock.asset })
  }, 1000)
})

var server = app.listen(8082, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('模拟后台地址为 http://%s:%s', host, port)
})

function randomStr(length) {
  var str = Math.random().toString(36).substr(2)
  if (str.length >= length) {
    return str.substr(0, length)
  }
  str += random(length-str.length)
  return str
}


function randomDate(startDate) {
  let newTime=startDate.getTime()+1000000000*randomInt(1,10)
  return new Date(newTime).toLocaleString()
  function randomInt(min,max){
    return Math.ceil(Math.random()*(max-min)+min)
  }
}

//app.get('/wx', function(req, res) {
//  console.log('收到来自微信的请求')
//  let reqData={
//    timestamp: req.query.timestamp,
//    nonce:req.query.nonce,
//    signature:req.query.signature
//  }
//  let signature=wechat.getSignature(reqData)
//  if (signature===req.query.signature) {
//    res.send(req.query.echostr).end()
//    console.log('通过微信认证')
//  } else {
//    res.status(404).end()
//  }
//})

//app.post('/weixin/getwxconfig', function(req, res) {
//  console.log('收到请求getwxconfig')
//  let url = req.body.url
//  wechat.getWxConfig(url).then(value => {
//    res.json({ code : 0, msg : '获取调用jsapi成功', data : value })
//  }).catch(err => {console.log(err)})
//})
