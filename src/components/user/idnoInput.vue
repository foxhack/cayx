<template>
  <div id="idno">
    <mt-cell v-if="editable === false" :title="title || '身份证号'" @click.native="alert">{{value}}</mt-cell>
    <div v-else>
      <mt-cell v-if="!displayInput" :title="title || '身份证号'" is-link @click.native="showMod">{{value}}</mt-cell>
      <mt-field v-if="displayInput"
                :label="title || '身份证号'" :placeholder="placeholder || '请输入合法的身份证号'"
                :state="state"
                :value="value"
                @input.native="check($event.target.value)">
      </mt-field>
    </div>
    <div v-if="state=='error'" class="error">{{errorMsg}}</div>
  </div>
</template>
<script>
  export default{
    name    : 'IdonInput',
    data(){
      return {
        displayInput : false,
        state        : '',
        errorMsg     : ''
      }
    },
    props   : [
      'editable',
      'title',
      'placeholder',
      'inputname',
      'value',
      'initcheck'
    ],
    methods : {
      showMod(){
        this.displayInput = true
        this.check(this.value)
        this.$nextTick(()=>{
          document.querySelector('#idno input').focus()
        })
      },
      check(val){
        console.log('调用身份证检查方法')
        let reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        if (!reg.test(val)) {
          this.state = 'error'
          this.errorMsg = '请输入正确的身份证号码'
          this.setValid(false)
          return
        }
        this.state = 'success'
        this.setValid(true)
        this.$emit('input', val)
      },
      setValid(isValid){
        this.$emit('isValid', { 'key' : this.inputname, 'isValid' : isValid })
      },
      alert(){
        this.$message('您已绑卡，不能修改此信息。');
      }
    },
    created(){
      if(this.initcheck) this.check(this.value)
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
</style>
