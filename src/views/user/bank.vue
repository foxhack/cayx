<template>
  <div id="bank">
    <section v-if="bankUsed.length>0">
      <div class="title">当前使用的银行卡</div>
      <mt-cell @click.native="operateBank(2)"><img slot="icon" src="../../assets/images/icbc.png" alt="" height="3em" width="100%"></mt-cell>
      <!--<mt-cell :title="bankUsed.name" label="尾号0884" class="bank selected" @click.native="operateBank(2)"></mt-cell>-->
    </section>
    <section v-if="otherBindedBanks>0">
      <div class="title">其他已绑定的银行卡</div>
      <mt-cell v-for="bb in otherBindedBanks" :key="bb.bid" :title="bb.name" label="尾号****" class="bank" @click.native="operateBank(1)"></mt-cell>
    </section>
    <section>
      <router-link class='add-bank' :to="{ name: 'newbank'}">添加新卡</router-link>
    </section>
    <mt-actionsheet :actions="operator" v-model="operatorVisible"></mt-actionsheet>
  </div>
</template>
<script>
  import { Actionsheet } from 'mint-ui'
  export default{
    data(){
      return {
        bankSelected     : 2,
        operatorVisible  : false
      }
    },
    computed   : {
      bindedBanks(){
//        return this.$store.state.user.bindBanks
        return [{ bid : 1, cid : '1234', default : true }, { bid : 2, cid : '1234', default : false }]
      },
      bankUsed(){
        return this.bindedBanks.filter(b => {return b.default})[0]
      },
      otherBindedBanks(){
        return this.bindedBanks.filter(b => {return !b.default})
      },
      operator(){
        let action = []
        if (this.bankSelected!==2) action.push({ name : '设置为默认卡', method : this.makeDefaultBank })
        action.push({ name : '解除绑定', method : this.unBindBank })
        return action
      }
    },
    methods    : {
      operateBank(id){
        this.bankSelected = id
        this.operatorVisible = true
      },
      makeDefaultBank(){
        this.showR()
      },
      unBindBank(){
        this.showR()
      },
      showR(){
        this.$toast({
          message   : '操作成功',
          iconClass : 'icon icon-success'
        });
      }
    },
    props      : ['id'],
    components : {
      'mt-actionsheet' : Actionsheet
    }

  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"
  #bank
    padding 1em 0

  .bank
    /*font-family font-family-bold*/
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

  .title, .tip
    padding-left 3px
    font-size 0.8em
    font-family font-family-light
    {third-level}

  .tip
    {second-level}
    color: secondary-text-color
    text-align right

  .add-bank
    @extend .center
    width 90%
    margin 0 auto
    line-height 4em
    font-size 2em
    {third-level}
    border 2px dashed
    border-radius 0.2em

</style>
