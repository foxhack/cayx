<template>
  <div id="username">
    <mt-cell v-if="!editable" title="姓名" @click.native="alert">{{initVal}}</mt-cell>
    <div v-else>
      <mt-cell v-if="initVal && !displayInput" title="姓名" is-link @click.native="showMod">{{initVal}}</mt-cell>
      <mt-field  v-if="displayInput || initVal===undefined"
                label="姓名" placeholder="请输入姓名"
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
    name    : 'NameInput',
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
        console.log('调用检查方法')
        this.$nextTick(() => {
          if (!this.newData || this.newData.trim().length < 2) {
            this.state = 'error'
            this.errorMsg = '姓名不能为空，至少为两个字符'
            this.allowSubmit(false)
            return false
          }
          if (this.newData.trim() && this.newData.trim().indexOf(' ') > -1) {
            this.state = 'error'
            this.errorMsg = '姓名不能含有空格'
            this.allowSubmit(false)
            return false
          }
          if (this.newData.trim() && !/^[\u4E00-\u9FA5A-Za-z]+$/.test(this.newData)) {
            this.state = 'error'
            this.errorMsg = '姓名只能是中文或者英文'
            this.allowSubmit(false)
            return false
          }
          this.state = 'success'
          this.allowSubmit(true)
          this.update()
        })
      },
      allowSubmit(tag){
        this.$emit('allowSubmit', { key : 'name', val : tag })
      },
      update(){
        this.$emit('update', { key : 'name', val : this.newData })
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
