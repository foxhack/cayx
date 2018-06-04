<template>
  <div style="padding: 10px">
    <el-checkbox v-model="value" @change.native="check($event.target.value)">用户协议</el-checkbox>
    <div v-if="state=='error'" class="error">{{errorMsg}}</div>
  </div>
</template>
<script>
  import { Checkbox } from 'element-ui'
  export default{
    name       : 'AgreeInput',
    components : {
      'el-checkbox' : Checkbox
    },
    methods:{
      check(val){
        this.$parent.agree = !!val
      },
    }
  }
</script>

