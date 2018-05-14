//const backServerBaseUrl = 'http://testfinance.s1.natapp.cc'
const backServerBaseUrl = 'http://caejback.s1.natapp.cc'
//const backServerBaseUrl = 'http://localhost:8081'
export const authorDomain = 'caejfinance.s1.natapp.cc'
export const wxAppId = 'wx4e007de45389d924'

export const apiUrl = {
  getProductsRate : backServerBaseUrl+'/finance/product/getproductrate',
  getUserByCode   : backServerBaseUrl+'/finance/user/getuserbycode',
  getUserByUserID : backServerBaseUrl+'/finance/user/getuserbyid',
  bindUserAccount : backServerBaseUrl+'/finance/user/binduseraccount',
  getIdentifyCode : backServerBaseUrl+'/finance/sms/singlesend',
  register        : backServerBaseUrl+'/finance/user/registmobile',
  updateUserInfo  : backServerBaseUrl+'/finance/user/updateinfo',
  openAccount     : backServerBaseUrl+'/finance/user/openaccount',
  getAsset        : backServerBaseUrl+'/finance/asset/assetquery',
  setPassword     : backServerBaseUrl+'/finance/asset/pwdservice',
  validPassword   : backServerBaseUrl+'/finance/asset/validpwd',
  rechargeAccount : backServerBaseUrl+'/finance/capital/recharge',
  takeoutAccount  : backServerBaseUrl+'/finance/capital/takeout',
  buyAsset        : backServerBaseUrl+'/finance/asset/applybuy',
  sellAsset       : backServerBaseUrl+'/finance/asset/applyredeem',
  getWxConfig     : backServerBaseUrl+'/weixin/getwxconfig'
}
