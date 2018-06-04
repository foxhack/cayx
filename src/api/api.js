import  { apiUrl } from './config'

export function api(apiName, postData) {
  let contentType
  if (apiName=='openAccount') {
    contentType=false
  }else{
    postData = JSON.stringify(postData)
    contentType='application/json'
  }
  return $.ajax({
    type        : 'POST',
    url         : apiUrl[apiName],
    processData : false,
    data        : postData,
    contentType : contentType
  })
}


