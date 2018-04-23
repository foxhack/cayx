const USER = {
  'userID'     : '123456789',
  'avatar'     : '',
  'userStatus' : { 'isRegisterCaej' : true, 'isRegisterCayx' : false, isBindCard : false },
  'userInfo'   : {
    'name'    : '张珊',
    'cardNo'  : '110110110110',
    'mobile'  : '1888888888',
    'email'   : '1888888888',
    'address' : '南横东街八号'
  }
}

const USER_BINDBANKS = [{ bid : 1, cid : '1234', default : true }, { bid : 2, cid : '1234', default : false }]

const USER_ASSETS = {
  totalAssets    : 1000200.00,
  latelyIncome   : 10.00,
  totalIncome    : 2000.00,
  currencyAssets : { possess : 100.00, totalIncome : 100 },
  periodicAssets : { possess : 20000.00, totalIncome : 1900 },
  accountAmount  : 200
}

const PRODUCT_RATE = [
  { pid : 'mf201801', rate : { averageRate : 8, rates7Day : [4.3, 4.2, 4.5, 5.0, 5.3, 4.8, 4.9], incomePerUnit : [1.2, 1.3, 1.2, 1.3, 1.2, 1.3, 1.2] } },
  { pid : 'bf201801', rate : { averageRate : 6, rates7Day : [5.3, 5.2, 4.5, 5.0, 5.3, 5.8, 4.9], incomePerUnit : [1.6, 1.7, 1.2, 1.3, 1.2, 1.3, 1.2] } }
]

module.exports = {
  user        : USER,
  productRate : PRODUCT_RATE,
  bindBanks   : USER_BINDBANKS,
  assets      : USER_ASSETS
}


