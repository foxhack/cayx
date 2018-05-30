<template>
  <div id="email-input">
    <mt-cell v-if="editable === false" :title="title ||'email'" @click.native="alert">{{value|email}}</mt-cell>
    <div v-else>
      <mt-field v-if="showRawValue"
                disableClear
                :label="title || 'email'"
                :placeholder="placeholder || '请输入email'"
                :value="value"
                :state="state"
                @input.native="check($event.target.value)">
      </mt-field>
      <mt-cell v-else :title="title ||'email'" is-link @click.native="displayInput">{{value|email}}</mt-cell>
      <div v-if="state=='error'" class="error">{{errorMsg}}</div>
    </div>
  </div>
</template>
<script>
  import { VALIDATE } from '@/utils/config'
  export default{
    name    : 'EmailInput',
    data(){
      return {
        value    : null,
        showRawValue : !this.filterValue,
        state    : '',
        errorMsg : '',
      }
    },
    props   : [
      'initcheck',
      'editable',
      'filterValue',
      'title',
      'placeholder',
    ],
    methods : {
      displayInput(){
        this.showRawValue=true
        this.check(this.value)
      },
      check(val){
        console.log('调用email检查方法')
        if (!VALIDATE.email.test(val)) {
          this.state = 'error'
          this.errorMsg = '请输入合法的email'
          return
        }
        this.state = 'success'
        console.log('向父组件传递', val)
        this.$emit('setValue', 'email', val)
      },
      alert(){
        this.$message('您已绑卡，不能修改此信息。');
      },
    },
    created(){
      this.value=this.userInfo.email
      if (this.initcheck) {
        this.showRawValue=true
        this.check(this.value)
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"
  #email-input
    position relative


</style>

