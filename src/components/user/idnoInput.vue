<template>
  <div id="idno" style="position: relative">
    <mt-cell v-if="editable === false" :title="title || '身份证号'" @click.native="alert">{{value|IDCardNo}}</mt-cell>
    <div v-else>
      <mt-cell v-if="!displayInput" :title="title || '身份证号'" is-link @click.native="$emit('showInput',inputname)">
        <template v-if="fValue">
          {{value|IDCardNo}}
        </template>
        <template v-else>
          {{value}}
        </template>
      </mt-cell>
      <mt-field v-if="displayInput"
                disableClear
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
  import { VALIDATE } from '@/utils/config'
  export default{
    name    : 'IdonInput',
    data(){
      return {
        state    : '',
        errorMsg : ''
      }
    },
    props   : [
      'editable',
      'fValue',
      'title',
      'placeholder',
      'inputname',
      'value',
      'displayInput',
      'initcheck'
    ],
    watch   : {
      displayInput(val){
        if (val) {
          this.check(this.value)
          this.$nextTick(() => {
            document.querySelector('#idno input').focus()
          })
        }
      }
    },
    methods : {
      check(val){
        console.log('调用身份证检查方法')
        if (!VALIDATE.cardNo.test(val)) {
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
      if (this.initcheck) this.check(this.value)
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"

</style>
