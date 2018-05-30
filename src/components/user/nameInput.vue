<template>
  <div id="username">
    <mt-cell v-if="editable === false" :title="title ||'姓名'" @click.native="alert">{{value|name}}</mt-cell>
    <div v-else>
      <mt-cell v-if="!displayInput" :title="title || '姓名'" is-link @click.native="$emit('showInput',inputname)">
        <template v-if="fValue">
          {{value|name}}
        </template>
        <template v-else>
          {{value}}
        </template>
      </mt-cell>
      <mt-field v-if="displayInput"
                disableClear
                :label="title || '姓名'"
                :placeholder="placeholder || '请输入姓名'"
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
    name    : 'NameInput',
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
      'value',
      'initcheck'
    ],
    methods : {
      showMod(){
        this.displayInput = true
        this.check(this.value)
        this.$nextTick(() => {
          document.querySelector('#username input').focus()
        })
      },
      check(val){
        console.log('调用姓名检查方法')
        if (val.trim() && !VALIDATE.name.test(val)) {
          this.state = 'error'
          this.errorMsg = '姓名只能是2至4位中文或者英文，不含空格'
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
    },
    created(){
      if (this.initcheck) this.check(this.value)
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"
  #username
    position relative
</style>
