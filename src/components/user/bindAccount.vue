<template>
  <div id="bind-account">
    <el-dialog :visible=show title="账户注册" center :show-close="false" class="dialog-wrapper">
      <div class="ins">系统检测到您已注册过长安一家，是否继续使用该信息进行注册？</div>
      <ul>
        <li class="cell" v-if="userInfo.name"><span>姓名</span><span>{{userInfo.name|name}}</span></li>
        <li class="cell" v-if="userInfo.cardNo"><span>身份证号</span><span>{{userInfo.cardNo|IDCardNo}}</span></li>
        <li class="cell" v-if="userInfo.mobile"><span>手机号</span><span>{{userInfo.mobile|mobile}}</span></li>
        <li class="cell" v-if="userInfo.email"><span>email</span><span>{{userInfo.email|email}}</span></li>
        <li class="cell" v-if="userInfo.address"><span>联系地址</span><span>{{userInfo.address}}</span></li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <div class="primary-btn plain" @click="show=false">重新注册</div>
        <div class="primary-btn" @click="bindUserAccount">确定关联</div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default{
    name    : 'BindAccount',
    data(){
      return {
        show : true
      }
    },
    methods : {
      bindUserAccount(){
        let _ = this
        this.$post(
          'bindUserAccount', { userID : this.$store.state.userID },
          {
            showProgress   : '用户信息关联中...',
            showSuccessMsg : _.currentPath!=='/user/register',
            callback       : { success : successCallback }
          })
        function successCallback(data) {
          if (_.currentPath=='/user/register') {
            _.$emit('bindSuccess', { show : true, title : '绑定结果', content : '恭喜您，绑定成功' })
          }
          _.$store.commit('setUser', data)
        }
      }
    },
    created(){
      console.log('组件bindaccount')
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"
  .cell
    line-height 2em

  #bind-account
    .primary-btn
      width 40%
      display inline-flex

  .ins
    text-indent 2em
    margin-bottom 1em
    color striking-text-color

</style>
