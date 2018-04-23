<template>
  <div class="product-list-wrapper">
    <div v-if="productList">
      <product-item v-for="productItem in productList" :key="productItem.pid" :productItem="productItem"></product-item>
      <p class="more">更多产品&nbsp;&nbsp;敬请期待</p>
    </div>
    <div v-else v-loading.body="true" element-loading-text="加载中"></div>
  </div>
</template>
<script>
  import{ getProductsRate } from '@/api/product'
  import { fetchData } from '@/utils/common.js'
  import ProductItem from '@/components/products/item'
  export default {
    name       : 'ProductList',
    components : { ProductItem },
    computed:{
      productList(){
        return this.$store.getters.productsWithRate
      }
    },
    created(){
      console.log('组件productlist')
    }
  }
</script>
<style lang="stylus">
  @import "../../style/base"
  .product-list-wrapper
    padding 0.2rem
    background #af2d2d
    min-height calc(100vh - 5.4em + 4px)

  .more
    color #fff
    text-align center
</style>
