<template>
  <div></div>
</template>
<script>
  import { guideToAuth, getQueryString } from '@/utils/common'
  export default{
    name : 'Author',
    data(){
      return {
        loading : false
      }
    },
    created(){
      console.log('进入授权页')
      let code = getQueryString("code");
      let _ = this
      if (code) {
        console.log('得到code'+code)
        _.loading = true
        _.$post('getUserByCode', { code : code }, false, {
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
    }
  }
</script>
