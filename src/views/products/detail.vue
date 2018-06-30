<template>
  <div id="product-detail-wrapper" class="page-with-top-bottom">
    <div class="product-detail-top">
      <div class="bank-logo-wrapper">
        <span class="bank-logo"></span>
        <span class="bank-name">光大银行</span>
      </div>
      <div class="product-main-info-wrapper">
        <section class="figure flex-row">
          <div class="left">
            <span>{{product.rate.averageRate}}</span>
            <span class="cent">%</span>
          </div>
          <div class="right">
            <div class="top flex-row">
              <span style="white-space: nowrap">投入</span>
              <input type="number" class="money-input" v-model="preMoney">元
            </div>
            <div class="bottom flex-row">
              <span>预计到期收益</span>
              <span>{{preIncome|money}}</span>
              <span>元</span>
            </div>
            <!--<div class="ins">5万元起，1000元递增</div>-->
          </div>
        </section>
        <section class="character flex-row">
          <span>5万起投</span>
          <span>低风险</span>
          <span>三个月</span>
          <span>滚动型</span>
        </section>
      </div>
      <time-line :items="timeItems" id="content-1"></time-line>
      <div id="content-2">
        <div>产品特色</div>
        <div style="height: 4em"></div>
      </div>

    </div>
    <el-collapse v-model="activeTag" @change="handleChange">
      <el-collapse-item title="购买须知" name="1">
        <div>内容</div>
      </el-collapse-item>
      <el-collapse-item title="交易规则" name="2">
        <div>内容</div>
      </el-collapse-item>
      <el-collapse-item title="相关示例" name="3">
        <div>内容</div>
      </el-collapse-item>
      <el-collapse-item title="长安提示" name="4">
        <div>内容</div>
      </el-collapse-item>
    </el-collapse>
    <div class="footer-wrapper fix-bottom">
      <div class="buy-btn primary-btn" @click="goNext('in')">
        <template v-if="product.type==1">申购</template>
        <template v-if="product.type==2">预约</template>
      </div>
    </div>
    <el-dialog :visible=showDialog title="风险测评提示" center :show-close="false" class="dialog-wrapper">
      <div>抱歉，您还未进行线下风险测评，不能购买此产品。</div>
      <span slot="footer" class="dialog-footer">
        <div class="primary-btn" @click="showDialog=false">确定</div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { Collapse, CollapseItem } from 'element-ui'
  import TimeLine from '@/components/products/timeLine'
  export default {
    name       : 'ProductDetail',
    data(){
      return {
        showDialog : false,
        activeTag  : ['1', '2', '3'],
        preMoney   : 50000,
//        timeItems:[{title:'2018-7-1',subTitle:'9:30-15:00购买当日起息'},{title:'2018-7-2至2018-9-30',subTitle:'预约赎回'},{title:'2018-10-1',subTitle:'收益到账，赎回本金或自动进入下一期'}]
        timeItems:[{title:'2018-10-1',subTitle:'购买'},{title:'2018-10-8',subTitle:'起息'},{title:'2018-10-9至2019-1-7',subTitle:'预约赎回'},{title:'2019-1-8',subTitle:'收益到账，赎回本金或自动进入下一期'}]
      }
    },
    components : {
      'el-collapse'      : Collapse,
      'el-collapse-item' : CollapseItem,
      TimeLine
    },
    computed   : {
      product(){
        return this.$store.getters.getProductById(this.$route.params.pid)
      },
      productAsset(){
        let productAsset = this.asset.detailAsset.find(a => {return a.productId==this.$route.params.pid})
        if (productAsset && productAsset.totalAsset > 0) {
          return productAsset.totalAsset
        } else {
          return 0
        }
      },
      preIncome(){
        return (this.preMoney*this.product.rate.averageRate*90/360)*0.01
      }
    },
    methods    : {
      handleChange(){},
      goNext(){
        if (this.isRiskAppraisal) {
          this.$router.push({ name : 'transaction', params : { pid : this.product.pid} })
        } else {
          this.showDialog = true
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"
  section
    margin-bottom 0

  .product-detail-top
    position relative
    .bank-logo-wrapper
      position absolute
      left 0
      top 0
      .bank-logo
        width 2em
        height 2em
        float left
      .bank-name
        display inline-block
        line-height 2em

  .product-main-info-wrapper
    width 100%
    background #E0EAFC /* fallback for old browsers */
    background -webkit-linear-gradient(to left, #CFDEF3, #E0EAFC) /* Chrome 10-25, Safari 5.1-6 */
    background linear-gradient(to left, #CFDEF3, #E0EAFC) /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    padding 2em 10px 10px 10px
    section.figure
      .left, .right
        flex 1
        color secondary-dark-color
      .left
        border-right 1px solid
        font-size 2.4em
        position relative
        font-family font-family-bold
        text-align center
        display flex
        justify-content center
        align-items baseline
        span.cent
          font-size 18px
      .left:after
        content '预期年化收益率'
        font-family font-family-light
        font-size 13px
        position absolute
        bottom 0.8em
        {second-level}
      .right
        padding 10px
        .top
          border-bottom 1px solid
          align-items flex-end
          .money-input
            opacity 1
            background transparent
            color primary-text-color
            text-align center
            font-size extra-extra-large
        .bottom
          margin-top 0.6em
          font-size 13px
          justify-content space-between
          align-items center
          span:nth-of-type(2)
            font-size 140%
            color primary-text-color
        .ins
          font-size 12px
          color gray
    section.character
      font-size extra-small
      margin-top 0.4em
      span
        margin-left 10px
        border 1px solid
        padding 0px 2px
        border-radius 0.4em

  .footer-wrapper
    display flex
    .sell-btn, .buy-btn
      flex 1
    .sell-btn
      color secondary-text-color
      background #fff
      flex 1
   #content-1
    padding 20px 10px
    background extra-light-gray
   #content-2
    margin 20px 10px 0 10px

</style>
