<template>
  <div id="user-home" class="page-with-menu">
    <div class="blank"></div>
    <section v-if="isRegister" class="account-wrapper center">
      <div class="top-part1 center">
        <div>
          <div>
            资产总额(元)&nbsp;
            <svg slot="icon" class="icon zichan" aria-hidden="true" @click="showAsset=!showAsset">
              <use xlink:href="#icon-03zichanxianshifuzhi" v-show="showAsset"></use>
              <use xlink:href="#icon-03zichanbuxianshifuzhi" v-show="!showAsset"></use>
            </svg>
          </div>
        </div>
        <div>{{asset.totalAsset|toYuan|money|mask(showAsset)}}</div>
      </div>
      <div class="top-part2 center">
        <div>{{asset.yesterdayIncome|toYuan|money|mask(showAsset)}}<br><span>昨日收益(元)</span></div>
        <div @click="showIncome=!showIncome">{{asset.totalIncome|toYuan|money|mask(showAsset)}}<br><span>累计收益(元)</span></div>
      </div>
    </section>
    <section v-else class="no-register center">
      <svg class="icon avatar" aria-hidden="true">
        <use xlink:href="#icon-zhuanjifenxinzhuce"></use>
      </svg>
      <div class="register-btn" @click="$router.push('/user/register')">注册</div>
    </section>
    <transition name="slide-in">
      <section v-if="showIncome && asset.detailAsset">
        <div v-for="asset in asset.detailAsset" :key="asset.productId">
          <router-link :to="{name:'income-record',params:{pid:asset.productId}}">
            <mt-cell :title="getProductNameById(asset.productId)" label="累计收益" is-link>{{asset.totalIncome|toYuan|money|mask(showAsset)}}</mt-cell>
          </router-link>
        </div>
      </section>
    </transition>
    <section>
      <mt-cell title="账户余额" :label="asset.availableAsset|toYuan|money|mask(showAsset)" id="account">
        <svg slot="icon" class="icon" aria-hidden="true">
          <use xlink:href="#icon-money-"></use>
        </svg>
        <template v-if="isOpenAccount">
          <a><span class="balance" @click="checkAccount('out')">提现</span></a>
          <a><span class="balance" @click="checkAccount('in')">充值</span></a>
        </template>
        <template v-else>
          <a><span class="balance" @click="checkOpenAccount">申请开户</span></a>
        </template>
      </mt-cell>
      <div v-if="asset.detailAsset && asset.detailAsset.length>0">
        <div v-for="asset in asset.detailAsset">
          <router-link :to="{name:'transaction-record',params:{pid:asset.productId}}">
            <mt-cell :title="getProductNameById(asset.productId)" is-link class="no-top-line">{{asset.totalAsset|toYuan|money|mask(showAsset)}}</mt-cell>
          </router-link>
        </div>
      </div>
      <div v-else>
        <router-link :to="{name:'productList'}">
          <mt-cell title="无资产" is-link>
            <svg slot="icon" class="icon" aria-hidden="true">
              <use xlink:href="#icon-zichanmingxi"></use>
            </svg>
            购买直通车
          </mt-cell>
        </router-link>
      </div>
    </section>
    <section>
      <mt-cell title="我的银行卡" is-link @click.native="checkBindCard">
        <svg slot="icon" class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinxingqia"></use>
        </svg>
        <div v-if="bindCard.length>0">已绑卡</div>
        <div v-if="bindCard.length==0">未绑卡</div>
      </mt-cell>
    </section>
    <section v-if="isRegister">
      <router-link :to="{name:'userSetting'}">
        <mt-cell title="个人信息设置" is-link>已注册
          <svg slot="icon" class="icon" aria-hidden="true">
            <use xlink:href="#icon-yonghu"></use>
          </svg>
        </mt-cell>
      </router-link>
    </section>
    <section v-if="isOpenAccount">
      <router-link :to="{name:'passwordSetting',params:{type:1}}">
        <mt-cell title="交易密码" is-link :label="isSetPassword?'已设置':'未设置'">
          <svg slot="icon" class="icon" aria-hidden="true">
            <use xlink:href="#icon-zhucedenglumima"></use>
          </svg>
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
</template>
<script>
  import instruction from '@/views/user/instruction'
  export default{
    name       : 'User',
    data(){
      return {
        showAsset       : window.localStorage.getItem('showAsset') ? JSON.parse(window.localStorage.getItem('showAsset')) : true,
        showInstruction : false,
        showIncome      : false
      }
    },
    components : { instruction },
    watch      : {
      showAsset(val){
        window.localStorage.setItem('showAsset', val)
      }
    },
    filters    : {
      mask(value, showAsset){
        return showAsset ? value : '****'
      }
    },
    methods    : {
      getProductNameById(pid){
        return this.$store.state.products.find(p => {return p.pid==pid}).name
      },
      checkBindCard(){
        if (!this.isOpenAccount) {
          this.$message('您未开户，不能绑卡，请您先申请开户。')
        } else {
          this.$router.push({ name : 'bank' })
        }
      },
      checkOpenAccount(){
        if (!this.isRegister) {
          this.$message('您未注册，不能开户，请您先进行注册。')
        } else {
          this.$router.push({ name : 'openAccount' })
        }
      },
      checkAccount(type){
        if (this.bindCard.length==0) {
          this.$message('您未绑卡，不能操作，请您先在-我的银行卡-进行绑卡。')
        } else {
          this.$router.push({name: 'account',params:{type:type}})
        }
      }
    },
    created(){
      console.log('组件user')
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base.styl"
  .account-wrapper, .no-register
    margin-bottom 0
    padding 2em 0
    background-color secondary-text-color
    color #fff
    flex-direction column
    height 12em
    position absolute
    top 0
    width 100%
    z-index 1001

  .blank
    height 12em

  .top-part1, .top-part2
    flex 1
    text-align center

  .top-part1
    flex-direction column
    margin-bottom 1em

  .top-part1 > div:nth-child(1)
    font-size small
    margin-right -2.6em

  .top-part1 > div:nth-child(2)
    font-size 2em
    font-family font-family-bold

  .top-part2 > div
    padding 0 1em
    font-size extra-large

  .top-part2 > div span
    font-size extra-extra-small

  .top-part2 > div:first-child
    border-right 1px solid

  .balance
    padding 0.2em 1em
    font-size small
    border-radius 1.5em

  #account .mint-cell-value a:nth-of-type(1) .balance
    color striking-text-color
    border 1px solid
    margin-right 0.4em

  #account .mint-cell-value a:nth-of-type(2) .balance
    background-color striking-text-color
    color white

  .icon
    vertical-align calc(1em - 24px)
    width 24px
    height 24px

  .icon.zichan
    fill white
    width 1.6em
    height 1.6em
    top 0

  .avatar
    margin-top 1em
    width 3.4em
    height 3.4em
    fill white

  .register-btn
    margin-top 1em
    border-radius 1em
    font-size 1.2em
    padding 0 1em
    border 2px solid

  .slide-in-enter, .slide-in-leave-to
    opacity 0
    margin-top -7em

  .slide-in-enter-active, .slide-in-leave-active
    transition: all .5s ease


</style>
