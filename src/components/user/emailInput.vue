<template>
  <div id="email">
    <mt-cell v-if="editable === false" title="email" @click.native="alert">{{initVal}}</mt-cell>
    <div v-else>
      <mt-cell v-if="initVal && !displayInput" title="email" is-link @click.native="showMod">{{initVal}}</mt-cell>
      <mt-field v-if="displayInput || initVal===undefined"
                label="email" placeholder="请输入email"
                :state="state"
                v-model.trim.lay="newData"
                autofocus>
      </mt-field>
    </div>
    <div v-if="state=='error'" class="error">{{errorMsg}}</div>
  </div>
</template>
<script>
  export default{
    name       : 'EmailInput',
    props      : ['initVal', 'editable'],
    data(){
      return {
        newData      : null,
        displayInput : false,
        state        : '',
        errorMsg     : ''
      }
    },
    watch      : {
      newData(){
        this.check()
      }
    },
    methods    : {
      showMod(){
        this.displayInput = true
        this.check()
      },
      check(){
        this.$nextTick(() => {
          let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
          if (!reg.test(this.newData)) {
            this.state = 'error'
            this.errorMsg = '请输入正确的email'
            this.allowSubmit(false)
            return false
          }
          this.state = 'success'
          this.allowSubmit(true)
          this.update()
        })
      },
      allowSubmit(tag){
        this.$emit('allowSubmit', { key : 'email', val : tag })
      },
      update(){
        this.$emit('update', { key : 'email', val : this.newData })
      },
      alert(){
        this.$message('您已绑卡，不能修改此信息。');
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
