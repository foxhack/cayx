<template>
  <div id="product-detail-wrapper" class="page-with-top-bottom">
    <div class="tab-container flex-row">
      <div class="tab-item" :class="{active:chartIndex==0}" @click="chartIndex=0">7日年化</div>
      <div class="tab-item" :class="{active:chartIndex==1}" @click="chartIndex=1">每日收益</div>
    </div>
    <canvas class="chart" v-show="chartIndex==0"></canvas>
    <canvas class="chart" v-show="chartIndex==1"></canvas>
      <div class="miss">产品介绍</div>
      <div class="footer-wrapper fix-bottom">
        <div class="sell-btn primary-btn" v-if="product.type==1 && productAsset>0" @click="goNext('out')">赎回</div>
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
  export default {
    name     : 'ProductDetail',
    data(){
      return {
        chartIndex  : 0,
        showDialog : false
      }
    },
    computed : {
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
      }
    },
    methods  : {
      goNext(type){
        if (this.isRiskAppraisal) {
          this.$router.push({ name : 'transaction', params : { pid : this.product.pid, type : type } })
        } else {
          this.showDialog = true
        }
      },
      generateCharts(){
        let chartOption={
          data:[
            {
              labels   : ["5-1", "5-2", "5-3", "5-4", "5-5", "5-6", "5-7"],
              datasets : [
                {
                  label : "近7日年化收益率%",
                  data  : this.product.rate.rates7Day
                }
              ]
            },
            {
              labels   : ["5-1", "5-2", "5-3", "5-4", "5-5", "5-6", "5-7"],
              datasets : [
                {
                  label : "近7日收益(元)",
                  data  : this.product.rate.incomePerUnit
                }
              ]
            }
          ],
          option:
            {
              tooltips : {
                intersect : false,
                mode      : 'nearest'
              },
              elements : {
                line  : {
                  borderColor     : "rgba(244,85,0,1)",
                  backgroundColor : "rgba(244,85,0,0.2)",
                  borderWidth     : 1
                },
                point : {
                  radius          : 2,
                  backgroundColor : 'rgba(244,85,0,1)'
                }
              }
            }
        }
        new Chart(document.getElementsByClassName("chart")[0].getContext("2d"),
          {
            type    : 'line',
            data    : chartOption.data[0],
            options : chartOption.option
          }
        )
        new Chart(document.getElementsByClassName("chart")[1].getContext("2d"),
          {
            type    : 'line',
            data    : chartOption.data[1],
            options : chartOption.option
          }
        )
      }
    },
    mounted(){
      this.generateCharts()
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"
  .tab-container
    padding 10px
    align-items center
    .tab-item
      flex 1
      text-align center
    .tab-item.active
      color secondary-text-color
      border-bottom 2px solid

  #chart
    width 100vw
    height 15em

  .footer-wrapper
    display flex
    .sell-btn, .buy-btn
      flex 1
    .sell-btn
      color secondary-text-color
      background #fff
      flex 1
</style>
