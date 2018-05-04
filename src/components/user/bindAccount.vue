<template>
  <div id="bind-account">
    <el-dialog :visible=show title="绑定账户" center :show-close="false" class="dialog-wrapper">
      <div>系统检测到您已注册过长安一家，是否使用该注册信息进行注册，并将长安严选与之关联？</div>
      <ul>
        <li>姓名：{{userInfo.name}}</li>
        <li>身份证号：{{userInfo.cardNo}}</li>
        <li>手机号：{{userInfo.mobile}}</li>
        <li>email：{{userInfo.email}}</li>
        <li>联系地址：{{userInfo.address}}</li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="show=false" style="width: 40%">重新注册</el-button>
        <el-button type="primary" @click="bindUserAccount" style="width: 40%">确定关联</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { mixin }from '@/utils/mixin'
  import { bindUserAccount } from '@/api/user'

  export default{
    name    : 'BindAccount',
    data(){
      return {
        show : true
      }
    },
    mixins  : [mixin],
    methods : {
      bindUserAccount(){
        let _ = this
        this.$post(bindUserAccount(window.localStorage.getItem('userID')), {
          showSuccessMsg : _.currentPath!=='/user/register',
          callback       : { success : successCallback }
        })
        function successCallback() {
          if (_.currentPath=='/user/register') {
            _.$emit('bindSuccess', { show : true, title : '绑定结果', content : '恭喜您，绑定成功' })
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
