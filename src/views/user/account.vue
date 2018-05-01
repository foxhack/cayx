<template>
  <div id="account-operate" style="min-height: calc(100vh - 2.8em)">
    <div v-if="!result.show">
      <template v-if="type=='in'">
        <section>
          <div class="title">支付方式</div>
          <bank></bank>
          <div class="tip">单笔限额5万元，每日限额10万元</div>
        </section>
        <section>
          <div class="title">充值金额（元）</div>
          <mt-field placeholder="请输入充值金额" :disabled="!isBindCard" type="number" v-model="post.amount"><span v-if="isBindCard" @click="post.amount=50000">单笔最大充值</span></mt-field>
        </section>
        <input type="button" class="primary-btn fix-bottom" @click="dialogVisible=true" :disabled="!post.amount" value="立即充值">
      </template>
      <template v-if="type=='out'">
        <section>
          <div class="title">回款方式</div>
          <bank></bank>
        </section>
        <section v-if="isBindCard">
          <div class="title">提现金额（元）</div>
          <mt-cell v-if="maxOut==0" title="尚无可用资产"></mt-cell>
          <mt-field v-if="maxOut>0" :placeholder="'本次最大提现金额'+maxOut+'元'" type="number" v-model="post.amount">
            <span @click="post.amount=maxOut">全部提现</span>
          </mt-field>
          <input type="button" class="primary-btn fix-bottom" @click="dialogVisible=true" :disabled="!post.amount" value="确认提现">
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
      <div v-if="dialogVisible">
        <el-dialog :visible="!showResetPassword" width="100%" title="请输入交易密码" center :show-close="false">
            <div style="" @click="showResetPassword=true">忘记密码</div>
          <div style="font-size: large;text-align:center; padding: 1em">{{dialogTitle}}</div>
          <div style="font-size: xx-large;text-align:center">
            {{this.toCent|money}}元
          </div>
          <span slot="footer" class="dialog-footer">
            <password-input v-on:getPassword="getPassword"></password-input>
            <el-button @click="dialogVisible = false" style="width: 40%">取 消</el-button>
            <el-button type="primary" @click="changeAccount" :disabled="password===null || (password && !password.isValid) || submitting==true" style="width: 40%">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog id='resetP' :visible="showResetPassword" width="100%" title="找回交易密码"  :show-close="true" v-on:close="showResetPassword=false">
          <span slot="footer" class="dialog-footer">
            <reset-password :resultClose="true" v-on:close="showResetPassword=false"></reset-password>
          </span>
        </el-dialog>
      </div>
    </div>
    <div v-else class="result">
      <div class="content">
        <div class="title">{{result.title}}</div>
        <div class="information">{{result.information}}</div>
      </div>
      <router-link :to="{path:'/user'}">
        <input type="button" class="primary-btn" value="确定">
      </router-link>
    </div>
  </div>
</template>
<script>
  import Bank from '@/views/user/bank'
  import PasswordInput from '@/components/user/passwordInput'
  import ResetPassword from '@/views/user/resetPassword'
  import { operateAccount, getAsset } from '@/api/user'
  import { fMoney } from '@/utils/common.js'
  import { mixin }from '@/utils/mixin'

  export default{
    data(){
      return {
        type              : this.$route.params.type,
        post              : {
          userID : window.localStorage.getItem('userID'),
          amount : null
        },
        password          : null,
        tag               : 0,
        dialogVisible     : false,
        result            : { show : false, title : '', information : '' },
        submitting        : false,
        showResetPassword : false
      }
    },
    components : {
      Bank,
      PasswordInput,
      ResetPassword
    },
    mixins    : [mixin],
    computed   : {
      toCent(){
        return parseFloat(this.post.amount)*100
      },
      maxOut(){
        return (this.$store.state.asset.availableAsset/100).toFixed(2)
      },
      dialogTitle(){
        if (this.type=='in') return '确定要存入'
        if (this.type=='out') return '确定要提现'
      }
    },
    methods    : {
      getPassword(password){
        this.password = password
      },
      changeAccount(){
        this.submitting = true
        let post = {
          userID   : this.post.userID,
          amount   : this.toCent,
          tradePwd : this.password.password
        }
        console.log(post)
        let _ = this
        this.$post(operateAccount(post, this.type), { showProgress : 'submit', callback : { success : successCallback, error : errorCallback, fail : failCallback, always : alwaysCallback } })
        function successCallback(data, msg) {
          _.result.title = '恭喜您，操作成功！'
          _.result.information = msg
          _.$post(getAsset({ userID : window.localStorage.getItem('userID') }), { callback : { success : successCallback } })
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
          _.dialogVisible = false
          _.result.show = true
          _.submitting = false
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base.styl"
  .bank
    /*font-family font-family-bold*/
  .bank.selected
    position relative

  .bank.selected:after
    content ''
    position absolute
    top 50%
    transform translateY(-50%)
    right 1em
    width 1.2em
    height 1.2em
    background-image url('../../assets/icon/card_selected.svg')
    background-size contain

  .result
    text-align center
    .content
      text-align center
      .title
        font-size extra-large
        color info-color
        padding 10px
      .information
        padding 1em
</style>
