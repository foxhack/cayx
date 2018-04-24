<template>
  <div id="telephone">
    <mt-cell v-if="editable === false" title="手机号" @click.native="alert">{{initVal}}</mt-cell>
    <div v-else>
      <mt-cell v-if="initVal && !displayInput" title="手机号" is-link @click.native="showMod">{{initVal}}</mt-cell>
      <mt-field v-if="displayInput || initVal===undefined"
                type="number"
                label="手机号" placeholder="请输入手机号"
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
    name       : 'TelephoneInput',
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
          let reg = /^1[0-9]{10}$/
          if (!reg.test(this.newData)) {
            this.state = 'error'
            this.errorMsg = '请输入正确的手机号'
            this.allowSubmit(false)
            return false
          }
          this.state = 'success'
          this.allowSubmit(true)
          this.update()
        })
      },
      allowSubmit(tag){
        this.$emit('allowSubmit', { key : 'mobile', val : tag })
      },
      update(){
        this.$emit('update', { key : 'mobile', val : this.newData })
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
