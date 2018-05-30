import  { apiUrl } from './config'

export function api(apiName, postData, isFormData) {
  let contentType
  if (!isFormData) {
    postData = JSON.stringify(postData)
    contentType='application/json'
  }else{
    contentType=false
  }
  return $.ajax({
    type        : 'POST',
    url         : apiUrl[apiName],
    processData : false,
    data        : postData,
    contentType : contentType
  })
}


