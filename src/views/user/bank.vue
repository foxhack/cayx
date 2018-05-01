<template>
  <div id="bank">
    <section v-if="isBindCard && bindCard">
      <div class="title">已绑定的银行卡</div>
      <mt-cell :title="bindCard.bankName" :label="'尾号'+bindCard.bankCardNo" class="bank selected"></mt-cell>
    </section>
    <section v-else>
      <router-link class='add-bank' :to="{ name: 'newbank'}">添加新卡</router-link>
    </section>
  </div>
</template>
<script>
  import { mixin }from '@/utils/mixin'

  export default{
    data(){
      return {
        password : null
      }
    },
    mixins    : [mixin],
    method     : {
      setValid(isValid){
        this.$set(this.allowSubmit, isValid.key, isValid.isValid)
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"
  #bank
    padding 1em 0

  .add-bank
    @extend .center
    width 90%
    margin 0 auto
    line-height 4em
    font-size 2em
    {third-level}
    border 2px dashed
    border-radius 0.2em

  .bank
    /*font-family font-family-bold*/
  .bank.selected
    position relative

  .bank.selected:after
    content ''
    position absolute
    top 50%
    transform translateY(-50%)
    right 1em
    width 1.2em
    height 1.2em
    background-image url('../../assets/icon/card_selected.svg')
    background-size contain

</style>
