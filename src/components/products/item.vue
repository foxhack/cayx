<template>
  <div class="p-item-wrapper">
    <router-link :to="{ name: 'productDetail', params: { pid: productItem.pid }}">
      <div class="head">
        <div class="title">{{productItem.name}}</div>
        <div class="buy-btn">查看详情&nbsp;></div>
      </div>
      <div class="main-body">
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
    background #fff
    padding 0.5em 1em
    box-shadow 0 0.2em 0.1em #961717

  .p-item-wrapper:not(:last-child)
    margin-bottom 1em

  .head
    line-height 3em
    position relative
    overflow hidden

  .title
    font-family font-family-bold
    color secondary-text-color
    font-size 1.2em
    float left

  .buy-btn
    float right
    {third-level}

  .head:after
    @extend .hr-line
    color rgba(0,0,0,0.2)

  .main-body
    @extend .center
    height 6em
    .left
      flex 1
      font-family font-family-bold
      color secondary-text-color
      font-size 3em
      position relative
      top -0.3em
    .left:after
      content '7日年化收益率'
      color primary-text-color
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
