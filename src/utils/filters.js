export function unit(s,u) {
  return s+u
}

export function toCent(s) {
  if (s===null || s===undefined) s = 0
  s = s*100
  return s
}

export function toYuan(s) {
  if (s===null || s===undefined) s = 0
  s = (s/100).toFixed(2)
  return s
}

export function fMoney(s) {
  let n = 2
  if (s===null || s===undefined) s = 0
  s = parseFloat((s+'').replace(/[^\d\.-]/g, '')).toFixed(n)+''
  var l = s.split('.') [0].split('').reverse(),
    r = s.split('.') [1]
  var t = ''
  for (var i = 0; i < l.length; i++) {
    t += l[i]+((i+1)%3==0 && (i+1)!=l.length ? ',' : '')
  }
  return t.split('').reverse().join('')+'.'+r
}

export function fIDCardNo(s) {
  if (s) {
    s = s+''
    return s.substr(0, 3)+'***********'+s.substr(-4)
  } else {
    return s
  }
}

export function fMobile(s) {
  if (s) {
    s = s+''
    return s.substr(0, 3)+'****'+s.substr(-4)
  } else {
    return s
  }
}

export function fEmail(s) {
  if (s) {
    s = s+''
    return s.substr(0, 2)+'****'+s.substr(s.indexOf('@'))
  } else {
    return s
  }
}

export function fName(s) {
  if (s) {
    s = s+''
    return s.substr(0, 1)+'**'
  }
  else {
    return s
  }
}

export function fAddress(s) {
  return s
}

export function fBankCardNo(s) {
  if (s) {
    s = s+''
    return '尾号'+ s.substr(-4)
  } else {
    return s
  }
}
