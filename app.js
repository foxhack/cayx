var express = require('express')
var history = require('connect-history-api-fallback')
var app = express()

app.use(history())
app.use(express.static('dist'))//public为静态资源目录，更多写法可查阅express官网文档

app.get('/', function(req, res) {
  res.redirect('/index.html')
})

var server = app.listen(8080, function() {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})
