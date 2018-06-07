//定义返回码
const CODE = {
  0 : { type : 'success', msg : '操作成功' },
  1 : { type : 'error', msg : '操作失败' }
}
//定义可绑定的银行卡
const BANKS = [
  { code : 'CEB', name : '光大银行', logoPos : '100% 75%' },
  { code : 'ZHONGXINB', name : '中信银行', logoPos : '33.33% 25%' },
  { code : 'PSBC', name : '邮储银行', logoPos : '66.67% 0' },
  { code : 'ABC', name : '农业银行', logoPos : '0 0' },
  { code : 'MINSHENGB', name : '⺠⽣银⾏', logoPos : '0 100%' },
  { code : 'ZHAOSHANGB', name : '招商银行', logoPos : '33.33% 0' },
  { code : 'ICBC', name : '工商银行', logoPos : '33.33% 25%' },
  { code : 'PINGANB', name : '平安银行', logoPos : '100% 100%' },
  { code : 'CCB', name : '建设银行', logoPos : '66.67% 100%' },
  { code : 'BOC', name : '中国银行', logoPos : '0 75%' },
  { code : 'GUANGFAB', name : '广发银行', logoPos : '66.67% 50%' },
  { code : 'PUFAB', name : '浦发银行', logoPos : '66.67% 25%' },
  { code : 'HUAXIAB', name : '华夏银行', logoPos : '0 25%' },
  { code : 'HENGFENGB', name : '恒丰银行', logoPos : '100% 25%' },
  { code : 'ZHESHANGB', name : '浙商银行', logoPos : '0 100%' },
  { code : 'BOHAIB', name : '渤海银行', logoPos : '0 50%' }

]
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
  address      : /^.{8,30}/,
  bankCardNo   : /^(\d{16}|\d{19})$/
}
export { CODE, BANKS, PRODUCTS, VALIDATE }


