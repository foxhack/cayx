<template>
  <section>
    <div class="cell" v-if="title">{{title}}</div>
    <div style="position: relative">
      <mt-field
          type="tel"
          label="交易密码"
          placeholder="请输入6位数字的交易密码"
          :state="state1"
          @input.native="check1($event.target.value)">
      </mt-field>
      <div class="error" v-if="state1=='error'">{{errorMsg1}}</div>
    </div>
    <div style="position: relative">
      <mt-field
          :disabled="state1!=='success'"
          type="tel"
          label="重复密码"
          :state="state2"
          placeholder="请再次输入密码"
          v-model="repeat" @input.native="check2($event.target.value)">
      </mt-field>
      <div class="error" v-if="state2=='error'">{{errorMsg2}}</div>
    </div>
    <input type="button" class="primary-btn" @click="setPassword" :disabled="state!=='success' || submitting" value="确定设置">
    <result v-if="result.show" :result="result">
      <div slot="footer">
        <input type="button" class="primary-btn" value="确定" @click="confirm">
      </div>
    </result>
  </section>
</template>
<script>
  import Result from '@/components/user/result'
  export default{
    name       : 'NewPassword',
    data(){
      return {
        password   : '',
        repeat     : '',
        state1     : '',
        state2     : '',
        errorMsg1  : '',
        errorMsg2  : '',
        result     : {
          show    : false,
          title   : '',
          content : '',
          reason  : ''
        },
        submitting : false
      }
    },
    components : { Result },
    props      : ['title'],
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
          this.errorMsg1 = '请输入6位数字的密码'
        } else if (val!==this.repeat) {
          this.state1 = 'success'
          this.state2 = 'error'
          this.errorMsg1 = this.errorMsg2 = '两次输入的密码不相等'
        } else {
          this.state1 = 'success'
          this.state2 = 'success'
          this.errorMsg1 = ''
          this.errorMsg2 = ''
        }
      },
      check2(val){
        console.log('调用密码2检查方法')
        console.log('first:'+this.password)
        console.log('seconed1:'+val)
        if (this.password!==val) {
          this.state2 = 'error'
          this.errorMsg2 = '两次输入的密码不相等'
        } else {
          this.state2 = 'success'
          this.errorMsg2 = ''
        }
      },
      setPassword(){
        this.submitting = true
        let post = { userID : window.localStorage.getItem('userID'), tradepwd : this.password }
        this.$post('setPassword', post,
          {
            showProgress : '请稍候...',
            callback     : { success : successCallback, always : alwaysCallback }
          })
        let _ = this

        function successCallback() {
          _.result = {
            show    : true,
            title   : '设置结果',
            content : '密码设置成功！'
          }
        }

        function alwaysCallback() {
          _.submitting = false
        }
      },
      confirm(){
        if (!this.$store.state.user.userStatus.isSetPassword) this.$store.commit('setUserPassword')
        this.$emit('close')
      }
    }
  }
</script>

