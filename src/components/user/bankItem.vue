<template>
  <mt-cell
      class="bank"
      :class="{'selected':selected}"
      :title="getBankName(bankCode)"
      :label="subTitle"
      :isLink="isLink">
    <div slot="icon" class="bank-icon" :style="{backgroundPosition: getBankIcon(bankCode), float:subTitle?'left':'none'}"></div>
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

  .bank-icon
    width 2em
    height 2em
    background-size 400% 500%
    background-image url('../../assets/icon/bank.jpg')
    display inline-block
    vertical-align middle
    margin-right 10px

</style>

