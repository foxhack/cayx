<template>
  <div id="bank">
    <div v-if="currentPath=='/user/bank'" class='page-with-top'>
      <section v-if="bindCard.length>0">
        <div class="title">已绑定的银行卡</div>
        <bank-item v-for="b in userInfo.bindCard" class="no-top-line"
                   :key="b.bindId"
                   :bankCode="b.bankCode"
                   :bankBindId="b.bindId"
                   :subTitle="b.bankCardNo | bankCardNo"
                   @click.native="operateBankCard(b.bindId)">
        </bank-item>
      </section>
      <new-bank :key="newBankId" v-on:refresh="newBankId=+new Date()"></new-bank>
      <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    </div>
    <div v-else>
      <section v-if="bindCard.length>0">
        <bank-item v-for="b in userInfo.bindCard" class="no-top-line"
                   :key="b.bindId"
                   :bankCode="b.bankCode"
                   :bankBindId="b.bindId"
                   :selected="b.bindId==selectedBindId"
                   :subTitle="b.bankCardNo | bankCardNo"
                   @click.native="selectBankCard(b.bindId)">
        </bank-item>
      </section>
    </div>
  </div>
</template>
<script>
  import { BANKS } from '@/utils/config'
  import { Actionsheet } from 'mint-ui'
  import BankItem from '@/components/user/bankItem'
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
    components : { BankItem, NewBank, 'mt-actionsheet' : Actionsheet },
    watch      : {
      selectedBindId(){
        this.$emit('setSelectedBank')
      }
    },
    methods    : {
      selectBankCard(bid){
        this.selectedBindId = bid
      },
      operateBankCard(bid){
        console.log(bid)
        this.sheetVisible = true
        this.operateBindId = bid
      },
      unBindBankCard(){
        let post = { userID : this.$store.state.userID, bindId : this.operateBindId }
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
      if (this.userInfo.bindCard.length==1) this.selectedBindId = this.userInfo.bindCard[0].bindId
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (!vm.isRegister || !vm.isOpenAccount) vm.$router.push('/user')
      })
    }
  }
</script>

