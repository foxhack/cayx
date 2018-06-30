<template>
  <div class="page-with-top">
    <div class="assets-summary flex-row">
      <div>
        <div>持有资产（元）</div>
        <div></div>
        100000.00
      </div>
      <div>
        <div>待收利息（元）</div>
        <div></div>
        200.00
      </div>
      <div>
        <div>累计收益（元）</div>
        <div>500.00</div>
      </div>
    </div>
    <div class="tab-section flex-row">
      <div :class="{active:currentTab==1}" @click="currentTab=1">持有中</div>
      <div :class="{active:currentTab==2}" @click="changeTab(2)">购买中</div>
      <div :class="{active:currentTab==3}" @click="changeTab(3)">已赎回</div>
    </div>
    <mt-loadmore>
      <div v-infinite-scroll="generateMock"
           infinite-scroll-disabled="loadMore"
           infinite-scroll-distance="10">
        <template v-if="this.currentTab==1">
          <template v-for="r in random[0]">
            <transaction-card :transaction="r">
              <template slot="operate">
                <div class="operate-btn">预约赎回</div>
              </template>
            </transaction-card>
          </template>
        </template>
        <template v-if="this.currentTab==2">
          <template v-for="r in random[1]">
            <transaction-card :transaction="r">
              <template slot="operate">
                <div class="operate-btn">取消购买</div>
              </template>
            </transaction-card>
          </template>
        </template>
        <template v-if="this.currentTab==3">
          <template v-for="r in random[2]">
            <transaction-card :transaction="r">
              <template slot="operate"></template>
            </transaction-card>
          </template>
        </template>
        <mt-spinner type="fading-circle" color="#C49A16" v-show="loadMore"></mt-spinner>
      </div>
    </mt-loadmore>
  </div>
</template>
<script>
  import { Spinner, Loadmore } from 'mint-ui'
  import TransactionCard from '@/components/user/transactionCard'
  export default{
    data(){
      return {
        loadMore   : false,
        topStatus  : '',
        random     : [[], [], []],
        currentTab : 1,
      }
    },
    components : {
      'mt-spinner'  : Spinner,
      'mt-loadmore' : Loadmore,
      TransactionCard
    },
    methods    : {
      changeTab(tab){
        this.currentTab = tab
        if (this.random[tab-1].length==0) this.generateMock()
      },
      generateMock(){
        this.loadMore = true
        let random = []
        let name = this.currentTab==3 ? '赎回金额' : '购买金额'

        for (let n = 0; n < 20; n++) {
          random.push({
            productName : '季季盈1号第'+n+'期',
            name        : name,
            averageRate : 4.95,
            beginType   : '起息日',
            beginDate   : '2018年1月'+(n+1)+'日',
            endType     : '到期日',
            endDate     : '2018年4月'+(n+1)+'日',
            amount      : (Math.random(0, 1)*10000),
           // error:{type:'购买失败', msg:'账户余额不足'}
          })
        }
        setTimeout(() => {
          this.random[this.currentTab-1] = this.random[this.currentTab-1].concat(random)
          this.loadMore = false
        }, 1000)
      }
    },
    watch      : {
      '$route' : 'generateMock'
    },
    created(){
      this.generateMock()
    }
  }

</script>
<style lang="stylus" scoped>
  @import "../../style/base.styl"
  span.rotate
    transform rotate(180deg)

  .assets-summary
    background striking-text-color
    font-size extra-extra-small
    padding 10px 0

  .assets-summary > div
    color white
    flex 1
    text-align center

  .assets-summary > div:nth-child(2), .assets-summary > div:nth-child(3)
    border-left 1px solid

  .tab-section
    padding-top 10px
    background white

  .tab-section > div
    flex 1
    text-align center
    color striking-text-color

  .tab-section > div.active
    border-bottom 2px solid
    color primary-text-color

  .operate-btn
    font-size small
    border 1px solid
    color primary-text-color
    border-radius 1em
    padding 2px 8px

</style>
