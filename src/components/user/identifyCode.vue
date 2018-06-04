<template>
  <div id="identify-code" style="position: relative">
    <mt-field
        disableClear
        :label="title ||'验证码'"
        type="number"
        :placeholder="placeholder || '请输入收到验证码'"
        :value="value"
        @input.native="check($event.target.value)">
      <span class="get-code-btn" :class="{active:validMobile}" v-show="!count" @click="getIdentifyCode(5)">获取验证码</span>
      <span class="count-num" v-show="count">{{count}}&nbsp;秒后重新获取</span>
    </mt-field>
    <div v-if="state=='error'" class="error">{{errorMsg}}</div>
  </div>
</template>
<script>
  import { VALIDATE } from '@/utils/config'
  import { inputMixin } from '@/utils/mixin'

  export default{
    name    : 'IdentifyCodeInput',
    mixins:[inputMixin],
    data(){
      return {
        count    : 0,
      }
    },
    props   : ['validMobile'],
    methods : {
      getIdentifyCode(countDown){
        console.log('get code')
        let _ = this
        startCountDown(countDown)
        let postData = { userID : window.localStorage.getItem('userID'), mobile : this.validMobile }
        this.$post('getIdentifyCode', postData,  { showSuccessMsg : false })
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
        this.value=val
        console.log('调用短信验证码检查方法')
        if (!VALIDATE.identifyCode.test(val)) {
          this.state = 'error'
          this.errorMsg = '请输入正确格式的验证码'
          this.$parent.state.identifyCode = false
        }else {
          this.state = 'success'
          this.$parent.state.identifyCode = true
        }
      },
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

</style>
