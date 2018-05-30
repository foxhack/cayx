<template>
  <div id="account-operate" class="page-with-top-bottom">
    <section>
      <div class="title">请选择{{operateType}}银行卡</div>
      <bank v-on:getSelectedCard="getSelectedCard"></bank>
      <div class="tip">这里是一些说明</div>
    </section>
    <template v-if="type=='in'">
      <section>
        <div class="title">充值金额（元）</div>
        <mt-field class="money-input no-top-line" label="￥" placeholder="请输入充值金额" type="number" v-model="post.amount"><span @click="post.amount=50000.00">单笔最大充值</span></mt-field>
      </section>
      <input type="button" class="primary-btn fix-bottom" @click="showT=true" :disabled="forbidSubmit" value="立即充值">
    </template>
    <template v-if="type=='out'">
      <section>
        <div class="title">提现金额（元）</div>
        <mt-cell v-if="asset.availableAsset==0" title="尚无可用资产"></mt-cell>
        <mt-field class="money-input" label="￥" v-if="asset.availableAsset>0" placeholder="最小提现金额0.01元" type="number" v-model="post.amount">
          <span @click="maxOut">全部提现</span>
        </mt-field>
        <mt-cell title="账户余额" :value="asset.availableAsset | toYuan | money | unit('元')"></mt-cell>
        <input type="button" class="primary-btn fix-bottom" @click="showT=true" :disabled="forbidSubmit" value="确认提现">
      </section>
    </template>
    <transaction-input v-if=showT :tInfo="{title: transactionTitle,amount: post.amount, submitting : submitting}"
                       v-on:transactionSubmit="changeAccount"
                       v-on:close="showT=false">
    </transaction-input>
    <result v-if="result.show" :result="result">
      <div slot="footer">
        <input type="button" class="primary-btn" value="确定" @click="$router.push({path:from?from:'/user'})">
      </div>
    </result>
    <template v-if="dialog">
      <el-dialog :visible=dialog.show :title="dialog.title" center :show-close="false" class="dialog-wrapper">
        <div>{{dialog.msg}}</div>
        <span slot="footer" class="dialog-footer">
        <router-link :to="{path:'/user'}"><div class="primary-btn">确定</div></router-link>
      </span>
      </el-dialog>
    </template>
  </div>
</template>
<script>
  import Bank from '@/views/user/bank'
  import Result from '@/components/user/result'
  import TransactionInput from '@/components/user/transactionInput'
  import { toCent, toYuan } from '@/utils/filters'
  export default{
    data(){
      return {
        type       : this.$route.params.type,
        from       : this.$route.params.from,
        post       : {
          userID : window.localStorage.getItem('userID'),
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
      },
      forbidSubmit(){
        if (this.submitting) return true
        return !(this.post.bindId && this.post.amount && this.post.amount > 0)
      }
    },
    methods    : {
      setDialog(title, msg){

      },
      getSelectedCard(bid){
        this.post.bindId = bid
      },
      maxOut(){
        this.post.amount = toYuan(this.asset.availableAsset)
      },
      changeAccount(password){
        this.submitting = true
        let post = {
          userID   : this.post.userID,
          amount   : toCent(this.post.amount),
          bindId   : this.post.bindId,
          tradePwd : password
        }
        console.log(post)
        let _ = this
        let operateType
        if (this.type=='in') operateType = 'rechargeAccount'
        if (this.type=='out') operateType = 'takeoutAccount'

        this.$post(operateType, post, false,
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
          _.$post('getAsset', { userID : window.localStorage.getItem('userID') }, false, { callback : { success : successCallback } })
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
    },
    created(){
      if (!this.isRegister) {
        this.dialog = { show : true, title : '操作提示', msg : '您现在还不能进行账户操作，您需要前往会员中心依次进行注册->开户->绑卡' }
        return
      }
      if (!this.isOpenAccount) {
        this.dialog = { show : true, title : '操作提示', msg : '您现在还不能进行账户操作，您需要前往会员中心依次进行开户->绑卡' }
        return
      }
      if (this.bindCard.length==0) {
        this.dialog = { show : true, title : '操作提示', msg : '您现在还不能进行账户操作，您需要前往会员中心进行绑卡' }
        return
      }
    }
  }
</script>

