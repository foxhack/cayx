import  { backServerBaseUrl } from './config'

const apiUrl = {
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
  takeoutAccount  : backServerBaseUrl+'/finance/capital/takeout'
}

function api(apiName, postData) {
  return function() {
    return $.ajax({
      type        : 'POST',
      url         : apiUrl[apiName],
      data        : JSON.stringify(postData),
      contentType : 'application/json'
    })
  }
}

