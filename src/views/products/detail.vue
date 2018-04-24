<template>
    <div class="product-detail-wrapper" v-if="product">
      <div class="miss">图表</div>
      <div>{{product.rate.rates7Day}}{{product.rate.incomePerUnit}}</div>
      <div class="miss">产品介绍</div>
      <div v-if="bindBank" class="footer-wrapper">
        <router-link :to="{ name: 'transaction', params: { pid: product.pid, type:'out' }}" class="sell-btn">转出</router-link>
        <router-link :to="{ name: 'transaction', params: { pid: product.pid, type:'in' }}" class="buy-btn">转入</router-link>
      </div>
      <template v-else>
        <router-link :to="{ name: 'bank'}" class="primary-btn fix-bottom">立即购买</router-link>
      </template>
    </div>
    <div v-else v-loading.body="true" element-loading-text="加载中">
    </div>
</template>
<script>
  import { getProductsRate } from '@/api/product'
  import { fetchData } from '@/utils/common.js'
  export default {
    name     : 'ProductDetail',
    computed : {
      bindBank(){
        return this.$store.state.user && this.$store.state.user.userStatus.isBindCard
      },
      product(){
        return this.$store.getters.getProductById(this.$route.params.pid)
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"
  .product-detail-wrapper
    min-height 100vh
    padding-bottom 2em

  .footer-wrapper
    @extend .fix-bottom
    display flex
    .sell-btn, .buy-btn
      @extend .primary-btn
    .sell-btn
      color secondary-text-color
      background #fff
</style>
