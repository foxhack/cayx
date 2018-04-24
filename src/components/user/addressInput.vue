<template>
  <div id="email">
    <mt-cell v-if="editable === false" title="联系地址" @click.native="alert">{{initVal}}</mt-cell>
    <div v-else>
      <mt-cell v-if="initVal && !displayInput" title="联系地址" is-link @click.native="showMod">{{initVal}}</mt-cell>
      <mt-field v-if="displayInput || initVal===undefined"
                label="联系地址" placeholder="请输入联系地址"
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
    name       : 'AddressInput',
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

          this.state = 'success'
          this.allowSubmit(true)
          this.update()
        })
      },
      allowSubmit(tag){
        this.$emit('allowSubmit', { key : 'address', val : tag })
      },
      update(){
        this.$emit('update', { key : 'address', val : this.newData })
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
