<template>
  <div class="trans-card-wrapper">
    <div class="header flex-row bottom-line">
      <div class="left">{{transaction.productName}}</div>
      <div class="right">{{transaction.averageRate}}%</div>
    </div>
    <div class="main flex-col">
      <div class="line-1 flex-row">
        <span>{{transaction.name}}</span>
        <span>{{transaction.amount|money}}元</span>
      </div>
      <div class="line-2 flex-row">
        <span v-if="transaction.beginType">{{transaction.beginType}}：{{transaction.beginDate}}</span>
        <span v-if="transaction.endType">{{transaction.endType}}：{{transaction.endDate}}</span>
      </div>
      <div class="line-3 flex-row" v-if="transaction.error">
        <span class="el-icon-error"></span>
        <span class="error-tip">{{transaction.error.type}}：{{transaction.error.msg}}</span>
      </div>
    </div>
    <div class="footer flex-row top-line">
      <div class="left">交易流水&nbsp;12222223332400</div>
      <slot name="operate"></slot>
    </div>
  </div>
</template>
<script>
  export default{
    name  : 'TransactionCard',
    props : ['transaction']
  }
</script>
<style lang="stylus" scoped>
  @import '../../style/base.styl'

  .trans-card-wrapper
    color primary-dark-color
    background white
    font-size small
    padding 10px 10px 0 10px
    margin-bottom 5px
    .header, .footer
      position relative
      min-height 3em
      align-items center
      color secondary-dark-color
    .header, .footer, .main > .line-1, .main > .line-2
      justify-content space-between
    .main
      min-height 5em
      justify-content space-around
      .line-2
        font-size extra-extra-small
        color neutral-text-color2
    .footer .left
      font-size extra-small
      color neutral-text-color4
  .el-icon-error
    font-size extra-extra-small
    color error-color
    line-height inherit
</style>
