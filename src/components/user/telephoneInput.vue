<template>
  <div id="telephone-input">
    <mt-cell v-if="readonly" :title="title || '手机号'" @click.native="alert">
      <template v-if="filterValue">{{value|mobile}}</template>
      <template v-else>{{value}}</template>
    </mt-cell>
    <div v-else>
      <mt-field v-if="showRawValue"
                type="tel"
                disableClear
                :class="{'mint-cell-allow-right':state==''}"
                :label="title || '手机号'"
                :placeholder="placeholder || '请输入手机号'"
                :value="value"
                :state="state"
                @input.native="check($event.target.value)">
      </mt-field>
      <mt-cell v-else :title="title ||'手机号'" is-link @click.native="displayInput">{{value|mobile}}</mt-cell>
      <div v-if="state=='error'" class="error">{{errorMsg}}</div>
    </div>
  </div>
</template>
<script>
  import { VALIDATE } from '@/utils/config'
  import { inputMixin } from '@/utils/mixin'
  export default{
    name : 'TelephoneInput',
    mixins:[inputMixin],
    methods : {
      check(val){
        this.value = val
        if (!VALIDATE.mobile.test(val)) {
          this.state = 'error'
          this.errorMsg = '请输入正确的手机号'
          this.$parent.state.mobile = false
        } else {
          this.state = 'success'
          this.$parent.state.mobile = true
        }
        this.$emit('setMobile')
      }
    }
  }
</script>


