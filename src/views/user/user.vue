<template>
  <div id="user-home" v-if="asset">
    <section class="account-wrapper">
      <div>资产总额(元)</div>
      <div>{{asset.totalAsset|money}}</div>
      <div>
        <div>{{asset.yesterdayIncome|money}}<br><span>昨日收益(元)</span></div>
        <div @click="showIncome=!showIncome">{{asset.totalIncome|money}}<br><span>累计收益(元)</span></div>
      </div>
    </section>
    <section v-if="showIncome && asset.detailAsset">
      <div v-for="asset in asset.detailAsset">
        <router-link :to="{name:'income-record',params:{pid:asset.productId}}">
          <mt-cell :title="getProductNameById(asset.productId)" label="累计收益" is-link>{{asset.totalIncome|money}}</mt-cell>
        </router-link>
      </div>
    </section>
    <section>
      <mt-cell title="账户余额" :label="asset.availableAsset|money" id="account">
        <router-link :to="{name: 'account',params:{type: 'out'}}"><span class="balance">提现</span></router-link>
        <router-link :to="{name: 'account',params:{type: 'in'}}"><span class="balance">充值</span></router-link>
      </mt-cell>
      <div v-if="asset.detailAsset && asset.detailAsset.length>0">
        <div v-for="asset in asset.detailAsset">
          <router-link :to="{name:'transaction-record',params:{pid:asset.productId}}">
            <mt-cell :title="getProductNameById(asset.productId)+'(元)'" is-link>{{asset.totalAsset|money}}</mt-cell>
          </router-link>
        </div>
      </div>
      <div v-else>
        <router-link :to="{name:'productList'}">
          <mt-cell title="无资产" is-link>购买直通车</mt-cell>
        </router-link>
      </div>
    </section>
    <section>
      <router-link :to="{name:'bank'}">
        <mt-cell title="我的银行卡" is-link :label="bindCard?bindCard.bankName:''">
          <div v-if="isBindCard">已开户</div>
        </mt-cell>
      </router-link>
    </section>
    <section v-if="!isRegister">
      <router-link :to="{name:'register'}">
        <mt-cell title="注册" is-link></mt-cell>
      </router-link>
    </section>
    <section v-else>
      <router-link :to="{name:'userSetting'}">
        <mt-cell title="个人信息设置" is-link>已注册</mt-cell>
      </router-link>
    </section>
    <section v-if="isRegister">
      <router-link :to="{name:'passwordSetting'}">
        <mt-cell title="管理交易密码" is-link :label="isSetPassword?'已设置':'未设置'">
        </mt-cell>
      </router-link>
    </section>
    <section>
      <mt-cell @click.native="showInstruction=true" title="用户手册" is-link></mt-cell>
      <instruction
          v-if="showInstruction"
          title="用户手册" v-on:closeInstruction="showInstruction=false">
      </instruction>
    </section>
  </div>
  <div v-else v-loading.body="true" element-loading-text="加载中"></div>
</template>
<script>
  import instruction from '@/views/user/instruction'

  export default{
    name       : 'User',
    data(){
      return {
        showInstruction : false,
        showIncome      : false
      }
    },
    components : { instruction },
    computed   : {
      isRegister(){
        return this.$store.state.user && this.$store.state.user.userStatus.isRegisterCayx
      },
      isBindCard(){
        return this.$store.state.user && this.$store.state.user.userStatus.isBindCard
      },
      isSetPassword(){
        return this.$store.state.user && this.$store.state.user.userStatus.isSetPassword
      },
      bindCard(){
        return this.$store.state.user && this.$store.state.user.userInfo && this.$store.state.user.userInfo.bindCard
      },
      asset(){
        return this.$store.state.asset
      }
    },
    methods    : {
      getProductNameById(pid){
        return this.$store.state.products.find(p => {return p.pid==pid}).name
      }
    },
    created(){
      console.log('组件user')
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base.styl"
  #user-home
    min-height calc(100vh - 2.8em)

  .account-wrapper
    padding 2em 0
    background-color secondary-text-color
    color #fff
    text-align center

  .account-wrapper > div:nth-child(1)
    font-size small

  .account-wrapper > div:nth-child(2)
    font-size 2em
    font-family font-family-bold
    margin-bottom 0.5em

  .account-wrapper > div:nth-child(3)
    display flex
    justify-content center

  .account-wrapper > div:nth-child(3) > div
    padding 0 2em
    font-size extra-large

  .account-wrapper > div:nth-child(3) > div span
    font-size extra-extra-small

  .account-wrapper > div:nth-child(3) > div:first-child
    border-right 1px solid

  .balance
    padding 0.2em 1em
    font-size small
    border-radius 1.5em

  #account .mint-cell-value a:nth-of-type(1) .balance
    color secondary-text-color
    border 1px solid
    margin-right 0.4em

  #account .mint-cell-value a:nth-of-type(2) .balance
    background-color secondary-text-color
    color #fff
</style>
