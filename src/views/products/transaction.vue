<template>
  <div id="transaction" class="page-with-top-bottom">
    <section>
      <div class="title">产品名称</div>
      <mt-cell class="no-top-line" :title="productName"></mt-cell>
    </section>
    <section>
      <div class="title">{{transactionName}}途径</div>
      <mt-cell
          title="账户余额"
          class="bank no-top-line selected"
          :label="asset.availableAsset|toYuan|money|unit('元')">
      </mt-cell>
    </section>
    <section>
      <div class="title">交易规则</div>
      <div>这里是交易规则</div>
    </section>
    <section>
      <div class="title">{{transactionName}}金额</div>
      <mt-field class='money-input no-top-line' label="￥" :class="{'active':post.amount}" type="tel" placeholder="5万元起，1000元递增" v-model="post.amount">
        <span v-if="asset.availableAsset>0" class="all" @click="maxIn">全部余额买入</span>
      </mt-field>
      <div v-if="errMsg" class="error-tip"><span class="el-icon-warning"></span>&nbsp;{{errMsg}}</div>
      <input type="button" class="primary-btn fix-bottom" :disabled="!canBuy" :value="'确定'+transactionName" @click="showT=true">
    </section>
    <section v-if="outBuyRange">
      <mt-cell title="余额不足">需要充值{{outBuyRange|money|unit('元')}}
      </mt-cell>
      <input type="button"
             class="primary-btn fix-bottom"
             @click="$router.push('/user/account/in?from='+currentPath+'&amount='+outBuyRange+'&buy-amount='+post.amount)"
             value="去充值">
    </section>
    <transaction-input v-if=showT :tInfo="{moneyFrom:'account', title:transactionName+'产品', productName: productName, amount: post.amount, submitting : submitting}"
                       v-on:transactionSubmit="submitTransaction"
                       v-on:close="showT=false">
    </transaction-input>
    <result v-if="result.show" :result="result">
      <div slot="footer">
        <input type="button" class="primary-btn" value="确定" @click="$router.replace({path:'/product/'+$route.params.pid})">
      </div>
    </result>
    <template v-if="dialog">
      <el-dialog :visible=dialog.show :title="dialog.title" center :show-close="false" class="dialog-wrapper">
        <div class="d-msg" v-html="dialog.msg"></div>
        <div class="d-sub-msg" v-html="dialog.subMsg"></div>
        <span slot="footer" class="dialog-footer">
        <router-link :to="{path:'/user'}"><div class="primary-btn">确定</div></router-link>
      </span>
      </el-dialog>
    </template>
  </div>
</template>
<script>
  import Result from '@/components/user/result'
  import TransactionInput from '@/components/user/transactionInput'
  import { toCent, toYuan } from '@/utils/filters'
  import { getQueryString } from '@/utils/common'

  export default{
    data(){
      return {
        submitting : false,
        showT      : false,
        post       : {
          pid    : this.$route.params.pid,
          amount : null,
        },
        dialog     : null,
        result     : {
          show    : false,
          title   : '',
          content : '',
          reason  : ''
        }
      }
    },
    components : { TransactionInput, Result },
    computed   : {
      productName(){
        return this.productList.find(p => {return p.pid==this.$route.params.pid}).name
      },
      transactionName(){
        let pType = this.$store.getters.getProductById(this.$route.params.pid).type
        if (pType==1) return '申购'
        if (pType==2) return '购买'
      },
      outBuyRange(){
        if(this.errMsg) return
        if (this.post.amount && this.post.amount > 0 && parseFloat(this.post.amount) > toYuan(this.asset.availableAsset))
          return (parseFloat(this.post.amount)-toYuan(this.asset.availableAsset)).toFixed(2)

      },
      canBuy(){
        return this.post.amount && this.post.amount > 0 && !this.outBuyRange
      },
      errMsg(){
        if (this.post.amount && (this.post.amount < 50000 || this.post.amount%1000!=0)) {
          return '最小金额5万元起，1000元递增'
        } else {
          ''
        }
      }
    },
    methods    : {
      maxIn(){
        this.post.amount = toYuan(this.asset.availableAsset)
      },
      submitTransaction(password){
        let post = {
          userID   : this.$store.state.userID,
          pid      : this.post.pid,
          amount   : toCent(this.post.amount),
          tradepwd : password,
        }
        this.submitting = true
        this.$post('buyAsset', post, {
          showProgress : '数据提交中，请勿重复提交...',
          callback     : {
            success : successCallback,
            error   : errorCallback,
            fail    : failCallback,
            always  : alwaysCallback
          }
        })
        let _ = this

        function successCallback(data, msg) {
          _.result = { show : true, type    : 'success', title : _.transactionName+'结果', content : '恭喜您'+_.transactionName+'成功' }
          _.$store.commit('setAsset', data)
        }

        function errorCallback(data, msg) {
          _.result.title = '对不起，操作失败了！'
          _.result.information = msg
        }

        function failCallback() {
          _.result.title = '对不起，操作失败了！'
          _.result.information = '服务器没有响应。'
        }

        function alwaysCallback() {
          _.showT = false
          _.submitting = false
          _.result.show = true
        }
      }
    },
    created(){
      if (!this.isRegister) {
        this.dialog = { show : true, title : '操作提示', msg : '您现在还不能进行操作，您需要前往<b>我的理财</b>进行如下操作：', subMsg : '注册<span class=el-icon-d-arrow-right></span>申请开户<span class=el-icon-d-arrow-right></span>绑卡<span class=el-icon-d-arrow-right></span>账户充值' }
        return
      }
      if (!this.isOpenAccount) {
        this.dialog = { show : true, title : '操作提示', msg : '您现在还不能进行操作，您需要前往<b>我的理财</b>进行如下操作：', subMsg : '申请开户<span class=el-icon-d-arrow-right></span>绑卡<span class=el-icon-d-arrow-right></span>账户充值' }
        return
      }
      if (this.bindCard.length==0 && this.asset.availableAsset==0) {
        this.dialog = { show : true, title : '操作提示', msg : '您现在还不能进行操作，您需要前往<b>我的理财</b>进行如下操作：', subMsg : '我的银行卡<span class=el-icon-d-arrow-right></span>绑卡<span class=el-icon-d-arrow-right></span>账户充值' }
        return
      }
      if (this.asset.availableAsset==0) {
        this.dialog = { show : true, title : '操作提示', msg : '您的账户余额不足，您需要前往<b>我的理财</b>进行如下操作：', subMsg : '账户充值' }
        return
      }
      if (getQueryString("buy-amount")) this.post.amount = getQueryString("buy-amount")
    }
  }
</script>
<style lang="stylus" scoped>
  @import '../../style/base.styl'

  .other
    color secondary-text-color
    line-height 4em
    text-align right
    font-size 0.8em
    span
      display inline-block
      line-height 4em
      padding-right 10px

  .money-input input
    font-size 1.7em

</style>
