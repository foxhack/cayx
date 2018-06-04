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
        <image-upload-input
            inputname="cardPhoto"
            title="点击上传"
            v-on:getImage="getImage">
        </image-upload-input>
        <image-upload-input
            inputname="cardPhoto"
            title="点击上传"
            v-on:getImage="getImage">
        </image-upload-input>
        <input type="button" class="primary-btn fix-bottom" @click="submit" value="提交">
      </div>
    </div>
  </transition>
</template>
<script>
  import { api } from '@/api/api'
  import ImageUploadInput from '@/components/user/imageUploadInput'
  export default{
    name       : 'Instruction',
    data(){
      return {
        post : {
          userID     : window.localStorage.getItem('userID'),
          cardPhotos : []
        }
      }
    },
    props      : ['title'],
    components : { ImageUploadInput },
    methods    : {
      getImage(img){
        this.post.cardPhotos.push(img)
      },
      close(){
        this.$emit('closeInstruction')
      },
      submit(){
        let post = new FormData()
        post.append('cardPhotos', this.post.cardPhotos[0])
        post.append('cardPhotos', this.post.cardPhotos[1])
        post.append('userID', this.post.userID)
        this.$post(api('uploadIDCard', post))
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
