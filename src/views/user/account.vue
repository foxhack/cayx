<template>
  <div id="account-operate">
    <template v-if="type=='in'">
      <section>
        <div class="title">选择支付方式</div>
        <mt-cell v-for="bb in bindedBanks" :key="bb.id" :title="bb.name" label="尾号****" class="bank" :class="{'selected':bb.id==selectedBankId}" @click.native="selectedBankId=bb.id"></mt-cell>
        <div class="tip">单笔限额5万元，每日限额10万元</div>
        <div class="other">
          <router-link :to="{name:'newbank',params:{id: 1}}"><span>使用其他银行卡>></span></router-link>
        </div>
      </section>
      <section>
        <mt-field placeholder="请输入充值金额" type="number" v-model="post.amount"><span @click="post.amount=50000">单笔最大充值</span></mt-field>
      </section>
      <input type="button" class="primary-btn fix-bottom" @click="confirmPost" :disabled="progressSubmit" value="立即充值">
    </template>
    <template v-if="type=='out'">
      <section>
        <div class="title">回款方式</div>
        <mt-cell title="中国工商银行" label="尾号****"></mt-cell>
      </section>
      <section>
        <div class="title">提现金额</div>
        <mt-field placeholder="本次最大提现金额200元" type="number" v-model="post.amount"><span @click="post.amount=200">全部提现</span></mt-field>
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
      <input type="button" class="primary-btn fix-bottom" @click="submitData(1)" :disabled="progressSubmit" value="确认提现">
    </template>
    <el-dialog :visible.sync="dialogVisible" width="100%" title="确定要充值" center :show-close="false">
      <div style="font-size: xx-large;text-align:center">5000元</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" style="width: 40%">取 消</el-button>
        <el-button type="primary" @click="submitWithConfirm(1)" style="width: 40%">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  const bindedBanks = [{ id : 1, name : '光大银行', logo : '', default : false }, { id : 2, name : '中国工商银行', logo : '', default : true }]
  import { submitData }from '@/utils/common.js'
  import { Toast, Indicator } from 'mint-ui'
  import { Message } from 'element-ui';
  import { Dialog, Button } from 'element-ui'
  export default{
    data(){
      return {
        type           : this.$route.params.type,
        bindedBanks    : bindedBanks,
        selectedBankId : 2,
        post           : { amount : null },
        tag            : 0,
        dialogVisible  : false
      }
    },
    components : { 'el-dialog' : Dialog, 'el-button' : Button },
    computed   : {
      progressSubmit(){
        let post = this.post
        return !(post.amount)
      }
    },
    methods    : {
      confirmPost(){
        this.dialogVisible = true
      },
      submitWithConfirm(type){
        this.dialogVisible=false
        this.submitData(type)
      },
      submitData(type, cb){
        let _ = this
        Indicator.open({
          text        : '数据提交中...',
          spinnerType : 'fading-circle'
        });
        setTimeout(() => {
          Indicator.close()
          Message({
            showClose : true,
            message   : type==1 ? '操作成功' : '出错了',
            type      : type==1 ? 'success' : 'error'
          });
          if (typeof cb==='function') cb()
        }, 1000)
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

  .other
    color secondary-text-color
    line-height 4em
    text-align right
    font-size 0.8em
    margin-right 10px
</style>
