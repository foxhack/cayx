import  { backServerBaseUrl } from './config'

function getUserByCode(code) {
  return $.ajax({
    url         : backServerBaseUrl+'/finance/user/getuserbycode',
    type        : 'POST',
    data        : JSON.stringify({ code : code }),
    contentType : 'application/json'
  })
}

function getUserByUserID(userID) {
  return $.ajax({
    url         : backServerBaseUrl+'/finance/user/getuserbyid',
    type        : 'POST',
    data        : JSON.stringify({ userID : userID }),
    contentType : 'application/json'
  })
}

function bindUserAccount(userID) {
  return $.ajax({
    type        : 'POST',
    url         : backServerBaseUrl+'/finance/user/binduseraccount',
    data        : JSON.stringify({ userID : userID }),
    contentType : 'application/json'
  })
}

function getIdentifyCode(postData) {
  return $.ajax({
    type        : 'POST',
    url         : backServerBaseUrl+'/finance/sms/singlesend',
    data        : JSON.stringify(postData),
    contentType : 'application/json'
  })
}

function register(postData) {
  return $.ajax({
    type        : 'POST',
    url         : backServerBaseUrl+'/finance/user/registmobile',
    data        : JSON.stringify(postData),
    contentType : 'application/json'
  })
}

function updateUserInfo(postData) {
  return $.ajax({
    type        : 'POST',
    url         : backServerBaseUrl+'/finance/user/updateinfo',
    data        : JSON.stringify(postData),
    contentType : 'application/json'
  })
}

function openAccount(postData) {
  return $.ajax({
    type        : 'POST',
    url         : backServerBaseUrl+'/finance/user/openaccount',
    data        : JSON.stringify(postData),
    contentType : 'application/json'
  })
}

function getAsset(postData) {
  return $.ajax({
    type        : 'POST',
    url         : backServerBaseUrl+'/finance/asset/assetquery',
    data        : JSON.stringify(postData),
    contentType : 'application/json'
  })
}

function setPassword(postData) {
  return $.ajax({
    type        : 'POST',
    url         : backServerBaseUrl+'/finance/asset/pwdservice',
    data        : JSON.stringify(postData),
    contentType : 'application/json'
  })
}

function validPassword(postData) {
  return $.ajax({
    type        : 'POST',
    url         : backServerBaseUrl+'/finance/asset/validpwd',
    data        : JSON.stringify(postData),
    contentType : 'application/json'
  })
}

function operateAccount(postData, type) {
  let url
  if (type==='in') url = backServerBaseUrl+'/finance/capital/recharge'
  if (type==='out') url = backServerBaseUrl+'/finance/capital/takeout'
  return $.ajax({
    type        : 'POST',
    url         : url,
    data        : JSON.stringify(postData),
    contentType : 'application/json'
  })
}

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

//export{
//
//  getUserByCode,
//  getUserByUserID,
//  bindUserAccount,
//  getIdentifyCode,
//  register,
//  updateUserInfo,
//  openAccount,
//  getAsset,
//  setPassword,
//  operateAccount,
//  validPassword
//}
