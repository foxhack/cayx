<template>
  <transition name="slide">
    <div id="instruction-wrapper">
      <div class="top center hr-line">
        <div class="go-back arrow-left" @click="close">
          &nbsp;&nbsp;返回
        </div>
        <div class="">{{title}}</div>
      </div>
      <div class="content">
        说明页组件
        <image-upload-input></image-upload-input>
      </div>
    </div>
  </transition>
</template>
<script>
  import ImageUploadInput from '@/components/user/imageUploadInput'
  export default{
    data(){
      return {
      }
    },
    name       : 'Instruction',
    props      : ['title'],
    components : { ImageUploadInput },
    methods    : {
      close(){
        this.$emit('closeInstruction')
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base.styl"
  #instruction-wrapper
    position fixed
    left 0
    top 0
    right 0
    min-height 100vh
    z-index 2001
    background-color #fff
    padding-top calc(2.8em + 10px)

    .top
      position fixed
      z-index 2001
      left 0
      top 0
      right 0
      height 2.8em
      background-color secondary-text-color
      color white

    .go-back
      position absolute
      left 10px

</style>
