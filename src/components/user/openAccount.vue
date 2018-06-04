<template>
  <div id="open-account" class="page-with-top-bottom">
    <section v-if="!isOpenAccount">
      <div class="title">请输入开户信息</div>
      <name-input ref="name" :initValue="userInfo.name" :initcheck="!!userInfo.name"></name-input>
      <idno-input ref="cardNo" :initValue="userInfo.cardNo" :initcheck="!!userInfo.cardNo"></idno-input>
      <mt-cell title="手机号" label="与注册手机号一致" @click.native="$message({message:'与注册手机号一致，如需修改，请前往我的账户->个人信息设置',duration:4000})">{{userInfo.mobile}}</mt-cell>
      <email-input ref="email" :initValue="userInfo.email" :initcheck="!!userInfo.email"></email-input>
      <address-input ref="address" :initValue="userInfo.address" :initcheck="!!userInfo.email"></address-input>
      <div class="title">请上传身份证</div>
      <image-upload-input ref="cardPhotoF" name="cardPhotoF" title="点击上传正面"></image-upload-input>
      <image-upload-input ref="cardPhotoB" name="cardPhotoB" title="点击上传背面"></image-upload-input>
      <input type="button" class="primary-btn fix-bottom" @click="showConfirm=true" :disabled="forbidSubmit" value="提交">
    </section>
    <el-dialog :visible=showConfirm title="开户信息确认" center :show-close="false" class="dialog-wrapper" top="0">
      <div>您的开户信息提交后不能进行线上修改，请您在提交申请前再次确认开户信息</div>
      <ul v-if="showConfirm">
        <li class="cell"><span>姓名</span><span>{{$refs.name.value}}</span></li>
        <li class="cell"><span>身份证号</span><span>{{$refs.cardNo.value}}</span></li>
        <li class="cell"><span>手机号</span><span>{{userInfo.mobile}}</span></li>
        <li class="cell"><span>email</span><span>{{$refs.email.value}}</span></li>
        <li class="cell"><span>联系地址</span><span>{{$refs.address.value}}</span></li>
        <li class="cell flex-col no-top-line"><span>身份证正面照片</span><img :src="$refs.cardPhotoF.img" class="id-card"></li>
        <li class="cell flex-col no-top-line"><span>身份证背面照片</span><img :src="$refs.cardPhotoB.img" class="id-card"></li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <input type="button" class="primary-btn plain" :disabled="submitting" @click="showConfirm=false" value="我要修改">
        <input type="button" class="primary-btn" :disabled="forbidSubmit" @click="submitAccountInfo" value="我已确认">
      </span>
    </el-dialog>
    <result v-if="result.show" :result="result">
      <div slot="footer">
        <router-link :to="{name: 'bank'}"><input type="button" class="primary-btn" value="去绑卡"></router-link>
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
  import Result from '@/components/user/result'

  export default{
    data(){
      return {
        fromPath    : null,
        showConfirm : false,
        submitting  : false,
        state       : {
          name       : false,
          cardNo     : false,
          email      : false,
          address    : false,
          cardPhotoF : false,
          cardPhotoB : false
        },
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
      Result
    },
    computed   : {
      forbidSubmit(){
        console.log('重新计算是否要禁用提交按钮')
        if (this.submitting || this.isOpenAccount) return true
        return (Object.values(this.state).some(e => {return e===false}))
      },
    },
    methods    : {
      submitAccountInfo(){
        this.submitting = true
        let postData = new FormData()
        postData.append('userID', window.localStorage.getItem('userID'))
        for (let k in this.state) {
          if (this.state[k]) postData.append(k, this.$refs[k].value)
        }

        let _ = this
        this.$post('openAccount', postData, {
          showProgress   : '开户信息提交中，请勿重复提交...',
          showSuccessMsg : _.currentPath!=='/user/openaccount',//作为组件使用的,
          callback       : { success : successCallback, always : alwaysCallback }
        })
        function successCallback(data) {
          if (_.currentPath=='/user/openaccount') {
            _.result = { show : true, title : '开户结果', content : '恭喜您，开户成功' }
          }//作为路由使用的
          _.$store.commit('setUser', data)
        }

        function alwaysCallback() {
          if (!this.isOpenAccount) {
            _.showConfirm = false
            _.submitting = false
          }
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

</style>
