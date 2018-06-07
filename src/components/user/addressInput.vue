<template>
  <div id="address-input">
    <mt-cell v-if="readonly" :title="title ||'联系地址'" @click.native="alert">
      <template v-if="showRawValue">{{value}}</template>
      <template v-else>{{value|address}}</template>
    </mt-cell>
    <div v-else>
      <mt-field v-if="showRawValue"
                type="textarea"
                :class="{'mint-cell-allow-right':state==''}"
                disableClear
                :label="title || '联系地址'"
                :placeholder="placeholder || '请输入联系地址'"
                :value="value"
                :state="state"
                @input.native="check($event.target.value)">
      </mt-field>
      <mt-cell v-else :title="title ||'联系地址'" is-link @click.native="displayInput">{{value|address}}</mt-cell>
      <div v-if="state=='error'" class="error">{{errorMsg}}</div>
    </div>
  </div>
</template>
<script>
  import { VALIDATE } from '@/utils/config'
  import { inputMixin } from '@/utils/mixin'

  export default{
    name    : 'AddressInput',
    mixins:[inputMixin],
    methods : {
      check(val){
        this.value=val
        console.log('调用联系地址检查方法')
        if (!VALIDATE.address.test(val)){
          this.state = 'error'
          this.errorMsg = '请输入8-30个汉字'
          this.$parent.state.address = false
        }else {
          this.state = 'success'
          this.$parent.state.address = true
        }
      }
    }
  }
</script>


