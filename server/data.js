const USER = {
  'userID'     : '123456789',
  'avatar'     : '',
  'userStatus' : { 'isRegisterCaej' : true, 'isRegisterCayx' : false, isBindCard : false, isSetPassword : false },
  'userInfo'   : {
    'name'     : '张珊一一',
    'cardNo'   : '110104198204150848',
    'mobile'   : '13401026599',
    'email'    : '18888',
    'address'  : '南横东街八号',
    'bindCard' : {
      'bankCode'   : 'CEB',
      'bankName'   : '光大银行',
      'bankCardNo' : '0990'
    }
  }
}
let initUserInfo = {
  'name'    : '',
  'cardNo'  : '',
  'mobile'  : '',
  'email'   : '',
  'address' : ''
}
let tempUserInfo = {
  'name'     : '张珊一一',
  'cardNo'   : '110104198204150848',
  'mobile'   : '1888888888',
  'email'    : '1888888888',
  'address'  : '南横东街八号',
  'bindCard' : {
    'bankCode'   : 'CEB',
    'bankName'   : '光大银行',
    'bankCardNo' : '0990'
  }
}

const USER_ASSET = {
  totalAsset      : 1000200.00,
  availableAsset  : 200,
  yesterdayIncome : 10.00,
  totalIncome     : 2000.00,
  detailAsset     : null
}

const PRODUCT_RATE = [
  { pid : 'mf201801', rate : { averageRate : 8, rates7Day : [4.3, 4.2, 4.5, 5.0, 5.3, 4.8, 4.9], incomePerUnit : [1.2, 1.3, 1.2, 1.3, 1.2, 1.3, 1.2] } },
  { pid : 'bf201801', rate : { averageRate : 6, rates7Day : [5.3, 5.2, 4.5, 5.0, 5.3, 5.8, 4.9], incomePerUnit : [1.6, 1.7, 1.2, 1.3, 1.2, 1.3, 1.2] } }
]

module.exports = {
  user        : USER,
  productRate : PRODUCT_RATE,
  asset       : USER_ASSET
}


