import {backServerBaseUrl} from './config'

export function getProductsRate(pid) {
  return $.ajax({
    url  : backServerBaseUrl+'/finance/product/getproductrate',
    type : 'POST',
    data        : JSON.stringify({ pid : pid }),
    contentType : 'application/json'
  })
}

