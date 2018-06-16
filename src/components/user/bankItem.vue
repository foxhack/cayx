<template>
  <mt-cell
      class="bank"
      :class="{'selected':selected}"
      :title="getBankName(bankCode)"
      :label="subTitle"
      :isLink="isLink">
    <div v-if="getBankIcon(bankCode)" slot="icon" class="bank-img" :style="{backgroundPosition: getBankIcon(bankCode), float:subTitle?'left':'none'}"></div>
    <svg v-else slot="icon" class="bank-icon" aria-hidden="true" :style="{float:subTitle?'left':'none'}">
      <use xlink:href="#icon-yinxingqia"></use>
    </svg>
  </mt-cell>
</template>
<script>
  import { BANKS } from '@/utils/config'

  export default{
    data(){
      return {}
    },
    props   : {
      bankCode   : { type : String, required : true },
      bankBindId : { type : String, required : false },
      selected   : { type : Boolean },
      subTitle   : { type : String },
      isLink     : { type : Boolean }
    },
    methods : {
      getBankName(bcode){
        return BANKS.filter(b => {return b.code==bcode})[0].name
      },
      getBankIcon(bcode){
        return BANKS.filter(b => {return b.code==bcode})[0].logoPos
      },
      getBankIconStyle(bankCode){
        let bankIcon=this.getBankIcon(bankCode)
        if(bankIcon){
          return ['bank-img',{backgroundPosition: bankIcon, float:this.subTitle?'left':'none'}]
        }else{
          return ['bank-icon']

        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"

  .bank.selected
    position relative

  .bank.selected:before
    content ''
    position absolute
    top 50%
    transform translateY(-50%)
    right 1em
    width 1.2em
    height 1.2em
    border-radius 50%
    background-color secondary-text-color

  .bank.selected:after
    content ''
    position absolute
    top calc(50% - 0.1em)
    transform translateY(-50%) scale(0.5) rotate(45deg)
    right 1.2em
    width 0.8em
    height 1.2em
    border-right 2px solid white
    border-bottom 2px solid white

  .bank-img
    width 2em
    height 2em
    background-size 500% 500%
    background-image url('../../assets/icon/banks.jpg')
    display inline-block
    vertical-align middle
    margin-right 10px

  .bank-icon
    width 2em
    height 2em
    display inline-block
    vertical-align middle
    margin-right 10px
    fill primary-text-color
</style>

