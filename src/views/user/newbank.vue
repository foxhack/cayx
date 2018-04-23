<template>
  <div id="new-bank">
    <section class="progress">
      <div class="step" :class="{active:p.step<=currentProgress}" v-for="p in progress">
        <div class="img" :class="{active:p.step<=currentProgress}">{{p.step}}</div>
        <div>{{p.title}}</div>
      </div>
    </section>
    <section v-show="currentProgress==1">
      <register></register>
    </section>
    <section v-show="currentProgress==2">
      <mt-cell v-if="post.bankSelectedId" :title="post.bankSelectedName" is-link @click.native="showBankList=true"></mt-cell>
      <mt-cell v-if="!post.bankSelectedId" title="请选择一个银行" is-link @click.native="showBankList=true"></mt-cell>
      <div v-show="showBankList" class="bank-list">
        <mt-cell v-for="b in bankList" :key="b.id" class="bank" :class="{'selected':post.bankSelectedId==b.id}" @click.native="checkBank(b.id,b.name)" :title="b.name">
          <div slot="icon" class="bank-icon" :style="{backgroundPosition: b.logoPos}"></div>
        </mt-cell>
      </div>
      <div v-if="post.bankSelectedId && !showBankList">
        <div class="title">请输入银行卡信息</div>
        <mt-cell v-if="userInfo && userInfo.name" title="持卡人姓名">{{userInfo.name}}</mt-cell>
        <mt-field v-else label="持卡人姓名" placeholder="请输入真实的持卡人中文姓名" v-model="post.username"></mt-field>
        <mt-field label="银行卡号" type="number" placeholder="请输入银行卡号" v-model="post.bankCardNo"></mt-field>
        <mt-cell v-if="userInfo && userInfo.cardNo" title="持卡人身份证号">{{userInfo.cardNo}}</mt-cell>
        <mt-field v-else label="身份证号" placeholder="请输入有效的证件号码" v-model="post.cardNo"></mt-field>
        <mt-cell v-if="userInfo && userInfo.mobile && !changeMobile" title="手机号" label="银行预留手机号" @click.native="changeMobile=true">{{userInfo.mobile}}</mt-cell>
        <mt-field v-if="!userInfo ||userInfo && !userInfo.mobile|| changeMobile" label="手机号" type="number" placeholder="请输入在银行预留的手机号" v-model="post.bankMobile"></mt-field>
        <mt-field label="验证码" type="number" placeholder="请输入收到验证码" v-model="post.identifyCode">
          <span class="get-code-btn" :class="{active:post.bankMobile}" v-show="!count" @click="getIdentifyCode(5)">获取验证码</span>
          <span class="count-num" v-show="count">{{count}}&nbsp;秒后重新获取</span>
        </mt-field>
      </div>
    </section>
    <section v-show="currentProgress==3">
      <mt-cell title="持卡人姓名">{{post.username}}</mt-cell>
      <mt-cell title="持卡人身份证号">{{post.cardNo}}</mt-cell>
      <div class="upload">正面</div>
      <div class="upload">背面</div>
      <input type="button" class="primary-btn fix-bottom" @click="submitData(afterSubmitHandler)" :disabled="progressSubmit" value="提交">
    </section>

  </div>
