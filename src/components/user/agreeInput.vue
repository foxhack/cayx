<template>
  <div class="content">
    <el-checkbox v-model="value" @change.native="check($event.target.value)">用户协议</el-checkbox>
    <div v-if="state=='error'" class="error">{{errorMsg}}</div>
  </div>
</template>
<script>
  import { Checkbox } from 'element-ui'
  export default{
    name       : 'AgreeInput',
    data(){
      return {
        state        : '',
        errorMsg     : ''
      }
    },
    props      : ['value','inputname'],
    components : {
      'el-checkbox' : Checkbox
    },
    methods:{
      check(val){
        if(val){
          this.state = 'success'
          this.setValid(true)
          this.$emit('input', val)
        }else{
          this.setValid(false)
        }
      },
      setValid(isValid){
        this.$emit('isValid',{'key':this.inputname, 'isValid':isValid})
      }
    },
    created(){
      this.check(this.value)
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base.styl"
  .content
    padding 10px
</style>
