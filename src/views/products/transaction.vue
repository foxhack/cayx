<template>
  <div id="transaction" class="page-with-top-bottom">
    <div v-if="isBindCard">
      <div v-if="this.$route.params.type=='in'">
        <section>
          <div class="title">{{transactionName}}途径</div>
          <mt-cell
              :title="bindCard.bankName"
              :label="'尾号'+bindCard.bankCardNo+'  单笔限额X，每日限额X'"
              @click.native="post.account='bindAccount'"
              class="bank"
              :class="{'selected':post.account=='bindAccount'}">
          </mt-cell>
          <mt-cell
              v-if="asset.availableAsset>0"
              title="账户余额"
              @click.native="post.account='elecAccount'"
              class="bank"
              :class="{'selected':post.account=='elecAccount'}"
              :label="asset.availableAsset|toYuan|money|unit('元')">
          </mt-cell>
        </section>
        <section>
          <div class="title">{{transactionName}}金额</div>
          <mt-field class='money-input' label="￥" type="number" placeholder="0.01元起购" v-model="post.amount">
            <span v-if="post.account=='elecAccount' && asset.availableAsset>0" class="all" @click="maxIn">全部余额买入</span>
          </mt-field>
          <input type="button" class="primary-btn fix-bottom" :disabled="!post.amount || !post.account" :value="'确定'+transactionName" @click="showT=true">
        </section>
      </div>
      <div v-if="this.$route.params.type=='out'">
        <section>
          <div class="title">{{transactionName}}金额</div>
          <mt-field class='money-input' label="￥" type="number" :placeholder="'最小'+transactionName+'金额0.01元'" v-model="post.amount">
            <span class="all" @click="maxOut">全部{{transactionName}}</span>
          </mt-field>
          <mt-cell title="持有金额">{{productAsset|toYuan|money|unit('元')}}</mt-cell>
          <input type="button" class="primary-btn fix-bottom" :disabled="!post.amount || !post.account" :value="'确定'+transactionName" @click="showT=true">
        </section>
        <section>
          <div class="title">{{transactionName}}说明</div>
        </section>
      </div>
      <transaction-input v-if=showT :tInfo="{title: transactionTitle, amount: post.amount, submitting : submitting}"
                         v-on:transactionSubmit="submitTransaction"
                         v-on:close="showT=false">
      </transaction-input>
      <result v-if="result.show" :result="result">
        <div slot="footer">
          <input type="button" class="primary-btn" value="确定" @click="$router.replace({path:'/product/'+$route.params.pid})">
        </div>
      </result>
    </div>
    <div v-else>
      <bank></bank>
    </div>
  </div>
</template>
<script>
  import Bank from '@/views/user/bank'
  import Result from '@/components/user/result'
  import TransactionInput from '@/components/user/transactionInput'
  import { toCent, toYuan } from '@/utils/filters'
  import { api } from '@/api/api'

  export default{
    data(){
      return {
        submitting : false,
        showT      : false,
        post       : {
          pid     : this.$route.params.pid,
          type    : this.$route.params.type,
          amount  : null,
          account : 'elecAccount',
        },
        result     : {
          show    : false,
          title   : '',
          content : '',
          reason  : ''
        }
      }
    },
    components : { Bank, TransactionInput, Result },
    computed   : {
      productAsset(){
        let productAsset = this.asset.detailAsset.find(a => {return a.productId==this.$route.params.pid})
        if (productAsset && productAsset.totalAsset > 0) {
          return productAsset.totalAsset
        } else {
          return 0
        }
      },
      transactionName(){
        let pType = this.$store.getters.getProductById(this.$route.params.pid).type
        if (pType==1) return this.$route.params.type==='in' ? '申购' : '赎回'
        if (pType==2) return this.$route.params.type==='in' ? '购买' : '退出'
      },
      transactionTitle(){
        return this.post.account==='elecAccount' ? '帐户余额'+this.transactionName : this.bindCard.bankName+'('+this.bindCard.bankCardNo+')'+this.transactionName
      }
    },
    watch      : {
      'post.amount'(val){
        if (val) {
          this.$nextTick(() => {document.querySelector('.money-input input').style.fontSize = '1.7em'})
        } else {
          this.$nextTick(() => {document.querySelector('.money-input input').style.fontSize = '1em'})
        }
      }
    },
    methods    : {
      maxIn(){
        this.post.amount = toYuan(this.asset.availableAsset)
      },
      maxOut(){
        this.post.amount = toYuan(this.productAsset)
      },
      submitTransaction(password){
        let post = {
          userID      : window.localStorage.getItem('userID'),
          productCode : this.post.pid,
          amount      : toCent(this.post.amount),
          tradePwd    : password,
          buySource   : this.post.account
        }
        let operateType
        if (this.$route.params.type=='in') operateType = 'buyAsset'
        if (this.$route.params.type=='out') operateType = 'sellAsset'
        this.submitting=true
        console.log(post)
        this.$post(api(operateType, post),{
          showProgress : '数据提交中，请勿重复提交...',
          callback     : {
            success : successCallback,
            error   : errorCallback,
            fail    : failCallback,
            always  : alwaysCallback
          }
        })
        let _=this
        function successCallback(data, msg) {
          _.result = { show : true, title : _.transactionName+'结果', content : '恭喜您'+_.transactionName+'成功' }
          _.$post(api('getAsset', { userID : window.localStorage.getItem('userID') }), { callback : { success : successCallback } })
          function successCallback(data) {
            _.$store.commit('setAsset', data)
          }
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
    }
  }
</script>
<style lang="stylus" scoped>
  @import '../../style/base.styl'

  .all
    color neutral-text-color2
    font-size small

  .other
    color secondary-text-color
    line-height 4em
    text-align right
    font-size 0.8em
    span
      display inline-block
      line-height 4em
      padding-right 10px

</style>
