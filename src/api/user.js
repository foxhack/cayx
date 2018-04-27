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

export{
  getUserByCode,
  getUserByUserID,
  bindUserAccount,
  getIdentifyCode,
  register,
  updateUserInfo,
  openAccount,
  getAsset,
  operateAccount
}
