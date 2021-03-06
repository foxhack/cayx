import { backServerBaseUrl } from '@/utils/env'

export const authorDomain = 'caejfinance.s1.natapp.cc'
export const wxAppId = 'wx0fa1adf73899b2ae'

export const apiUrl = {
  getProductsRate    : backServerBaseUrl+'/finance/product/getproductrate',
  getUserByCode      : backServerBaseUrl+'/finance/user/getuserbycode',
  getUserByUserID    : backServerBaseUrl+'/finance/user/getuserbyid',
  bindUserAccount    : backServerBaseUrl+'/finance/user/binduseraccount',
  getIdentifyCode    : backServerBaseUrl+'/finance/sms/singlesend',
  register           : backServerBaseUrl+'/finance/user/registmobile',
  updateUserInfo     : backServerBaseUrl+'/finance/user/updateinfo',
  openAccount        : backServerBaseUrl+'/finance/user/openaccount',
  bindCard           : backServerBaseUrl+'/finance/user/bindcard',
  setDefaultBindCard : backServerBaseUrl+'/finance/user/setdefaultbindcard',
  unBindBankCard     : backServerBaseUrl+'/finance/user/unbindcard',
  getAsset           : backServerBaseUrl+'/finance/asset/assetquery',
  setPassword        : backServerBaseUrl+'/finance/asset/pwdservice',
  validPassword      : backServerBaseUrl+'/finance/asset/validpwd',
  rechargeAccount    : backServerBaseUrl+'/finance/capital/recharge',
  takeoutAccount     : backServerBaseUrl+'/finance/capital/takeout',
  buyAsset           : backServerBaseUrl+'/finance/asset/applybuy',
  sellAsset          : backServerBaseUrl+'/finance/asset/applyredeem',
  //getWxConfig        : backServerBaseUrl+'/weixin/getwxconfig',
  uploadIDCard       : backServerBaseUrl+'/file/uploadidcard',
  validUser          : backServerBaseUrl+'/finance/sms/validuser'
}

