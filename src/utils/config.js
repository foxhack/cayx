//定义返回码
const CODE = {
  0 : { type : 'success', msg : '操作成功' },
  1 : { type : 'error', msg : '操作失败' }
}
//定义可绑定的银行卡
const BANKS = [
  { id : 'CEB', name : '光大银行', logoPos : '100% 74%' },
  { id : 'ZHONGXINB', name : '中信银行', logoPos : '33.33% 24%' },
  { id : 'PSBC', name : '邮储银行', logoPos : '33.33% 0' },
  { id : 'ABC', name : '农业银行', logoPos : '' },
  { id : 'MINSHENGB', name : '民生银行', logoPos : '' },
  { id : 'ZHAOSHANGB', name : '招商银行', logoPos : '' },
  { id : 'XINGYEB', name : '兴业银行', logoPos : '' },
  { id : 'ICBC', name : '工商银行', logoPos : '' },
  { id : 'PINGANB', name : '平安银行', logoPos : '' },
  { id : 'CCB', name : '建设银行', logoPos : '' }
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
export { CODE, BANKS, PRODUCTS }


