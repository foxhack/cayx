<template>
  <div id="name-input">
    <mt-cell v-if="readonly" :title="title ||'姓名'" @click.native="alert">
      <template v-if="showRawValue">{{value}}</template>
      <template v-else>{{value|name}}</template>
    </mt-cell>
    <div v-else>
      <mt-field v-if="showRawValue"
                :class="{'mint-cell-allow-right':state==''}"
                disableClear
                :label="title || '姓名'"
                :placeholder="placeholder || '请输入姓名'"
                :value="value"
                :state="state"
                @input.native="check($event.target.value)">
      </mt-field>
      <mt-cell v-else :title="title ||'姓名'" is-link @click.native="displayInput">{{value|name}}</mt-cell>
      <div v-if="state=='error'" class="error">{{errorMsg}}</div>
    </div>
  </div>
</template>
<script>
  import { VALIDATE } from '@/utils/config'
  import { inputMixin } from '@/utils/mixin'
  export default{
    name    : 'NameInput',
    mixins:[inputMixin],
    methods : {
      check(val){
        this.value=val.trim()
        console.log('调用姓名检查方法')
        if (!this.value || this.value && !VALIDATE.name.test(this.value)) {
          this.state = 'error'
          this.errorMsg = '姓名只能是2至4位中文或者英文，不含空格'
          this.$parent.state.name = false
        }else {
          this.state = 'success'
          this.$parent.state.name = true
        }
      }
    }
  }
</script>

