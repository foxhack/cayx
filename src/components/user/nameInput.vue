<template>
  <div id="username">
    <mt-cell v-if="editable === false" :title="title ||'姓名'" @click.native="alert">{{value}}</mt-cell>
    <div v-else>
      <mt-cell v-if="!displayInput" :title="title || '姓名'" is-link @click.native="showMod">{{value}}</mt-cell>
      <mt-field v-if="displayInput"
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
  export default{
    name    : 'NameInput',
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
          document.querySelector('#username input').focus()
        })
      },
      check(val){
        console.log('调用姓名检查方法')
        if (!val || val.trim().length < 2) {
          this.state = 'error'
          this.errorMsg = '姓名不能为空，至少为两个字符'
          this.setValid(false)
          return
        }
        if (val.trim() && val.trim().indexOf(' ') > -1) {
          this.state = 'error'
          this.errorMsg = '姓名不能含有空格'
          this.setValid(false)
          return
        }
        if (val.trim() && !/^[\u4E00-\u9FA5A-Za-z]+$/.test(val)) {
          this.state = 'error'
          this.errorMsg = '姓名只能是中文或者英文'
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
<style lang="stylus" scoped>
  @import "../../style/base"
  .error
    color error-color
    text-align right
    padding-right 10px
    font-size 0.8em
    line-height 3em
</style>
