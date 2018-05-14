<template>
  <div id="email-input">
    <mt-cell v-if="editable === false" :title="title ||'email'" @click.native="alert">{{value | email}}</mt-cell>
    <div v-else>
      <mt-cell v-if="!displayInput" :title="title || 'email'" is-link @click.native="$emit('showInput',inputname)">{{value | email}}</mt-cell>
      <mt-field v-if="displayInput"
                :label="title || 'email'"
                :placeholder="placeholder || '请输入email'"
                :state="state"
                :value="value"
                @input.native="check($event.target.value)">
      </mt-field>
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
        state        : '',
        errorMsg     : ''
      }
    },
    props   : [
      'editable',
      'displayInput',
      'title',
      'placeholder',
      'inputname',
      'value'
    ],
    watch:{
      displayInput(val){
        if(val){
          this.check(this.value)
          this.$nextTick(()=>{
            document.querySelector('#email-input input').focus()
          })
        }
      }
    },
    methods : {
      check(val){
        console.log('调用email检查方法')
        if (!VALIDATE.email.test(val)) {
          this.state = 'error'
          this.errorMsg = '请输入合法的email'
          this.setValid(false)
          return
        }
        this.state = 'success'
        this.setValid(true)
        this.$emit('input', val)
      },
      alert(){
        this.$message('您已绑卡，不能修改此信息。');
      },
      setValid(isValid){
        this.$emit('isValid', { 'key' : this.inputname, 'isValid' : isValid })
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"
  #email-input
    position relative


</style>

