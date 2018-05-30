<template>
  <div id="bank">
    <div v-if="currentPath=='/user/bank'" class='page-with-top-bottom'>
      <section v-if="bindCard.length>0">
        <div v-for="b in bindCard">
          <mt-cell
              :title="getBankName(b.bankCode)"
              :label="b.bankCardNo | bankCardNo"
              class="bank no-top-line"
              @click.native="operateBankCard(b.bindId)">
            <template v-if="b.bindId==defaultBindId">默认卡</template>
          </mt-cell>
        </div>
      </section>
      <new-bank :key="newBankId" v-on:refresh="newBankId=+new Date()"></new-bank>
      <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    </div>
    <div v-else>
      <section v-if="bindCard.length>0">
        <div v-for="b in bindCard">
          <mt-cell
              :title="getBankName(b.bankCode)"
              :label="b.bankCardNo | bankCardNo"
              class="bank no-top-line"
              :class="{selected:b.bindId==selectedBindId}"
              @click.native="selectBankCard(b.bindId)">
          </mt-cell>
        </div>
      </section>
    </div>
  </div>

</template>
<script>
  import { BANKS } from '@/utils/config'
  import { Actionsheet } from 'mint-ui'
  import NewBank from '@/views/user/newbank'

  export default{
    data(){
      return {
        newBankId      : + new Date(),
        bankList       : BANKS,
        defaultBindId  : null,
        selectedBindId : null,
        operateBindId  : null,
        sheetVisible   : false,
        actions        : [
          { name : '设置为默认卡', method : this.setDefault },
          { name : '移除此卡', method : this.unBindBankCard }
        ]
      }
    },
    components : { NewBank, 'mt-actionsheet' : Actionsheet },
    watch:{
      'userInfo.defaultBindCard'(val){
        if(val) this.defaultBindId=val
      }
    },
    methods    : {
      initData(val){
        this.defaultBindId = val.defaultBindId
        this.selectedBindId = val.defaultBindId
      },
      getBankName(bcode){
        return this.bankList.filter(b => {return b.code==bcode})[0].name
      },
      selectBankCard(bid){
        this.selectedBindId = bid
        this.$emit('getSelectedCard', bid)
      },
      operateBankCard(bid){
        this.sheetVisible = true
        this.operateBindId = bid
      },
      setDefault(){
        let post = { userID : this.userInfo.userID, bindID : this.operateBindId }
        console.log(post)
        let _ = this
        this.$post('setDefaultBindCard', post, false, {
          showProgress   : true,
          showSuccessMsg : true,
          callback       : { success : successCallback }
        })
        function successCallback() {
          _.defaultBindId = _.operateBindId
          _.$store.commit('setDefaultBindCard', _.operateBindId)
        }
      },
      unBindBankCard(){
        if (this.operateBindId==this.defaultBindId) {
          if (this.bindCard.length==1) {
            this.$message('此卡已被设置为默认卡，不能移除，请添加一张新卡，并设置为默认卡')
          } else {
            this.$message('此卡已被设置为默认卡，不能移除，请先更换默认卡')
          }
          return
        }
        let post = { userID : window.localStorage.getItem('userID'), bindId : this.operateBindId }
        console.log(post)
        let _ = this
        this.$post('unBindBankCard', post, false, {
          showProgress   : true,
          showSuccessMsg : true,
          callback       : { success : successCallback }
        })
        function successCallback() {
          _.$post('getUserByUserID', { userID : post.userID }, false, {
            showProgress : '信息更新中...',
            callback     : { success : successCallback }
          })
          function successCallback(data) {
            _.$store.commit('setUser', data)
          }
        }
      }
    },
    created(){
      this.defaultBindId = this.userInfo.defaultBindCard
      this.selectedBindId = this.userInfo.defaultBindCard
      this.$emit('getSelectedCard', this.selectedBindId)
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (!vm.isRegister || !vm.isOpenAccount) vm.$router.push('/user')
      })
    }
  }
</script>

