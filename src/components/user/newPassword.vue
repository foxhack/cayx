<template>
  <section>
    <div class="title">{{title || '设置交易密码'}}</div>
    <mt-field
        type="password"
        label="交易密码"
        placeholder="请输入6位数字的交易密码"
        :state="state1"
        @input.native="check1($event.target.value)">
    </mt-field>
    <mt-field
        :disabled="state1!=='success'"
        type="password"
        label="重复密码"
        :state="state2"
        placeholder="请再次输入密码"
        v-model="repeat" @input.native="check2($event.target.value)">
    </mt-field>
    <div class="error">{{errorMsg}}&nbsp;</div>
    <input type="button" class="primary-btn" @click="setPassword" :disabled="state!=='success'" value="确定设置">
    <result v-if="result.show" :result="result">
      <div slot="footer">
        <input type="button" class="primary-btn" value="确定" @click="confirm">
      </div>
    </result>
  </section>
</template>
<script>
  import { mixin }from '@/utils/mixin'
  import Result from '@/components/user/result'
  import { setPassword } from '@/api/user'
  export default{
    name       : 'NewPassword',
    data(){
      return {
        password : '',
        repeat   : '',
        state1   : '',
        state2   : '',
        errorMsg : '',
        result   : {
          show    : false,
          title   : '',
          content : '',
          reason  : ''
        },
        next     : null
      }
    },
    components : { Result },
    props      : ['title'],
    mixins     : [mixin],
    computed   : {
      state(){
        if (this.state1=='success' && this.state2=='success') {
          return 'success'
        }
        if (this.state1=='error' || this.state2=='error') {
          return 'error'
        }
      }
    },
    methods    : {
      check1(val){
        this.password = val
        console.log('调用密码1检查方法')
        let reg = /^\d{6}$/
        if (!reg.test(val)) {
          this.state1 = 'error'
          this.errorMsg = '请输入6位数字的密码'
        } else if (val!==this.repeat) {
          this.state1 = 'success'
          this.state2 = 'error'
          this.errorMsg = '两次输入的密码不相等'
        } else {
          this.state1 = 'success'
          this.state2 = 'success'
          this.errorMsg = ''
        }
      },
      check2(val){
        console.log('调用密码2检查方法')
        console.log('first:'+this.password)
        console.log('seconed1:'+val)
        if (this.password!==val) {
          this.state2 = 'error'
          this.errorMsg = '两次输入的密码不相等'
        } else {
          this.state2 = 'success'
          this.errorMsg = ''
        }
      },
      setPassword(){
        let post = { userID : window.localStorage.getItem('userID'), tradepwd : this.password }
        this.$post(setPassword(post),
          {
            showProgress   : '请稍候...',
            callback       : { success : successCallback }
          })
        let _ = this

        function successCallback() {
            _.result = {
              show    : true,
              title   : '设置结果',
              content : '密码设置成功！'
            }
          }
      },
      confirm(){
        if(!this.$store.state.user.userStatus.isSetPassword) this.$store.commit('setUserPassword')
        this.$emit('close')
//        this.$router.push({path:'/user'})
      }
//      goNext(){
//        this.$store.state.user.userStatus.isSetPassword = true
//        if (this.currentPath=='/user/passwordsetting') {
//          //通过个人中心设置的,即通过组件引入的
//          console.log('trigger close event')
//          this.$emit('close')
//          this.result.show = false
//        } else {
//          //通过路由引入的
//          this.result.show = false
//        }
//      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"
  .error
    color error-color
    text-align right
    padding-right 10px
    font-size 0.8em
    line-height 3em

  #set-password .mint-field-core
    -webkit-text-security disc
    text-security disc
</style>
