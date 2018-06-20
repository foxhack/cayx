<template>
  <div></div>
</template>
<script>
  import { guideToAuth, getQueryString } from '@/utils/common'
  import { ENV } from '@/utils/env'

  export default{
    name    : 'Author',
    methods : {
      getWxAuthor(){
        let code = getQueryString("code");
        let _ = this
        if (code) {
          console.log('得到code'+code)
          _.$post('getUserByCode', { code : code }, {
            showProgress : '数据获取中，请稍候......',
            callback     : { success : successCallback }
          })
          function successCallback(data) {
            _.$store.commit('setUserID', data.userID)
            _.$store.commit('setUser', data)
            _.$router.replace(_.$store.state.toPath)
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
      switch (ENV){
        case 'production':
          this.getWxAuthor()
          break
        case 'development':
          //window.localStorage.setItem('userID', 'bea762e21af340a9b75caac26944c597')
          this.$store.commit('setUserID','bea762e21af340a9b75caac26944c597')
          this.$router.replace(this.$store.state.toPath)
          break
        case 'test':
          if(window.confirm('您当访问的是测试环境，要使用微信验证进行测试么?确定代表使用，取消代表不使用。')){
            this.getWxAuthor()
          }else{
            this.$store.commit('setUserID','bea762e21af340a9b75caac26944c597')
            this.$router.replace(this.$store.state.toPath)
          }
          break
        default:
          console.log('出错了，没有匹配的环境。')
      }
    }
  }
</script>
