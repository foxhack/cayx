<template>
  <div id="identify-code">
    <mt-field
        :label="title ||'验证码'"
        type="number"
        :placeholder="placeholder || '请输入收到验证码'"
        :value="value"
        @input.native="check($event.target.value)">
      <span class="get-code-btn" :class="{active:isValid}" v-show="!count" @click="getIdentifyCode(5)">获取验证码</span>
      <span class="count-num" v-show="count">{{count}}&nbsp;秒后重新获取</span>
    </mt-field>
    <div v-if="state=='error'" class="error">{{errorMsg}}</div>
  </div>
</template>
<script>
  import { getIdentifyCode } from '@/api/user'
  import { fetchData } from '@/utils/common.js'
  export default{
    name    : 'IdentifyCodeInput',
    data(){
      return {
        state    : '',
        errorMsg : '',
        count    : 0,
      }
    },
    props   : ['mobile', 'isValid', 'value', 'title', 'placeholder', 'inputname', 'initcheck'],
    methods : {
      getIdentifyCode(countDown){
        let _ = this
        if (!this.isValid) return
        startCountDown(countDown)
        let postData = { userID : window.localStorage.getItem('userID'), mobile : this.mobile }
        fetchData(getIdentifyCode(postData),{showSuccessMsg:true})
        function startCountDown(num) {
          _.count = num
          _countDown()
          function _countDown() {
            setTimeout(() => {
              _.count--
              if (_.count > 0) _countDown()
            }, 1000)
          }
        }
      },
      check(val){
        console.log('调用短信验证码检查方法')
        let reg = /^\d{4}$/
        if (!reg.test(val)) {
          this.state = 'error'
          this.errorMsg = '请输入正确格式的验证码'
          this.setValid(false)
          return false
        }
        this.state = 'success'
        this.setValid(true)
        this.$emit('input', val)
      },
      setValid(isValid){
        this.$emit('isValid', { 'key' : this.inputname, 'isValid' : isValid })
      }
    },
    created(){
      if(this.initcheck) this.check(this.value)
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"
  .get-code-btn, .count-num
    font-size 0.8em
    padding 0.2em 0.4em
    display inline-block
    line-height 2em
    margin-left 10px

  .get-code-btn
    color #fff
    border-radius 0.4em
    border 1px solid
    background primary-text-color
    opacity 0.3

  .get-code-btn.active
    background secondary-text-color
    opacity 1

  .count-num
    {third-level}

  .error
    color error-color
    text-align right
    padding-right 10px
    font-size 0.8em
    line-height 3em

</style>
