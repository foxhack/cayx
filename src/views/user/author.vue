<template>
  <div></div>
</template>
<script>
  import { guideToWxAuth, getQueryString } from '@/utils/common'
  import { ENV } from '@/utils/env'
  import { MockUserID } from '@/utils/config'
  export default{
    name    : 'Author',
    methods : {
      getAuthor(){
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
            _.$router.replace(window.localStorage.getItem('toPath'))
          }
        } else {
          switch (ENV) {
            case 'production':
              guideToWxAuth(_.$router.mode)
              break
            case 'development':
              this.$store.commit('setUserID', MockUserID)
              this.$router.replace(window.localStorage.getItem('toPath'))
              break
            case 'test':
              if (window.confirm('您当访问的是测试环境，要使用微信验证进行测试么?确定代表使用，取消代表不使用。')) {
                guideToWxAuth(_.$router.mode)
              } else {
                this.$store.commit('setUserID', MockUserID)
                this.$router.replace(window.localStorage.getItem('toPath'))
              }
              break
            default:
              console.log('出错了，没有匹配的环境。')
          }
        }
      }
    },
    created(){
      console.log('进入授权页')
      console.log(window.localStorage.getItem('toPath'))
      this.getAuthor()

    }
  }
</script>
