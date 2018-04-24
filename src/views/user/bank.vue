<template>
  <div id="bank">
    <section v-if="isBindCard && bankUsed.length>0">
      <div class="title">已绑定的银行卡</div>
      <mt-cell><img slot="icon" src="../../assets/images/icbc.png" alt="" height="3em" width="100%"></mt-cell>
      <!--<mt-cell :title="bankUsed.name" label="尾号0884" class="bank selected" @click.native="operateBank(2)"></mt-cell>-->
    </section>
    <section>
      <router-link class='add-bank' :to="{ name: 'newbank'}">添加新卡</router-link>
    </section>
  </div>
</template>
<script>
  export default{
    computed   : {
      isBindCard(){
        return this.$store.state.user && this.$store.state.user.userStatus.isBindCard
      },
      bindedCards(){
        return  this.$store.state.user && this.$store.state.user.bindedCards
//        return [{ bid : 1, cid : '1234', default : true }, { bid : 2, cid : '1234', default : false }]
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
</style>
