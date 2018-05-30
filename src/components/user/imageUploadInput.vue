<template>
  <div class="upload center">
    <div v-if="!img">{{title}}{{err}}</div>
    <img v-else :src="img">
    <input type="file" accept="image/jpg,image/jpeg,image/png,image/gif" @change="getFile($event)">
  </div>
</template>
<script>
  export default{
    data(){
      return {
        img     : null,
        value   : null,
        err     : '',
      }
    },
    props   : ['title', 'inputname', 'initcheck'],
    methods : {
      check(val){
        //在这里写更多的校验规则
        if (val) {
          this.setValid(true)
          this.$emit('getImage', val)
        } else {
          this.setValid(false)
        }
      },
      getFile(event){
        console.log('发生改变')
        this.value = event.target.files[0]
        this.check(this.value)
        this.displayImage(this.value)
      },
      displayImage(image){
        if (!window.FileReader) {
          this.err="您的浏览器不支持图片浏览功能"
          return
        }
        let reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onload = e => {
          this.img = e.target.result
          this.$emit('getImageUrl', this.img)
        }
        reader.onerror = (err) => {
          this.err = err
          console.log('出错了')
        }
      },
      setValid(isValid){
        this.$emit('isValid', { 'key' : this.inputname, 'isValid' : isValid })
      }
    },
    created(){
      if (this.initcheck) this.check(this.value)
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"
  .upload
    width calc(100vw - 20px)
    color silver
    margin 10px auto
    height calc(62.8vw - 12.6px)
    font-size extra-large
    {third-level}
    border 2px dashed
    border-radius 0.2em
    position relative

  img
    width 100%
    height 100%

  input[type='file']
    opacity 0
    line-height 6.5em
    position absolute
    top 0
    left 0
</style>
