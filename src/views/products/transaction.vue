<template>
  <div id="transaction">
    <div v-if="this.$route.params.type=='in'">
      <section>
        <div class="title">转入途径</div>
        <input type="radio" v-model="post.account" :value="bank.id" :id="bank.id">
        <label :for="bank.id">
          <mt-cell :title="bank.name" label="单笔限额X，每日限额X"></mt-cell>
        </label>
        <input type="radio" v-model="post.account" value="1000" :id="account.id">
        <label :for="account.id">
          <mt-cell title="账户余额" :label="'可用余额'+account.amount"></mt-cell>
        </label>
        <div class="other">
          <router-link :to="{name:'newbank',params:{id: this.$route.params.id}}"><span>使用其他方式转入>></span></router-link>
        </div>
      </section>
      <section>
        <div class="title">转入金额</div>
        <mt-field type="number" placeholder="0.01元起购" v-model="post.amount">
          <span v-show="post.account==account.id" class="all" @click="post.amount=account.amount">全部余额买入</span>
        </mt-field>
        <input type="button" class="primary-btn fix-bottom" value="确定买入" :disabled="buyConfirm" @click="dialogVisible=true">
      </section>
    </div>
    <div v-if="this.$route.params.type=='out'">
      <section>
        <div class="title">转出金额</div>
        <mt-field type="number" placeholder="最小转出金额0.01元" v-model="post.amount">
          <span class="all" @click="post.amount=product.amount">全部转出</span>
        </mt-field>
        <mt-cell>持有金额{{product.amount}}元</mt-cell>
        <input type="button" class="primary-btn fix-bottom" value="确定转出" :disabled="sellConfirm" @click="submitData(afterSubmitHandler)">
      </section>
      <section>
        <div class="title">转出说明</div>
      </section>
    </div>
    <el-dialog :visible.sync="dialogVisible" :title="transactionName+'金额'" center :show-close="false" class="dialog-wrapper">
      <div style="font-size: xx-large;text-align:center;line-height: 1.8em">{{post.amount}}元</div>
      <mt-field type="password" placeholder="请输入交易密码"></mt-field>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" style="width: 40%">取 消</el-button>
        <el-button type="primary" @click="submitData(afterSubmitHandler)" style="width: 40%">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { submitHandler, getCodeByType } from '@/utils/common.js'
  const defaultBank = { id : 1, name : '工商银行', logo : '', default : false }
  export default{
    data(){
      return {
        post          : {
          type    : this.$route.params.type,
          amount  : null,
          account : defaultBank.id,
        },
        bank          : defaultBank,
        account       : {
          id     : 1000,
          amount : 200
        },
        product       : {
          amount : 100000
        },
        code          : null,
        dialogVisible : false
      }
    },
    components:{
    },
    computed : {
      transactionName(){
        return this.$route.params.type==='in' ? '转出' : '转入'
      },
      buyConfirm(){
        let post = this.post
        return !(post.amount && post.account && post.account)
      },
      sellConfirm(){
        let post = this.post
        return !(post.amount && post.account)
      }
    },
    methods  : {
      afterSubmitHandler(code){
        this.dialogVisible = false
        if (code == getCodeByType('success')) this.$router.replace({ name : 'transaction-result', params : { tid : '123456789', amount : this.post.amount, id : this.$route.params.id, type:  this.$route.params.type} })
      },
      submitData : submitHandler
    }
  }
</script>
<style lang="stylus" scoped>
  @import '../../style/base.styl'
  #transaction
    padding 1em 0

  input[type='radio']
    display none

  input[type='radio']:checked + label .mint-cell
    position relative

  input[type='radio']:checked + label .mint-cell:after
    content ''
    position absolute
    top 50%
    transform translateY(-50%)
    right 1em
    width 1.2em
    height 1.2em
    background-image url('../../assets/icon/card_selected.svg')
    background-size contain

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
