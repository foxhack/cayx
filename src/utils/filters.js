export function fMoney(s) {
  if (typeof s!=='number') s = 0
  let n = 2
  s = parseFloat((s+'').replace(/[^\d\.-]/g, '')).toFixed(n)+''
  var l = s.split('.') [0].split('').reverse(),
    r = s.split('.') [1]
  var t = ''
  for (var i = 0; i < l.length; i++) {
    t += l[i]+((i+1)%3==0 && (i+1)!=l.length ? ',' : '')
  }
  return t.split('').reverse().join('')+'.'+r
}
