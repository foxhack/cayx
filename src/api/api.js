import  { apiUrl } from './config'

export function api(apiName, postData) {
  return $.ajax({
    type        : 'POST',
    url         : apiUrl[apiName],
    data        : JSON.stringify(postData),
    contentType : 'application/json'
  })
}

