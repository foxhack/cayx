<template>
  <div class="p-item-wrapper">
    <router-link :to="{ name: 'productDetail', params: { pid: productItem.pid }}">
      <div class="head arrow-right">
        <div class="title">{{productItem.name}}</div>
        <div class="buy-btn"><span>光大银行</span></div>
      </div>
      <div class="main-body center top-line">
        <div class="left">{{productItem.rate.averageRate}}<span class="cent">%</span></div>
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
    padding 0.5em 1em
    /*box-shadow 0 0.2em 0.1em secondary-dark-color*/
    border 1px solid light-silver
    background rgba(255,255,255,0.8)

  .p-item-wrapper:not(:last-child)
    margin-bottom 1em

  .head
    line-height 3em
    position relative
    overflow hidden
    color primary-text-color

  .title
    font-family font-family-bold
    color striking-text-color
    font-size 1.2em
    float left

  .buy-btn
    float right
    margin-right 2em
    {third-level}
    span
      background primary-text-color
      color white
      border-radius 0.2em
      padding 2px 4px

  .main-body
    height 6em
    position relative
    .left
      flex 1
      font-family font-family-bold
      color striking-text-color
      font-size 3em
      position relative
      top -0.3em
    .left:after
      content '预期年化收益率'
      font-family font-family-light
      font-size 13px
      position absolute
      left 0
      bottom -0.6em
      {second-level}

    .right
      flex 1
      {second-level}
      list-style none
      text-align right
      margin-right 2em
      font-size small
      color primary-text-color
  span.cent
    font-size 18px
</style>
