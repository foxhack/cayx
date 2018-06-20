<template>
  <div id="date-input">
    <mt-cell v-if="readonly" :title="title ||'日期'" @click.native="alert">
      <template v-if="showRawValue">{{value}}</template>
      <template v-else>{{value|date}}</template>
    </mt-cell>
    <div v-else>
      <mt-cell v-if="showRawValue"
               is-link
               :title="title || 日期"
               @click.native="openDatePicker">
        {{value ? selectedDate.join('-') : placeholder}}
      </mt-cell>
      <mt-cell v-else :title="title ||'日期'" is-link @click.native="displayInput">{{selectedDate.join('-')}}</mt-cell>
      <div v-if="state=='error'" class="error">{{errorMsg}}</div>
      <mt-datetime-picker
          ref="datePicker"
          type="date"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日"
          :startDate="startDate"
          :endDate="endDate"
          @confirm="confirmDatePicker"
          @cancel="closeDatePicker">
      </mt-datetime-picker>
    </div>
  </div>
</template>
<script>
  import { DatetimePicker } from 'mint-ui'
  import { inputMixin } from '@/utils/mixin'
  export default{
    name       : 'DateInput',
    data(){
      return {
        selectedDate : []
      }
    },
    props      : ['startDate', 'endDate'],
    mixins     : [inputMixin],
    components : { 'mt-datetime-picker' : DatetimePicker },
    methods    : {
      fixBackGround(){
        document.body.style = "position:fixed; left:0; right:0; overflow-y:hidden"
      },
      unFixBackGround(){
        document.body.style = ""
      },
      openDatePicker(){
        this.$refs.datePicker.open()
        this.fixBackGround()
      },
      closeDatePicker(){
        this.unFixBackGround()
      },
      confirmDatePicker(val){
        this.unFixBackGround()
        if (val) {
          this.$parent.state.cardVaildDate = true
          this.selectedDate[0] = val.getFullYear()+''
          this.selectedDate[1] = val.getMonth()+1 < 10 ? '0'+(val.getMonth()+1) : val.getMonth()
          this.selectedDate[2] = val.getDate() < 10 ? '0'+val.getDate() : val.getDate()
          this.value = this.selectedDate.join('')
        }
      },
      check(val){
        this.value = val
        console.log('调用email检查方法')
        if (!VALIDATE.email.test(val)) {
          this.state = 'error'
          this.errorMsg = '请输入合法的email'
          this.$parent.state.email = false
        } else {
          this.state = 'success'
          this.$parent.state.email = true
        }
      }
    }
  }
</script>

