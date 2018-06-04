<template>
  <div id="email-input">
    <mt-cell v-if="readonly" :title="title ||'email'" @click.native="alert">
      <template v-if="showRawValue">{{value}}</template>
      <template v-else>{{value|email}}</template>
    </mt-cell>
    <div v-else>
      <mt-field v-if="showRawValue"
                :class="{'mint-cell-allow-right':state==''}"
                type="email"
                disableClear
                :label="title || 'email'"
                :placeholder="placeholder || '请输入email'"
                :value="value"
                :state="state"
                @input.native="check($event.target.value)">
      </mt-field>
      <mt-cell v-else :title="title ||'email'" is-link @click.native="displayInput">{{value|email}}</mt-cell>
      <div v-if="state=='error'" class="error">{{errorMsg}}</div>
    </div>
  </div>
</template>
<script>
  import { VALIDATE } from '@/utils/config'
  import { inputMixin } from '@/utils/mixin'
  export default{
    name    : 'EmailInput',
    mixins:[inputMixin],
    methods : {
      check(val){
        this.value=val
        console.log('调用email检查方法')
        if (!VALIDATE.email.test(val)) {
          this.state = 'error'
          this.errorMsg = '请输入合法的email'
          this.$parent.state.email = false
        }else {
          this.state = 'success'
          this.$parent.state.email = true
        }
      }
    }
  }
</script>

