<template>
  <div id="idno-input">
    <mt-cell v-if="readonly" :title="title || '身份证号'" @click.native="alert">
      <template v-if="showRawValue">{{value}}</template>
      <template v-else>{{value|IDCardNo}}</template>
    </mt-cell>
    <div v-else>
      <mt-field v-if="showRawValue"
                disableClear
                :class="{'mint-cell-allow-right':state==''}"
                :label="title || '身份证号'"
                :placeholder="placeholder || '请输入合法的身份证号'"
                :value="value"
                :state="state"
                @input.native="check($event.target.value)">
      </mt-field>
      <mt-cell v-else :title="title ||'身份证号'" is-link @click.native="displayInput">{{value|IDCardNo}}</mt-cell>
      <div v-if="state=='error'" class="error">{{errorMsg}}</div>
    </div>
  </div>
</template>
<script>
  import { VALIDATE } from '@/utils/config'
  import { inputMixin } from '@/utils/mixin'
  export default{
    name    : 'IdonInput',
    mixins:[inputMixin],
    methods : {
      check(val){
        this.value=val
        console.log('调用身份证检查方法')
        if (!VALIDATE.cardNo.test(val)) {
          this.state = 'error'
          this.errorMsg = '请输入正确的身份证号码'
          this.$parent.state.cardNo = false
        }else {
          this.state = 'success'
          this.$parent.state.cardNo = true
        }
      }
    }
  }
</script>

