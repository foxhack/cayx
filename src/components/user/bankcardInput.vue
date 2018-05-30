<template>
  <div id="bankcard-input" style="position: relative">
    <mt-cell v-if="editable === false" :title="title ||'银行卡卡号'" @click.native="alert">{{value}}</mt-cell>
    <div v-else>
      <mt-cell v-if="!displayInput" :title="title || '银行卡卡号'" is-link @click.native="showMod">{{value}}</mt-cell>
      <mt-field v-if="displayInput"
                disableClear
                :label="title || '银行卡卡号'"
                :placeholder="placeholder || '请输入银行卡卡号'"
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
    name    : 'BankCardInput',
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
          document.querySelector('#bankcard-input input').focus()
        })
      },
      check(val){
        console.log('调用银行卡卡号检查方法')
        let reg = /^(\d{16}|\d{19})$/
        if (!reg.test(val)) {
          this.state = 'error'
          this.errorMsg = '请输入正确的银行卡卡号'
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
        this.$emit('isValid',{'key':this.inputname, 'isValid':isValid})
      }
    },
    created(){
      if(this.initcheck) this.check(this.value)
    }
  }
</script>

