<template>
  <div id="bankcard-input">
    <mt-cell v-if="readonly" :title="title ||'银行卡卡号'">{{value}}</mt-cell>
    <div v-else>
      <mt-field :class="{'mint-cell-allow-right':state==''}"
                type="email"
                disableClear
                :label="title || '银行卡卡号'"
                :placeholder="placeholder || '请输入银行卡卡号'"
                :value="value"
                :state="state"
                @input.native="check($event.target.value)">
      </mt-field>
      <div v-if="state=='error'" class="error">{{errorMsg}}</div>
    </div>
  </div>
</template>
<script>
  import { VALIDATE } from '@/utils/config'
  import { inputMixin } from '@/utils/mixin'

  export default{
    name    : 'BankCardInput',
    mixins:[inputMixin],
    methods : {
      check(val){
        this.value=val
        console.log('调用银行卡卡号检查方法')
        if (!VALIDATE.bankCardNo.test(val)) {
          this.state = 'error'
          this.errorMsg = '请输入正确的银行卡卡号'
          this.$parent.state.bankCardNo = false
        }else {
          this.state = 'success'
          this.$parent.state.bankCardNo = true
        }
      }
    }
  }
</script>

