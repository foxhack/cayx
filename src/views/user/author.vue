<template>
  <div v-else v-loading.body="loading" element-loading-text="登陆中"></div>
</template>
<script>
  import { api } from '@/api/api'
  import { guideToAuth, getQueryString } from '@/utils/common'
  export default{
    name : 'Author',
    data(){
      return {
        loading : false
      }
    },
    created(){
//      let code = getQueryString("code");
      let code = '123'
      let _ = this
      if (code) {
        console.log('得到code'+code)
        _.loading = true
        _.$post(api('getUserByCode',{code:code}), { callback : { success : successCallback, always : alwaysCallback } })
        function successCallback(data) {
          window.localStorage.setItem('userID', data.userID)
          _.$store.commit('setUser', data)
          _.$router.replace(window.localStorage.getItem('toPath'))
        }

        function alwaysCallback() {
          _.loading = false
        }
      } else {
        guideToAuth(_.$router.mode)
      }
    }
  }
</script>
