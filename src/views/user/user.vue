<template>
  <div id="user-home" v-if="assets">
    <section class="account-wrapper">
      <div>资产总额(元)</div>
      <div>{{assets.totalAssets|money}}</div>
      <div>
        <div>{{assets.latelyIncome|money}}<br><span>昨日收益(元)</span></div>
        <div @click="showIncome=!showIncome">{{assets.totalIncome|money}}<br><span>累计收益(元)</span></div>
      </div>
    </section>
    <section v-if="showIncome">
      <router-link :to="{name:'income-record',params:{type:1}}">
        <mt-cell title="活期总收益" is-link>{{assets.currencyAssets.totalIncome|money}}</mt-cell>
      </router-link>
      <router-link :to="{name:'income-record',params:{type:2}}">
        <mt-cell title="定期总收益" is-link>{{assets.periodicAssets.totalIncome|money}}</mt-cell>
      </router-link>
    </section>
    <section>
      <mt-cell title="账户余额" :label="assets.accountAmount|money" id="account">
        <router-link :to="{name: 'account',params:{type: 'out'}}"><span class="balance">提现</span></router-link>
        <router-link :to="{name: 'account',params:{type: 'in'}}"><span class="balance">充值</span></router-link>
      </mt-cell>
      <router-link :to="{name:'transaction-record',params:{type:2}}">
        <mt-cell title="活期资产(元)" is-link>{{assets.currencyAssets.possess|money}}</mt-cell>
      </router-link>
      <router-link :to="{name:'transaction-record',params:{type:3}}">
        <mt-cell title="定期资产(元)" is-link>{{assets.periodicAssets.possess|money}}</mt-cell>
      </router-link>
    </section>
    <section>
      <router-link :to="{name:'bank', params:{id:1}}">
        <mt-cell title="我的银行卡" is-link></mt-cell>
      </router-link>
    </section>
    <section v-if="!isRegister">
      <router-link :to="{name:'register'}">
        <mt-cell title="注册" is-link></mt-cell>
      </router-link>
    </section>
    <section v-if="isRegister">
      <router-link :to="{name:'userSetting'}">
        <mt-cell title="个人信息设置" is-link>已注册</mt-cell>
      </router-link>
    </section>
  </div>
  <div v-else v-loading.body="true" element-loading-text="加载中"></div>

</template>
<script>
  import register from '@/components/user/register'

  const USER_ASSETS = {
    totalAssets    : 1000200.00,
    latelyIncome   : 10.00,
    totalIncome    : 2000.00,
    currencyAssets : { possess : 100.00, totalIncome : 100 },
    periodicAssets : { possess : 20000.00, totalIncome : 1900 },
    accountAmount  : 200
  }

  export default{
    name : 'User',
    data(){
      return {
        assets     : USER_ASSETS,
        showIncome : false
      }
    },
    computed   : {
      isRegister(){
        return this.$store.state.user && this.$store.state.user.userStatus.isRegisterCayx
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
    min-height calc(100vh - 5em)
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
