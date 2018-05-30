<template>
  <div id="address-input">
    <mt-cell v-if="editable === false" :title="title ||'联系地址'" @click.native="alert">{{value}}</mt-cell>
    <div v-else>
      <mt-cell v-if="!displayInput" :title="title || '联系地址'" is-link @click.native="$emit('showInput',inputname)">
        <template v-if="fValue">
          {{value|address}}
        </template>
        <template v-else>
          {{value}}
        </template>
      </mt-cell>
      <mt-field v-if="displayInput"
                disableClear
                :label="title || '联系地址'"
                :placeholder="placeholder || '请输入联系地址'"
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
    name    : 'AddressInput',
    data(){
      return {
        state    : '',
        errorMsg : ''
      }
    },
    props   : [
      'editable',
      'fValue',
      'displayInput',
      'title',
      'placeholder',
      'inputname',
      'value'
    ],
    watch   : {
      displayInput(val){
        if (val) {
          this.check(this.value)
          this.$nextTick(() => {
            document.querySelector('#address-input input').focus()
          })
        }
      }
    },
    methods : {
      check(val){
        console.log('调用联系地址检查方法')
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
  .error
    color error-color
    text-align right
    padding-right 10px
    font-size 0.8em
    line-height 3em
</style>

