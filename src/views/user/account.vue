<template>
  <div id="account-operate" class="page-with-top-bottom">
    <section>
      <div class="title">请选择{{operateType}}银行卡</div>
      <bank ref="bank" v-on:setSelectedBank="post.bindId=$refs.bank.selectedBindId"></bank>
      <div class="tip">这里是一些说明</div>
    </section>
    <template v-if="type=='in'">
      <section>
        <div class="title">充值金额（元）</div>
        <mt-field class="money-input no-top-line" :class="{'active':post.amount}" label="￥" placeholder="请输入充值金额" type="number" v-model="post.amount">
          <span class="all" @click="post.amount=50000.00">单笔最大充值</span></mt-field>
      </section>
      <input type="button" class="primary-btn fix-bottom" @click="showT=true" :disabled="forbidSubmit" value="立即充值">
    </template>
    <template v-if="type=='out'">
      <section>
        <div class="title">提现金额（元）</div>
        <mt-field class="money-input" :class="{'active':post.amount}" label="￥" v-if="asset.availableAsset>0" placeholder="最小提现金额0.01元" type="number" v-model="post.amount">
          <span class="all" @click="maxOut">全部提现</span>
        </mt-field>
        <mt-cell title="账户余额" :value="asset.availableAsset | toYuan | money | unit('元')"></mt-cell>
        <input type="button" class="primary-btn fix-bottom" @click="showT=true" :disabled="forbidSubmit" value="确认提现">
      </section>
    </template>
    <transaction-input v-if=showT
                       :tInfo="{moneyFrom:'bank', title:'使用银行卡', bankInfo:getSelectedBank, subTitle:operateType+'金额', amount: post.amount, submitting : submitting}"
                       v-on:transactionSubmit="changeAccount"
                       v-on:close="showT=false">
    </transaction-input>
    <result v-if="result.show" :result="result">
      <div slot="footer">
        <input type="button" class="primary-btn" value="确定" @click="$router.push({path:from?from+'?buy-amount='+buyAmount:'/user'})">
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
  import { getQueryString } from '@/utils/common'
  import { BANKS } from '@/utils/config'
  import { fBankCardNo } from '@/utils/filters'
  import Bank from '@/views/user/bank'
  import Result from '@/components/user/result'
  import TransactionInput from '@/components/user/transactionInput'
  import { toCent, toYuan } from '@/utils/filters'
  export default{
    data(){
      return {
        type       : this.$route.params.type,
        from       : null,
        buyAmount : null,
        post       : {
          bindId : null,
          amount : null
        },
        dialog     : null,
        showT      : false,
        submitting : false,
        tag        : 0,
        result     : {
          show    : false,
          title   : '',
          content : '',
          reason  : ''
        }
      }
    },
    components : {
      Bank,
      TransactionInput,
      Result
    },
    computed   : {
      operateType(){
        if (this.type=='in') return '充值'
        if (this.type=='out') return '提现'
      },
      forbidSubmit(){
        if (this.submitting) return true
        return !(this.post.bindId && this.post.amount && this.post.amount > 0)
      },
      getSelectedBank(){
        return this.userInfo.bindCard.find(b => {return b.bindId==this.post.bindId})
      }
    },
    methods    : {
      maxOut(){
        this.post.amount = toYuan(this.asset.availableAsset)
      },
      alert(){
        if (this.post.bindId) return
        this.$message({ message : '请先选择银行卡', duration:0})
      },
      changeAccount(password){
        this.submitting = true
        let post = {
          userID   : this.$store.state.userID,
          amount   : toCent(this.post.amount),
          bindId   : this.post.bindId,
          tradepwd : password
        }
        let _ = this
        let operateType
        if (this.type=='in') operateType = 'rechargeAccount'
        if (this.type=='out') operateType = 'takeoutAccount'

        this.$post(operateType, post,
          {
            showProgress : '数据提交中，请勿重复提交...',
            callback     : {
              success : successCallback,
              error   : errorCallback,
              fail    : failCallback,
              always  : alwaysCallback
            }
          }
        )
        function successCallback(data, msg) {
          _.result = { show : true, title : _.operateType+'结果', content : '恭喜您'+_.operateType+'成功' }
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
        this.dialog = { show : true, title : '操作提示', msg : '您现在还不能进行账户操作，您需要前往<b>我的理财</b>依次进行如下操作：',subMsg:'注册<span class=el-icon-d-arrow-right></span>开户<span class=el-icon-d-arrow-right></span>绑卡' }
        return
      }
      if (!this.isOpenAccount) {
        this.dialog = { show : true, title : '操作提示', msg : '您现在还不能进行账户操作，您需要前往<b>我的理财</b>依次进行如下操作：',subMsg:'开户<span class=el-icon-d-arrow-right></span>绑卡' }
        return
      }
      if (this.bindCard.length==0) {
        this.dialog = { show : true, title : '操作提示', msg : '您现在还不能进行账户操作，您需要前往<b>我的理财</b>进行如下操作：', subMsg:'绑卡' }
        return
      }
      this.from = getQueryString("from")
      if (getQueryString("amount")) this.post.amount = getQueryString("amount")
      if (getQueryString("buy-amount")) this.buyAmount = getQueryString("buy-amount")
    }
  }
</script>

