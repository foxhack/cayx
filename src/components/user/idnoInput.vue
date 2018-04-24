<template>
  <div id="idno">
    <mt-cell v-if="!editable" title="身份证号" @click.native="alert">{{initVal}}</mt-cell>
    <div v-else>
      <mt-cell v-if="initVal && !displayInput" title="身份证号" is-link @click.native="showMod">{{initVal}}</mt-cell>
      <mt-field v-if="displayInput || initVal===undefined"
                label="身份证号" placeholder="请输入合法的身份证号"
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
    name    : 'IdonInput',
    data(){
      return {
        newData      : null,
        displayInput : false,
        state        : '',
        errorMsg     : ''
      }
    },
    props   : {
      editable : Boolean,
      initVal   : String
    },
    watch   : {
      newData(){
        this.check()
      }
    },
    methods : {
      showMod(){
        this.displayInput = true
        this.check()
      },
      check(){
        this.$nextTick(() => {
          let reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

          if (!reg.test(this.newData)) {
            this.state = 'error'
            this.errorMsg = '请输入正确的身份证号码'
            this.allowSubmit(false)
            return false
          }
          this.state = 'success'
          this.allowSubmit(true)
          this.update()
        })
      },
      allowSubmit(tag){
        this.$emit('allowSubmit', { key : 'cardNo', val : tag })
      },
      update(){
        this.$emit('update', { key : 'cardNo', val : this.newData })
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
