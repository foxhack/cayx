<template>
  <div id="account-operate" class="page-with-top-bottom">
    <div v-if="isBindCard">
      <template v-if="type=='in'">
        <section>
          <bank></bank>
          <div class="tip">单笔限额5万元，每日限额10万元</div>
        </section>
        <section>
          <div class="title">充值金额（元）</div>
          <mt-field class="money-input" label="￥" placeholder="请输入充值金额" :disabled="!isBindCard" type="number" v-model="post.amount"><span v-if="isBindCard" @click="post.amount=50000.00">单笔最大充值</span></mt-field>
        </section>
        <input type="button" class="primary-btn fix-bottom" @click="showT=true" :disabled="!post.amount" value="立即充值">
      </template>
      <template v-if="type=='out'">
        <section>
          <bank></bank>
        </section>
        <section v-if="isBindCard">
          <div class="title">提现金额（元）</div>
          <mt-cell v-if="asset.availableAsset==0" title="尚无可用资产"></mt-cell>
          <mt-field class="money-input" label="￥" v-if="asset.availableAsset>0" placeholder="最小提现金额0.01元" type="number" v-model="post.amount">
            <span @click="maxOut">全部提现</span>
          </mt-field>
          <mt-cell title="账户余额" :value="asset.availableAsset | toYuan | money | unit('元')"></mt-cell>
          <input type="button" class="primary-btn fix-bottom" @click="showT=true" :disabled="!post.amount" value="确认提现">
        </section>
        <section v-if="tag==1">
          <div style="margin-left:10px; height: 200px;">
            <el-steps direction="vertical" :active="1">
              <el-step title="提交提现申请"></el-step>
              <el-step title="银行处理中"></el-step>
              <el-step title="到账" description="这是一段描述性文字"></el-step>
            </el-steps>
          </div>
        </section>
      </template>
      <transaction-input v-if=showT :tInfo="{title: transactionTitle,amount: post.amount, submitting : submitting}"
                         v-on:transactionSubmit="changeAccount"
                         v-on:close="showT=false">
      </transaction-input>
    </div>
    <bank v-else></bank>
    <result v-if="result.show" :result="result">
      <div slot="footer">
        <input type="button" class="primary-btn" value="确定" @click="$router.push({path:'/user'})">
      </div>
    </result>
  </div>
</template>
<script>
  import Bank from '@/views/user/bank'
  import Result from '@/components/user/result'
  import TransactionInput from '@/components/user/transactionInput'
  import { api } from '@/api/api'
  import { toCent, toYuan } from '@/utils/filters'
  export default{
    data(){
      return {
        type       : this.$route.params.type,
        post       : {
          userID : window.localStorage.getItem('userID'),
          amount : null
        },
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
    watch      : {
      'post.amount'(val){
        if (val) {
          this.$nextTick(() => {document.querySelector('.money-input input').style.fontSize = '1.7em'})
        } else {
          this.$nextTick(() => {document.querySelector('.money-input input').style.fontSize = '1em'})
        }
      }
    },
    computed   : {
      transactionTitle(){
        if (this.type=='in') return '确定要存入'
        if (this.type=='out') return '确定要提现'
      },
      operateType(){
        if (this.type=='in') return '充值'
        if (this.type=='out') return '提现'
      }
    },
    methods    : {
      maxOut(){
        this.post.amount=toYuan(this.asset.availableAsset)
      },
      changeAccount(password){
        this.submitting = true
        let post = {
          userID   : this.post.userID,
          amount   : toCent(this.post.amount),
          tradePwd : password
        }
        console.log(post)
        let _ = this
        let operateType
        if (this.type=='in') operateType = 'rechargeAccount'
        if (this.type=='out') operateType = 'takeoutAccount'

        this.$post(api(operateType, post),
          {
            showProgress : '数据提交中，请勿重复提交...',
            callback     : {
              success : successCallback,
              error   : errorCallback,
              fail    : failCallback,
              always  : alwaysCallback
            }
          })
        function successCallback(data, msg) {
          _.result = { show : true, title : _.operateType+'结果', content : '恭喜您'+_.operateType+'成功' }
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

