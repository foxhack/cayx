<template>
  <div id="bank">
    <div v-if="currentPath=='/user/bank'" class='page-with-top-bottom'>
      <section v-if="userInfo.bindCard.length>0">
        <div class="title">已绑定的银行卡</div>
        <div v-for="b in userInfo.bindCard">
          <mt-cell
              :title="getBankName(b.bankCode)"
              :label="b.bankCardNo | bankCardNo"
              class="bank no-top-line"
              @click.native="operateBankCard(b.bindId)">
          </mt-cell>
        </div>
      </section>
      <new-bank :key="newBankId" v-on:refresh="newBankId=+new Date()"></new-bank>
      <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    </div>
    <div v-else>
      <section v-if="userInfo.bindCard.length>0">
        <div v-for="b in userInfo.bindCard">
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
        newBankId      : +new Date(),
        bankList       : BANKS,
        selectedBindId : null,
        operateBindId  : null,
        sheetVisible   : false,
        actions        : [
          { name : '移除此卡', method : this.unBindBankCard }
        ]
      }
    },
    components : { NewBank, 'mt-actionsheet' : Actionsheet },
    watch:{
      selectedBindId(){
        this.$emit('setSelectedBank')
      }
    },
    methods    : {
      getBankName(bcode){
        return this.bankList.filter(b => {return b.code==bcode})[0].name
      },
      selectBankCard(bid){
        this.selectedBindId = bid
      },
      operateBankCard(bid){
        this.sheetVisible = true
        this.operateBindId = bid
      },
      unBindBankCard(){
        let post = { userID : window.localStorage.getItem('userID'), bindId : this.operateBindId }
        let _ = this
        this.$post('unBindBankCard', post, {
          showProgress   : true,
          showSuccessMsg : true,
          callback       : { success : successCallback }
        })
        function successCallback(data) {
          _.$store.commit('setUser', data)
        }
      }
    },
    created(){
      if(this.userInfo.bindCard.length==1) this.selectedBindId=this.userInfo.bindCard[0].bindId
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (!vm.isRegister || !vm.isOpenAccount) vm.$router.push('/user')
      })
    }
  }
</script>

