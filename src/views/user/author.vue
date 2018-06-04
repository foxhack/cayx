<template>
  <div></div>
</template>
<script>
  import { guideToAuth, getQueryString } from '@/utils/common'
  export default{
    name    : 'Author',
    data(){
      return {
        loading : false
      }
    },
    methods : {
      getWxAuthor(){
        let code = getQueryString("code");
        let _ = this
        if (code) {
          console.log('得到code'+code)
          _.loading = true
          _.$post('getUserByCode', { code : code }, {
            showProgress : '数据获取中，请稍候......',
            callback     : { success : successCallback }
          })
          function successCallback(data) {
            window.localStorage.setItem('userID', data.userID)
            _.$store.commit('setUser', data)
            _.$router.replace(window.localStorage.getItem('toPath'))
          }
        } else {
          guideToAuth(_.$router.mode)
        }
      },
      isWeiXin(){
        let ua = window.navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i)=='micromessenger'
      }
    },
    created(){
      console.log('进入授权页')
      if (this.isWeiXin()) {
        this.getWxAuthor()
      } else {
        alert('当前使用的浏览器不是微信浏览器，跳过微信浏览器继续测试')
        window.localStorage.setItem('userID', 'bea762e21af340a9b75caac26944c597')
        this.$router.replace(window.localStorage.getItem('toPath'))
      }
    }
  }
</script>
