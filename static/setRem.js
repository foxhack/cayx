(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth<docEl.clientHeight?docEl.clientWidth:docEl.clientHeight
      if (!clientWidth) return;
      if(clientWidth>=750){
        docEl.style.fontSize = '100px';
      }else{
        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
      }
    };
  recalc()//第一次执行，在DOMContentLoaded之前
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

