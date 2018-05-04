<template>
  <div class="product-detail-wrapper">
    <div class="miss">图表</div>
    <div>{{product.rate.rates7Day}}{{product.rate.incomePerUnit}}</div>
    <div class="miss">产品介绍</div>
    <div class="miss">产品介绍</div>
    <div class="footer-wrapper">
      <router-link v-if="isBindCard && product.type==1" :to="{ name: 'transaction', params: { pid: product.pid, type:'out' }}" class="sell-btn">
        <template v-if="isBindCard">赎回</template>
      </router-link>
      <router-link :to="{ name: 'transaction', params: { pid: product.pid, type:'in' }}" class="buy-btn">
        <template v-if="product.type==1">申购</template>
        <template v-if="product.type==2">预约</template>
      </router-link>
    </div>
  </div>
</template>
<script>
  import { mixin }from '@/utils/mixin'
  export default {
    name     : 'ProductDetail',
    mixins    : [mixin],
    computed : {
      product(){
        return this.$store.getters.getProductById(this.$route.params.pid)
      }
    },
    created(){
//      this.$store.commit('saveToPath', this.$route.fullPath)
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"

  .footer-wrapper
    @extend .fix-bottom
    display flex
    .sell-btn, .buy-btn
      @extend .primary-btn
      flex 1
    .sell-btn
      color secondary-text-color
      background #fff
      flex 1
</style>
