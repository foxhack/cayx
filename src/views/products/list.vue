<template>
  <div class="product-list-wrapper">
    <div>
      <product-item v-for="productItem in productList" :key="productItem.pid" :productItem="productItem"></product-item>
      <p class="more">更多产品&nbsp;&nbsp;敬请期待</p>
    </div>
  </div>
</template>
<script>
  import{ getProductsRate } from '@/api/product'
  import ProductItem from '@/components/products/item'
  import { mixin }from '@/utils/mixin'

  export default {
    name       : 'ProductList',
    components : { ProductItem },
    mixins     : [mixin],
    created(){
      console.log('组件productlist')
    }
  }
</script>
<style lang="stylus">
  @import "../../style/base"
  .product-list-wrapper
    overflow-y auto
    padding 0.2rem
    background #af2d2d

  .more
    color #fff
    text-align center
</style>
