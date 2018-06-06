<template>
  <div id="open-account" class="page-with-top-bottom">
    <div v-show="!isOpenAccount">
      <section v-show="currentStep==1">
        <div class="title">请输入开户信息</div>
        <name-input ref="name" :initValue="userInfo.name" :initcheck="!!userInfo.name"></name-input>
        <idno-input ref="cardNo" :initValue="userInfo.cardNo" :initcheck="!!userInfo.cardNo"></idno-input>
        <mt-cell title="手机号" label="与注册手机号一致" @click.native="$message({message:'与注册手机号一致，如需修改，请前往我的账户->个人信息设置',duration:4000})">{{userInfo.mobile}}</mt-cell>
        <email-input ref="email" :initValue="userInfo.email" :initcheck="!!userInfo.email"></email-input>
        <address-input ref="address" :initValue="userInfo.address" :initcheck="!!userInfo.email"></address-input>
        <div class="title">请上传身份证</div>
        <image-upload-input ref="cardPhotoF" name="cardPhotoF" title="点击上传人像面"></image-upload-input>
        <image-upload-input ref="cardPhotoB" name="cardPhotoB" title="点击上传国徽面"></image-upload-input>
        <input type="button" class="primary-btn fix-bottom" @click="goNext" :disabled="forbidNext" value="下一步">
      </section>
      <new-bank v-show="!isOpenAccount && currentStep==2" v-on:getBankInfo="getBankInfo"></new-bank>
      <template v-if="!isOpenAccount && currentStep==3">
        <el-dialog :visible="currentStep==3" title="开户信息确认" center :show-close="false" class="dialog-wrapper" top="0">
          <div class="confirm-tip">您的开户信息提交后不能进行线上修改，请您在提交申请前再次确认以下信息：</div>
          <ul>
            <li class="cell"><span>姓名</span><span>{{$refs.name.value}}</span></li>
            <li class="cell"><span>身份证号</span><span>{{$refs.cardNo.value}}</span></li>
            <li class="cell"><span>手机号</span><span>{{userInfo.mobile}}</span></li>
            <li class="cell"><span>开户银行</span><span>{{getBankName(postData.bankCode)}}</span></li>
            <li class="cell"><span>银行卡号</span><span>{{postData.bankCardNo}}</span></li>
            <li class="cell"><span>银行预留手机号</span><span>{{postData.bankSavedMobile}}</span></li>
            <li class="cell"><span>email</span><span>{{$refs.email.value}}</span></li>
            <li class="cell"><span>联系地址</span><span>{{$refs.address.value}}</span></li>
            <li class="cell flex-col no-top-line"><span>身份证正面照片</span><img :src="$refs.cardPhotoF.img" class="id-card"></li>
            <li class="cell flex-col no-top-line"><span>身份证背面照片</span><img :src="$refs.cardPhotoB.img" class="id-card"></li>
          </ul>
          <span slot="footer" class="dialog-footer">
          <input type="button" class="primary-btn plain" :disabled="submitting" @click="currentStep=1" value="我要修改">
          <input type="button" class="primary-btn" :disabled="submitting" @click="submitAccountInfo" value="我已确认">
        </span>
        </el-dialog>
      </template>
    </div>
    <result v-show="result.show" :result="result">
      <div slot="footer">
        <router-link :to="{name: 'account', params:{type:'in'}}"><input type="button" class="primary-btn" value="去充值"></router-link>
        <router-link :to="{name: 'user'}"><input type="button" class="primary-btn plain" value="返回用户中心"></router-link>
      </div>
    </result>
  </div>
</template>
<script>
  import NameInput from '@/components/user/nameInput'
  import IdnoInput from '@/components/user/idnoInput'
  import ImageUploadInput from '@/components/user/imageUploadInput'
  import EmailInput from '@/components/user/emailInput'
  import AddressInput from '@/components/user/addressInput'
  import NewBank from '@/views/user/newbank'
  import { BANKS } from '@/utils/config'
  import Result from '@/components/user/result'

  export default{
    data(){
      return {
        fromPath    : null,
        currentStep : 1,
        submitting  : false,
        state       : {
          name       : false,
          cardNo     : false,
          email      : false,
          address    : false,
          cardPhotoF : false,
          cardPhotoB : false
        },
        postData    : {},
        result      : {
          show    : false,
          title   : '',
          content : '',
          reason  : ''
        }
      }
    },
    components : {
      NameInput,
      IdnoInput,
      ImageUploadInput,
      EmailInput,
      AddressInput,
      NewBank,
      Result
    },
    computed   : {
      forbidNext(){
        console.log('重新计算是否要禁用提交按钮')
        return (Object.values(this.state).some(e => {return e===false}))
      }
    },
    methods    : {
      getBankName(bcode){
        return BANKS.filter(b => {return b.code==bcode})[0].name
      },

      goNext(){
        for (let k in this.state) {
          if (this.state[k]) this.postData[k] = this.$refs[k].value
        }
        this.currentStep = 2
      },

      getBankInfo(bankInfo){
        for (let k in bankInfo) {
          this.postData[k] = bankInfo[k]
        }
        this.currentStep = 3
      },

      submitAccountInfo(){
        let postData = new FormData()
        for (let k in this.postData) {
          postData.append(k, this.postData[k])
        }

        this.submitting = true

        let _ = this
        this.$post('openAccount', postData, {
          showProgress   : '开户信息提交中，请勿重复提交...',
          showSuccessMsg : _.currentPath!=='/user/openaccount',//作为组件使用的,
          callback       : { success : successCallback, error : errorCallback, always : alwaysCallback }
        })
        function successCallback(data) {
          if (_.currentPath=='/user/openaccount') {
            _.result = { show : true, title : '开户结果', content : '恭喜您，开户成功' }
          }//作为路由使用的
          _.$store.commit('setUser', data)
        }

        function errorCallback() {
          _.currentStep = 1
        }

        function alwaysCallback() {
          _.submitting = false
        }
      }
    },
    created(){
      if (this.isOpenAccount) this.result = { show : true, title : '开户结果', content : '恭喜您，开户成功' }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (!vm.isRegister) vm.$router.push('/user')
      })
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"

  .id-card
    width calc(100vw - 25px)
    height calc(62.8vw - 15.8px)

  .no-top-line::after
    border-top none

  .confirm-tip
    text-indent 2em
    background-color striking-text-color
    border-radius 10px
    padding 1em
    color white
    margin-bottom 1em

</style>
