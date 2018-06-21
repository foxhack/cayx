//定义返回码
const CODE = {
  0 : { type : 'success', msg : '操作成功' },
  1 : { type : 'error', msg : '操作失败' },
  2 : { type : 'processing', msg : '处理中' }
}
//定义可绑定的银行卡
const BANKS = [
  { code : 'ICBC', name : '工商银行', logoPos : '25% 25%' },
  { code : 'ABC', name : '农业银行', logoPos : '0 0' },
  { code : 'BOC', name : '中国银行', logoPos : '0 75%' },
  { code : 'CCB', name : '建设银行', logoPos : '50% 100%' },
  { code : 'COMM', name : '交通银行', logoPos : '25% 75%' },
  { code : 'CMB', name : '招商银行', logoPos : '25% 0' },
  { code : 'CEB', name : '光大银行', logoPos : '75% 75%' },
  { code : 'CMBC', name : '⺠⽣银⾏', logoPos : '0 100%' },
  { code : 'CITIC', name : '中信银行', logoPos : '25% 100%' },
  { code : 'CIB', name : '兴业银行', logoPos : '100% 25%' },
  { code : 'SPDB', name : '浦发银行', logoPos : '50% 25%' },
  { code : 'GDB', name : '广发银行', logoPos : '50% 50%' },
  { code : 'SPABANK', name : '平安银行', logoPos : '75% 100%' },
  { code : 'HXBANK', name : '华夏银行', logoPos : '0 25%' },
  { code : 'PSBC', name : '邮储银行', logoPos : '50% 0' },
  { code : 'EGBANK', name : '恒丰银行', logoPos : '75% 25%' },
  { code : 'CZBANK', name : '浙商银行', logoPos : '75% 0' },
  { code : 'BOHAIB', name : '渤海银行', logoPos : '0 50%' },
  { code : 'BJBANK', name : '北京银行', logoPos : '75% 50%' },
  { code : 'SHBANK', name : '上海银行', logoPos : '100% 0' },
  { code : 'JSBANK', name : '江苏银行', logoPos : '100% 50%' },
  { code : 'NJCB', name : '南京银行', logoPos : '100% 75%' },
  { code : 'BHB', name : '河北银行', logoPos : '100% 100%' },
  { code : 'GCB', name : '广州银行', logoPos : '' },
  { code : 'CDRCB', name : '成都商业银行', logoPos : '' },
  { code : 'CQBANK', name : '重庆银行', logoPos : '' },
  { code : 'BSB', name : '包商银行', logoPos : '' },
  { code : 'H3CB', name : '内蒙古银行', logoPos : '' }
]
//const BANKS = [
//  { code : 'ICBC', name : '工商银行', logo : 'gongshangyinhang' },
//  { code : 'ABC', name : '农业银行', logo : 'nongyeyinhang' },
//  { code : 'BOC', name : '中国银行', logo : 'zhongguoyinhang' },
//  { code : 'CCB', name : '建设银行', logo : 'jiansheyinhang' },
//  { code : 'COMM', name : '交通银行', logo : 'jiaotongyinhang' },
//  { code : 'CMB', name : '招商银行', logo : 'zhaoshangyinhang' },
//  { code : 'CEB', name : '光大银行', logo : 'guangdayinhang' },
//  { code : 'CMBC', name : '⺠⽣银⾏', logo : 'minshengyinhang' },
//  { code : 'CITIC', name : '中信银行', logo : 'zhongxinyinhang' },
//  { code : 'CIB', name : '兴业银行', logo : 'xingyeyinhang' },
//  { code : 'SPDB', name : '浦发银行', logo : 'pufayinhang' },
//  { code : 'GDB', name : '广发银行', logo : 'guangfayinhang' },
//  { code : 'SPABANK', name : '平安银行', logo : 'pinganyinhang' },
//  { code : 'HXBANK', name : '华夏银行', logo : 'huaxiayinhang' },
//  { code : 'PSBC', name : '邮储银行', logo : 'youchuyinhang' },
//  { code : 'EGBANK', name : '恒丰银行', logo : 'hengfengyinhang' },
//  { code : 'CZBANK', name : '浙商银行', logo : 'zheshangyinhang' },
//  { code : 'BOHAIB', name : '渤海银行', logo : 'bohaiyinhang' },
//  { code : 'BJBANK', name : '北京银行', logo : 'beijingyinhang' },
//  { code : 'SHBANK', name : '上海银行', logo : 'shanghaiyinhang' },
//  { code : 'JSBANK', name : '江苏银行', logo : 'jiangsuyinhang' },
//  { code : 'NJCB', name : '南京银行', logoPos : 'nanjingyinhang' },
//  { code : 'BHB', name : '河北银行', logo : 'hebeiyinhang' },
//  { code : 'GCB', name : '广州银行', logo : 'bank-default' },
//  { code : 'CDRCB', name : '成都商业银行', logo : 'bank-default' },
//  { code : 'CQBANK', name : '重庆银行', logo : 'bank-default' },
//  { code : 'BSB', name : '包商银行', logo : 'bank-default' },
//  { code : 'H3CB', name : '内蒙古银行', logo : 'neimengguyinhang' }
//]
//定义产品
const PRODUCTS = [
  {
    pid         : 'mf201801',
    name        : '长安严选货基1号',
    type        : 1,
    tags        : ['低风险', '存取灵活', '明星产品'],
    description : 'lorem1'
  },
  {
    pid         : 'bf201801',
    name        : '长安严选理财1号',
    type        : 2,
    tags        : ['稳健型', 'T+1'],
    description : 'lorem2'
  }
]

//定义表单验证条件
const VALIDATE = {
  name         : /^([a-zA-Z0-9\u4e00-\u9fa5\·]{2,4})$/,
  cardNo       : /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  //mobile       : /^1[0-9]{10}$/,
  mobile       : /^1(3[0-9]|4[579]|5[0-35-9]|66|7[0-35-8]|8[0-9]|9[89])[0-9]{8}$/,
  identifyCode : /^\d{4}$/,
  email        : /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  password     : /^\d{6}$/,
  address      : /^.{8,40}$/,
  bankCardNo   : /^(\d{16}|\d{19})$/
}

//定义需要加密的信息
const requireEncryption=["name", "cardNo", "mobile", "email", "bankCardNo", "bankSavedMobile", "tradepwd"]
const pubKey='MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAL2NFNwlHYhvDQZlUeE5P8Qc0nAp7VGPQJd/WnxG7OlUUTyram7ZkCZlDnw8NMrFqJinmr+1rbx2XADgT1ekA2kCAwEAAQ=='

//邮政编码
const postalCode={
  "11":"100000",
  "12":"300000",
  "13":"050000",
  "14":"030000",
  "15":"010000",
  "21":"110000",
  "22":"130000",
  "23":"150000",
  "31":"201100",
  "32":"210000",
  "33":"310000",
  "34":"230000",
  "35":"361000",
  "36":"330000",
  "37":"250000",
  "41":"450000",
  "42":"430000",
  "43":"410000",
  "44":"510000",
  "45":"530000",
  "46":"570100",
  "50":"400000",
  "51":"610000",
  "52":"550000",
  "53":"650000",
  "54":"850000",
  "61":"710000",
  "62":"730000",
  "63":"810000",
  "64":"750000",
  "65":"830000"}





export { CODE, BANKS, PRODUCTS, VALIDATE, requireEncryption, pubKey, postalCode}


