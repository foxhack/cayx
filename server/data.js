const USER = {
  'userID'     : '123456789',
  'avatar'     : 'http://jf258.com/uploads/2014-09-18/171511119.jpg',
  'userStatus' : {
    'isRegisterCaej'  : true,
    'isRegisterCayx'  : false,
    'isOpenAccount'   : false,
    'isRiskAppraisal' : true,
    'isSetPassword'   : false
  },
  'userInfo'   : {
    'name'            : '张珊一一',
    'cardNo'          : '110104198204150848',
    'mobile'          : '13401026599',
    'email'           : 'andreachow@sina.com',
    'areaCode'        : '',
    'address'         : '',
    'defaultBindCard' : '',
    'bindCard'        : []
  }
}

const USER_ASSET = {
  totalAsset      : 0,
  availableAsset  : 0,
  yesterdayIncome : 0.00,
  totalIncome     : 0.00,
  detailAsset     : [{ productId : 'mf201801', totalAsset : 0.00, totalIncome : 0.00, yesterdayIncome : 0.00 },
                     { productId : 'bf201801', totalAsset : 0.00, totalIncome : 0.00, yesterdayIncome : 0.00 }]
}

//const USER_ASSET = {
//  totalAsset      : 1000200.00,
//  availableAsset  : 200,
//  yesterdayIncome : 10.00,
//  totalIncome     : 2000.00,
//  detailAsset     : [{ productId : 'mf201801', totalAsset : 50000.00, totalIncome : 1000.20, yesterdayIncome : 1.56 },
//                     { productId : 'bf201801', totalAsset : 20000.00, totalIncome : 80.50, yesterdayIncome : 0 }]
//}

const PRODUCT_RATE = [
  { pid : 'mf201801', rate : { averageRate : 8, rates7Day : [4.3, 4.2, 4.5, 5.0, 5.3, 4.8, 4.9], incomePerUnit : [1.6, 1.7, 1.2, 1.3, 1.2, 1.3, 1.2] } },
  { pid : 'bf201801', rate : { averageRate : 6, rates7Day : [5.3, 5.2, 4.5, 5.0, 5.3, 5.8, 4.9], incomePerUnit : [1.2, 1.3, 1.2, 1.3, 1.2, 1.3, 1.2] } }
]

module.exports = {
  user        : USER,
  productRate : PRODUCT_RATE,
  asset       : USER_ASSET
}


