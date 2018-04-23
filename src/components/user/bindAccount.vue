<template>
  <div id="bind-account">
    <el-dialog :visible=alertBindAccount title="绑定长安一家" center :show-close="false" class="dialog-wrapper">
      <div>系统检测到您已注册过长安一家，是否使用该注册信息进行注册，并将长安严选与之关联？</div>
      <ul v-if="userInfo && userInfo.mobile!==undefined">
        <li>姓名：{{userInfo.name}}</li>
        <li>身份证号：{{userInfo.cardNo}}</li>
        <li>手机号：{{userInfo.mobile}}</li>
        <li>email：{{userInfo.email}}</li>
        <li>联系地址：{{userInfo.address}}</li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close=true" style="width: 40%">重新注册</el-button>
        <el-button type="primary" @click="bindUserAccount" style="width: 40%">确定关联</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { bindUserAccount } from '@/api/user'
  import { fetchData } from '@/utils/common.js'

  export default{
    name     : 'BindAccount',
    data(){
      return {
        close : false
      }
    },
    computed : {
      userInfo(){
        return this.$store.state.user==null ? null : this.$store.state.user.userInfo
      },
      alertBindAccount(){
        return !this.close && this.$store.state.user && this.$store.state.user.userStatus.isRegisterCaej && !this.$store.state.user.userStatus.isRegisterCayx
      },
      currentPath(){
        return this.$route.path
      }
    },
    methods  : {
      bindUserAccount(){
        let _ = this
        fetchData(bindUserAccount(_.$store.state.user.userID), {
          showSuccessMsg : false,
          callback       : { success : successCallback }
        })
        function successCallback() {

          if (_.currentPath=='/user/register') {
            _.$emit('bindSuccess', {
              showSuccess        : true,
              successTitle       : '绑定成功',
              successDescription : '恭喜您，绑定成功'
            })
          }
          _.$store.commit('bindUserAccount')
        }
      }
    },
    created(){
      console.log('组件bindaccount')
    }
  }
</script>
