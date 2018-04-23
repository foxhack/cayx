//定义返回码
const CODE = {
  0 : { type : 'success', msg : '操作成功' },
  1 : { type : 'error', msg : '操作失败' }
}
//定义可绑定的银行卡
const BANKS = [
  {
    id : 1, name : '光大银行', logoPos : '100% 74%'
  },
  {
    id : 2, name : '中国工商银行', logoPos : '33.33% 24%'
  },
  {
    id : 3, name : '招商银行', logoPos : '33.33% 0'
  },
  {
    id : 4, name : '农业银行', logoPos : '0 0'
  }
]
//定义产品
const PRODUCTS = [
  {
    pid          : 'mf201801',
    name        : '长安严选货基1号',
    tags        : ['低风险', '存取灵活', '明星产品'],
    description : 'lorem1',
    banks       : [1, 2, 3, 4]
  },
  {
    pid          : 'bf201801',
    name        : '长安严选理财1号',
    tags        : ['稳健型', 'T+1'],
    description : 'lorem2',
    banks       : [1, 2, 3, 4]
  }
]
export { CODE, BANKS, PRODUCTS }


