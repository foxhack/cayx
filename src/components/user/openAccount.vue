<template>
  <div id="open-account" class="page-with-top-bottom">
    <section v-if="!isOpenAccount">
      <div class="title">请输入开户信息</div>
      <name-input
          :displayInput="displayInput.name"
          :initcheck="true"
          inputname="name"
          v-model="post.name"
          v-on:isValid="setValid"
          v-on:showInput="showInput">
      </name-input>
      <idno-input
          :initcheck="true"
          :displayInput="displayInput.cardNo"
          inputname="cardNo"
          v-model="post.cardNo"
          v-on:isValid="setValid"
          v-on:showInput="showInput">
      </idno-input>
      <mt-cell title="手机号" label="与注册手机号一致" @click.native="$message({message:'与注册手机号一致，如需修改，请前往我的账户->个人信息设置',duration:4000})">{{userInfo.mobile}}</mt-cell>
      <div class="title">请上传身份证</div>
      <image-upload-input
          :initcheck="true"
          inputname="cardPhotoF"
          title="点击上传正面"
          v-on:getImage="getImageF"
          v-on:getImageUrl="getImageFUrl"
          v-on:isValid="setValid">
      </image-upload-input>
      <image-upload-input
          :initcheck="true"
          inputname="cardPhotoB"
          title="点击上传背面"
          v-on:getImage="getImageB"
          v-on:getImageUrl="getImageBUrl"
          v-on:isValid="setValid">
      </image-upload-input>
      <input type="button" class="primary-btn fix-bottom" @click="showConfirm=true" :disabled="forbidSubmit" value="提交">
    </section>
    <el-dialog :visible=showConfirm title="开户信息确认" center :show-close="false" class="dialog-wrapper" top="0">
      <div>您的开户信息提交后不能进行线上修改，请您在提交申请前再次确认开户信息</div>
      <ul>
        <li class="cell"><span>姓名</span><span>{{post.name}}</span></li>
        <li class="cell"><span>身份证号</span><span>{{post.cardNo}}</span></li>
        <li class="cell"><span>手机号</span><span>{{userInfo.mobile}}</span></li>
        <li class="cell flex-col no-top-line"><span>身份证正面照片</span><img :src="photo.cardPhotoF" class="id-card"></li>
        <li class="cell flex-col no-top-line"><span>身份证背面照片</span><img :src="photo.cardPhotoB" class="id-card"></li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <input type="button" class="primary-btn plain" @click="showConfirm=false" value="我要修改">
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
  import Result from '@/components/user/result'

  export default{
    data(){
      return {
        fromPath     : null,
        showConfirm  : false,
        submitting   : false,
        allowSubmit  : { init : true },
        displayInput : {
          name   : false,
          cardNo : false,
          mobile : false
        },
        post         : {
          name       : null,
          cardNo     : null,
          cardPhotoF : null,
          cardPhotoB : null
        },
        photo        : {
          cardPhotoF : null,
          cardPhotoB : null
        },
        result       : {
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
      Result
    },
    computed   : {
      forbidSubmit(){
        if (this.submitting || this.isOpenAccount) return true
        if (Object.keys(this.allowSubmit).length===1) return true
        return (Object.values(this.allowSubmit).some(e => {return e===false}))
      },
    },
    methods    : {
      initData(val){
        console.log('初始化userInfo')
        this.post.name = val.name
        this.post.cardNo = val.cardNo
      },
      showInput(inputName){
        this.displayInput[inputName] = true
      },
      setValid(isValid){
        this.$set(this.allowSubmit, isValid.key, isValid.isValid)
      },
      getImageF(img){
        this.post.cardPhotoF = img
      },
      getImageFUrl(img){
        this.photo.cardPhotoF = img
      },
      getImageB(img){
        this.post.cardPhotoB = img
      },
      getImageBUrl(img){
        this.photo.cardPhotoB = img
      },
      submitAccountInfo(){
        this.submitting = true
        let post = { userID : window.localStorage.getItem('userID') }
        for (let k in this.post) {
          if (this.allowSubmit[k]) post[k] = this.post[k]
        }

        let postdata = new FormData()
//        postdata.append('cardPhotos', post.cardPhotoF)
//        postdata.append('cardPhotos', post.cardPhotoB)
        postdata.append('cardPhotoF', post.cardPhotoF)
        postdata.append('cardPhotoB', post.cardPhotoB)
        postdata.append('userID', post.userID)
        postdata.append('name', post.name)
        postdata.append('cardNo', post.cardNo)
        postdata.append('email', 'a@com.cn')
        postdata.append('address', '都城')

        console.log(postdata)
        let _ = this
        this.$post('openAccount', postdata, true, {
          showProgress   : '开户信息提交中，请勿重复提交...',
          showSuccessMsg : _.currentPath!=='/user/openaccount',//作为组件使用的,
          callback       : { success : successCallback, always : alwaysCallback }
        })
        function successCallback() {
          if (_.currentPath=='/user/openaccount') {
            _.result = { show : true, title : '开户结果', content : '恭喜您，开户成功' }
          }//作为路由使用的
          _.$post('getUserByUserID', { userID : post.userID }, false, {
            showProgress : '用户信息更新中...',
            callback     : { success : successCallback }
          })
          function successCallback(data) {
            _.$store.commit('setUser', data)
          }
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
      this.initData(this.userInfo)
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
