<template>
  <div class="p-item-wrapper">
    <router-link :to="{ name: 'productDetail', params: { pid: productItem.pid }}">
      <div class="head arrow-right">
        <div class="title">{{productItem.name}}</div>
        <div class="buy-btn">查看详情</div>
      </div>
      <div class="main-body center top-line">
        <div class="left">{{productItem.rate.averageRate}}%</div>
        <div class="right">
          <li v-for="tag in productItem.tags">{{tag}}</li>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
  export default {
    name:'ProductItem',
    props:['productItem']
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"

  .p-item-wrapper
    height 10em
    border-radius 0.2em
    background linear-gradient(left, primary-light-color, primary-deep-color)
    padding 0.5em 1em
    box-shadow 0 0.2em 0.1em primary-deep-color
    color white

  .p-item-wrapper:not(:last-child)
    margin-bottom 1em

  .head
    line-height 3em
    position relative
    overflow hidden
    color white

  .title
    font-family font-family-bold
    color secondary-text-color
    font-size 1.2em
    float left

  .buy-btn
    float right
    margin-right 1em
    {third-level}

  .main-body
    height 6em
    position relative
    .left
      flex 1
      font-family font-family-bold
      color secondary-text-color
      font-size 3em
      position relative
      top -0.3em
    .left:after
      content '7日年化收益率'
      font-family font-family-light
      font-size 0.3em
      position absolute
      left 0
      bottom -1em
      {second-level}

    .right
      flex 1
      {second-level}
      list-style none

</style>
