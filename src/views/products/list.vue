<template>
  <div class="page-with-menu">
    <div class="product-list-wrapper">
      <product-item v-for="productItem in productList" :key="productItem.pid" :productItem="productItem"></product-item>
      <!--<p class="more">更多产品&nbsp;&nbsp;敬请期待</p>-->
    </div>
  </div>
</template>
<script>
  import ProductItem from '@/components/products/item'

  export default {
    name       : 'ProductList',
    components : { ProductItem },
    created(){
      console.log('组件productlist')
    }
  }
</script>
<style lang="stylus">
  @import "../../style/base"
  .product-list-wrapper
    padding 0.2rem

  .more
    position absolute
    font-size extra-small
    color light-silver
    bottom 4.4em
    left 50%
    transform translateX(-50%)
</style>
