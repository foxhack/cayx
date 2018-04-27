<template>
  <div id="transaction" v-if="isBindCard">
    <div v-if="this.$route.params.type=='in'">
      <section>
        <div class="title">{{transactionName}}途径</div>
        <mt-cell
            :title="bindCard.bankName"
            :label="'尾号'+bindCard.bankCardNo+'  单笔限额X，每日限额X'"
            @click.native="post.account=bindCard.bankCardNo"
            class="bank"
            :class="{'selected':post.account==bindCard.bankCardNo}">
        </mt-cell>
        <mt-cell
            v-if="asset && asset.availableAsset>0"
            title="账户余额"
            @click.native="post.account='yue'"
            class="bank"
            :class="{'selected':post.account=='yue'}"
            :label="'可用余额'+asset.availableAsset">
        </mt-cell>
        <!--<div class="other">-->
        <!--<router-link :to="{name:'newbank',params:{id: this.$route.params.id}}"><span>使用其他方式转入>></span></router-link>-->
        <!--</div>-->
      </section>
      <section>
        <div class="title">{{transactionName}}金额</div>
        <mt-field type="number" placeholder="0.01元起购" v-model="post.amount">
          <span v-if="asset && asset.availableAsset>0" class="all" @click="post.amount=asset.availableAsset">全部余额买入</span>
        </mt-field>
        <input type="button" class="primary-btn fix-bottom" :value="'确定'+transactionName" @click="dialogVisible=true">
      </section>
    </div>
    <div v-if="this.$route.params.type=='out'">
      <section>
        <div class="title">{{transactionName}}金额</div>
        <mt-field type="number" :placeholder="'最小'+transactionName+'金额0.01元'" v-model="post.amount">
          <span class="all" @click="post.amount=product.amount">全部{{transactionName}}</span>
        </mt-field>
        <mt-cell>持有金额{{product.amount}}元</mt-cell>
        <input type="button" class="primary-btn fix-bottom" :value="'确定'+transactionName"  @click="submitData(afterSubmitHandler)">
      </section>
      <section>
        <div class="title">{{transactionName}}说明</div>
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
  <div v-else>
    <bank></bank>
  </div>
</template>
<script>
  import Bank from '@/views/user/bank'
  import { submitHandler, getCodeByType } from '@/utils/common.js'
  const defaultBank = { id : 1, name : '工商银行', logo : '', default : false }
  export default{
    data(){
      return {
        post          : {
          pid     : this.$route.params.pid,
          type    : this.$route.params.type,
          amount  : null,
          account : '',
        },
        product       : {
          amount : 100000
        },
        code          : null,
        dialogVisible : false
      }
    },
    components : { Bank },
    computed   : {
      isBindCard(){
        return this.$store.state.user && this.$store.state.user.userStatus.isBindCard
      },
      bindCard(){
        return this.$store.state.user && this.$store.state.user.userInfo && this.$store.state.user.userInfo.bindCard
      },
      transactionName(){
        let pType = this.$store.getters.getProductById(this.$route.params.pid).type
        if(pType==1) return this.$route.params.type==='in' ? '赎回' : '申购'
        if(pType==2) return this.$route.params.type==='in' ? '退出' : '购买'

      },
      asset(){
        return this.$store.state.asset
      }
    },
    methods    : {
      afterSubmitHandler(code){
        this.dialogVisible = false
        if (code==getCodeByType('success')) this.$router.replace({ name : 'transaction-result', params : { tid : '123456789', amount : this.post.amount, id : this.$route.params.id, type : this.$route.params.type } })
      },
      submitData : submitHandler
    }
  }
</script>
<style lang="stylus" scoped>
  @import '../../style/base.styl'
  #transaction
    padding 1em 0
    min-height calc(100vh - 2.8em)

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
