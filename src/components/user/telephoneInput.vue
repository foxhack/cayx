<template>
  <div id="telephone-input">
    <mt-cell v-if="editable === false" :title="title || '手机号'" @click.native="alert">{{value}}</mt-cell>
    <div v-else>
      <mt-cell v-if="!displayInput" :title="title || '手机号'" :label="subtitle" is-link @click.native="showMod">{{value}}</mt-cell>
      <mt-field v-if="displayInput"
                type="number"
                :label="title || '手机号'" :placeholder="placeholder || '请输入手机号'"
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
    name    : 'TelephoneInput',
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
      'subtitle',
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
          document.querySelector('#telephone-input input').focus()
        })
      },
      check(val){
        console.log('调用手机号检查方法')
        let reg = /^1[0-9]{10}$/
        if (!reg.test(val)) {
          this.state = 'error'
          this.errorMsg = '请输入正确的手机号'
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

