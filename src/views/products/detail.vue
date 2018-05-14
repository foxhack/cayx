<template>
  <div id="product-detail-wrapper" class="page-with-top-bottom">
    <canvas id="chart"></canvas>
    <!--<div>{{product.rate.rates7Day}}{{product.rate.incomePerUnit}}</div>-->
    <div class="miss">产品介绍</div>
    <div class="footer-wrapper fix-bottom">
      <div class="sell-btn primary-btn" v-if="product.type==1 && productAsset>0" @click="$router.push({ name: 'transaction', params: { pid: product.pid, type:'out' }})">赎回</div>
      <div class="buy-btn primary-btn" @click="$router.push({ name: 'transaction', params: { pid: product.pid, type:'in' }})">
        <template v-if="product.type==1">申购</template>
        <template v-if="product.type==2">预约</template>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name     : 'ProductDetail',
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
    mounted(){
      let data = {
        labels   : ["5-1", "5-2", "5-3", "5-4", "5-5", "5-6", "5-7"],
        datasets : [
          {
            label : "近7日年化收益率%",
            data  : this.product.rate.rates7Day
          }
        ]
      }
      let options = {
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

      new Chart(document.getElementById("chart").getContext("2d"),
        {
          type    : 'line',
          data    : data,
          options : options
        }
      )
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"
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
