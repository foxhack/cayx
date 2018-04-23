export const productList = [
  {
    id : 1, name : '长安严选1号', rate : 4.7, tags : ['低风险', '存取灵活', '明星产品'], description : {
    content : 'lorem1', rates7Day : [4.3, 4.2, 4.5, 5.0, 5.3, 4.8, 4.9], incomePerUnit : [1.2, 1.3, 1.2, 1.3, 1.2, 1.3, 1.2], banks : [1, 2, 3, 4]
  }
  },
  {
    id : 2, name : '长安严选2号', rate : 5, tags : ['稳健型', 'T+1'], description : {
    content : 'lorem2', rates7Day : [5.3, 5.2, 4.5, 5.0, 5.3, 5.8, 4.9], incomePerUnit : [1.6, 1.7, 1.2, 1.3, 1.2, 1.3, 1.2]
  }
  }
]

//export const user = {
//  name:'xiao hong', banksBinded:[{productId:1, banks:[1,4]},{productId:2, banks:[]}]
//}

export const bankList = [
  {
    id : 1, name : '光大银行', logo : ''
  },
  {
    id : 2, name : '中国工商银行', logo : ''
  },
  {
    id : 3, name : '招商银行', logo : ''
  },
  {
    id : 4, name : '农业银行', logo : ''
  }
]

//home Object 首页
const USER = {
  openID : String,
  avatar : String,
  level  : Number
}
const USERLEVEL = { 1 : '未注册', 2 : '已注册', 3 : '已绑卡' }

//productList  Array 产品列表页
const PRODUCT = [{
  status   : Number, //状态码，如200，404
  code     : Number, //成功或者失败码
  msg      : String,//成功或者失败提示语  productId : String,
  rate7Day : Number//7日平均年化收益率
}]

//productDetail Object 产品详情页
const PRODUCTLIST = {
  status      : Number, //状态码，如200，404
  code        : Number, //成功或者失败码
  msg         : String,//成功或者失败提示语  productId   : String,
  rate7Days   : Array,//近7日每日年化收益率,Number
  amount7Days : Array//近7日每日万份收益,Number
}

//product transaction Object  产品交易
//交易页
const TRANSACTION = {
  status        : Number, //状态码，如200，404
  code          : Number, //成功或者失败码
  msg           : String,//成功或者失败提示语
  userBankList  : Array,//已绑定银行ID,Number
  accountId     : String,//已开通的账户号
  accountAmount : Number//账户余额
}
//交易结果
const TRANSACTION_RESULT = {
  status     : Number, //状态码，如200，404
  code       : Number, //成功或者失败码
  msg        : String,//成功或者失败提示语
  submitTime : String,//提交时间
  productId  : String,//交易产品ID
  tid        : String,//交易订单号
  amount     : Number//交易订单金额
}

//newBank Object  添加银行卡
const newBankResult = {
  status     : Number, //状态码，如200，404
  code       : Number, //成功或者失败码
  msg        : String,//成功或者失败提示语
  bindBankId : Number,//绑定银行ID
  bindCardNo : String//绑定银行卡号
}

//bankBind Object 绑定银行卡
const bankBindResult = {
  status     : Number, //状态码，如200，404
  code       : Number, //成功或者失败码
  msg        : String,//成功或者失败提示语
  bindCardNo : String,//绑定银行卡号
  accountID  : String//已开通的账户号
}

//user Object  用户中心页
const USER1={
  status     : Number, //状态码，如200，404
  code       : Number, //成功或者失败码
  msg        : String,//成功或者失败提示语
  amountAll: Number, //资产总额
  incomeOneDayBefore: Number,//昨日收益
  incomeAll: Number,//累计收益
  accountAmount : Number,//账户余额
  monetaryFundAmount:  Number,//货基资产
  regularFundAmount:  Number//定期资产
}

//transaction record  array  交易查询页
const TRANSACTIONRECORD={
  status     : Number, //状态码，如200，404
  code       : Number, //成功或者失败码
  msg        : String,//成功或者失败提示语
  tDate: String, //交易时间
  tType: Number,//交易类型：买入卖出
  productId: String,//交易产品ID
  tAmount: Number,//交易金额
}

//income record 收益查询页
const INCOMERECORD={
  status     : Number, //状态码，如200，404
  code       : Number, //成功或者失败码
  msg        : String,//成功或者失败提示语
  tDate: String, //收益时间
  tAmount: Number//收益金额
}

//account transaction 账户充值与提现
const ACCOUNT_TRANSACTION={
  status     : Number, //状态码，如200，404
  code       : Number, //成功或者失败码
  msg        : String,//成功或者失败提示语
  accountId: String,//账户ID
  amount: Number,//账户余额
  tType: Number,//交易类型：充值或者提现
  tAmount: Number,//交易金额
  bindBankId : Number,//绑定银行ID
  bindCardNo : String,//绑定银行卡号
}
