<template>
  <div id="identify-code">
    <mt-field label="验证码" type="number" placeholder="请输入收到验证码" v-model.trim.lay="newData">
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
        newData  : null,
        state    : '',
        errorMsg : '',
        count    : 0,
      }
    },
    props:['mobile','isValid'],
    watch   : {
      newData(){
        this.check()
      }
    },
    methods : {
      getIdentifyCode(countDown){
        let _ = this
        if (!this.isValid) return
        startCountDown(countDown)
        let postData = { userID : window.localStorage.getItem('userID'), mobile : this.mobile }
        fetchData(getIdentifyCode(postData))
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
      check(){
        this.$nextTick(() => {
          let reg = /^\d{4}$/
          if (!reg.test(this.newData)) {
            this.state = 'error'
            this.errorMsg = '请输入正确格式的验证码'
            this.allowSubmit(false)
            return false
          }
          this.state = 'success'
          this.allowSubmit(true)
          this.update()
        })
      },
      allowSubmit(tag){
        this.$emit('allowSubmit', { key : 'identifyCode', val : tag })
      },
      update(){
        this.$emit('update', { key : 'identifyCode', val : this.newData })
      }
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