</template>
<script>
  import { BANKS } from '@/utils/config'
  import { fetchData, submitHandler } from '@/utils/common.js'
  import { getIdentifyCode } from '@/api/user'
  import Register from '@/components/user/register'
  export default{
    data(){
      return {
        progress     : [
          { step : 1, title : '注册长安严选' },
          { step : 2, title : '填写卡信息' },
          { step : 3, title : '上传证件' }
        ],
        bankList     : BANKS,
        showBankList : true,
        post         : {
          bankSelectedId   : null,
          bankSelectedName : '',
          username         : '',
          userID           : window.localStorage.getItem('userID'),
          cardNo           : null,
          bankCardNo       : null,
          bankMobile       : null,
          identifyCode     : null,
        },
        changeMobile : false,
        count        : 0,
      }
    },
    components : {
      Register
    },
    watch      : {
      userInfo(val){
        this.post.username = val.name
        this.post.cardNo = val.cardNo
        this.post.bankMobile = val.mobile
      }
    },
    computed   : {
      currentProgress(){
        if (!this.$store.state.user || this.$store.state.user && !this.$store.state.user.userStatus.isRegisterCayx) {
          return 1
        }
        else {
          if (!this.post.identifyCode) {
            return 2
          }
          else {
            return 3
          }
        }
      },
      getBankName(){
        return this.post.bankSelectedId && this.bankList.filter(b => {return b.id==this.post.bankSelectedId})[0].name
      },
      userInfo(){
        return this.$store.state.user && this.$store.state.user.userInfo
      },
      progressSubmit(){
        let post = this.post
        return !(post.bankSelectedId && post.username && post.userID && post.bankNum && post.bankPhone && post.captcha2)
      }
    },
    methods    : {
      checkBank(bid, bname){
        this.post.bankSelectedId = bid
        this.post.bankSelectedName = bname
        this.showBankList = false
      },
      getIdentifyCode(countDown){
        if (!this.post.mobile) return
        this.startCountDown(countDown)
        let postData = { userID : this.post.userID, mobile : this.post.bankMobile }
        fetchData(getIdentifyCode(postData))
        function startCountDown(num) {
          this.count = num
          let _ = this
          _countDown()
          function _countDown() {
            setTimeout(() => {
              _.count--
              if (_.count > 0) _countDown()
            }, 1000)
          }
        }
      },

      afterSubmitHandler(){
        if (this.$route.path.indexOf('user') > -1) {
          this.$router.replace({ name : 'bank' })
        } else {
          this.$router.replace({ name : 'productDetail', params : { id : 1 } })
        }
      },
      submitData : submitHandler
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"
  #new-bank
    padding 1em 0

  .progress:after
    @extend .hr-line
    color primary-text-color

  .progress
    position relative
    background #fff
    height 4em
    @extend .flex-row
    justify-content space-around
    align-items center
    .step.active
      color secondary-text-color
      {first-level}
    .step
      @extend .flex-col
      align-items center
      {third-level}
      color primary-text-color
      font-size 0.8em
      .img
        width 2em
        height 2em
        background-color #f5f5f5
        border-radius 50%
        color #fff
        margin-bottom: 0.2em
        @extend .center
      /*background-size contain*/
      .img.active
        background-color secondary-text-color

  /*.step:nth-child(1) .img*/
  /*background-image url('../../assets/icon/bankcard.svg')*/
  /*.step:nth-child(2) .img*/
  /*background-image url('../../assets/icon/userinfo.svg')*/
  /*.step:nth-child(3) .img*/
  /*background-image url('../../assets/icon/cardinfo.svg')*/

  /*.step.active:nth-child(1) .img*/
  /*background-image url('../../assets/icon/bankcard_active.svg')*/
  /*.step.active:nth-child(2) .img*/
  /*background-image url('../../assets/icon/userinfo_active.svg')*/
  /*.step.active:nth-child(3) .img*/
  /*background-image url('../../assets/icon/cardinfo_active.svg')*/

  .bank
    font-family font-family-bold

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

  .back
    color secondary-text-color
    line-height 4em
    text-align right
    font-size 0.8em
    span
      display inline-block
      line-height 4em
      padding-right 10px

  .bank-icon
    width 2em
    height 2em
    background-size 400% 500%
    background-image url('../../assets/icon/bank.jpg')
    display inline-block
    vertical-align middle
    margin-right 10px

  .get-code-btn, .count-num
    font-size 0.8em
    padding 0.2em 0.4em
    display inline-block
    line-height 2em
    margin-left 10px

  .get-code-btn
    color #fff
    border-radius 0.4em
    border 1px solid
    background primary-text-color
    opacity 0.3

  .get-code-btn.active
    background secondary-text-color
    opacity 1

  .count-num
    {third-level}

  .upload
    @extend .center
    width 90%
    margin 10px auto
    line-height 4em
    font-size 2em
    {third-level}
    border 2px dashed
    border-radius 0.2em
</style>
