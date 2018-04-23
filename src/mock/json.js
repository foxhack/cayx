//home Object 首页
const USER = {
  openID : String,
  avatar : String,
  level  : Number
}
const USERLEVEL = {'register':false , bindBank: false , bindAccount:false }

//productList  Array 产品列表页
const PRODUCT_LIST = [{
  status   : Number, //状态码，如200，404
  code     : Number, //成功或者失败码
  msg      : String,//成功或者失败提示语  productId : String,
  rate7Days : Number//7日平均年化收益率
}]

//productDetail Object 产品详情页
const PRODUCT = {
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
const NEWBANK_RESULT = {
  status     : Number, //状态码，如200，404
  code       : Number, //成功或者失败码
  msg        : String,//成功或者失败提示语
  bindBankId : Number,//绑定银行ID
  bindCardNo : String//绑定银行卡号
}

//bankBind Object 绑定银行卡
const BANKBINDED_RECORD = {
  status     : Number, //状态码，如200，404
  code       : Number, //成功或者失败码
  msg        : String,//成功或者失败提示语
  bindCardNo : String,//绑定银行卡号
  accountID  : String//已开通的账户号
}

//user Object  用户中心页
const USER={
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
const TRANSACTION_RECORD={
  status     : Number, //状态码，如200，404
  code       : Number, //成功或者失败码
  msg        : String,//成功或者失败提示语
  tDate: String, //交易时间
  tType: Number,//交易类型：买入卖出
  productId: String,//交易产品ID
  tAmount: Number,//交易金额
}

//income record 收益查询页
const INCOME_RECORD={
  status     : Number, //状态码，如200，404
  code       : Number, //成功或者失败码
  msg        : String,//成功或者失败提示语
  tDate: String, //收益时间
  tAmount: Number//收益金额
}

//account transaction 账户充值与提现
const ACCOUNT_TRANSACTION_RECORD={
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
