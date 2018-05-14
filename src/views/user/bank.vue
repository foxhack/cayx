<template>
  <div id="bank" :class="{'page-with-top-bottom':currentPath=='/user/bank'}">
    <section v-if="isBindCard && bindCard" style="margin-top:1em">
      <div class="title">已绑定的银行卡</div>
      <mt-cell :title="bindCard.bankName" :label="'尾号'+bindCard.bankCardNo" class="bank selected"></mt-cell>
    </section>
    <section v-else>
      <div class='add-bank center' v-show="!showNewBank" @click="showNewBank=true">添加新卡</div>
      <new-bank v-if="showNewBank"></new-bank>
    </section>
  </div>
</template>
<script>
  import NewBank from '@/views/user/newbank'

  export default{
    data(){
      return {
        showNewBank : false
      }
    },
    components : { NewBank },
    method     : {
      setValid(isValid){
        this.$set(this.allowSubmit, isValid.key, isValid.isValid)
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"

  .add-bank
    width 90%
    color silver
    margin 0.5em auto
    line-height 4em
    font-size 2em
    {third-level}
    border 2px dashed
    border-radius 0.2em

</style>
