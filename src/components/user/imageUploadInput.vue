<template>
  <div class="upload center">
    <div>
      <div v-show="!dataUrl">
        <template v-if="err">{{err}}</template>
        <template v-else>
          <slot></slot>
        </template>
      </div>
      <img v-show="dataUrl" :id="'i'+id">
      <input v-if="isAndroid" type="file" accept="image/*" capture="camera" multiple @change="getFile($event)">
      <input v-else type="file" accept="image/jpg,image/jpeg,image/png,image/gif"  @change="getFile($event)">
    </div>
    <canvas :id="'c'+id" style="display: none"></canvas>
  </div>
</template>
<script>
  import { Indicator } from 'mint-ui'
  export default{
    data(){
      return {
        value     : null,
        dataUrl   : null,
        err       : '',
        isAndroid : navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1
      }
    },
    props   : ['title', 'name', 'id'],
    methods : {
      check(val){
        //在这里写更多的校验规则
        if (val) {
          this.$parent.state[this.name] = true
        } else {
          this.$parent.state[this.name] = false
        }
      },
      getFile(event){
        let fileData = event.target.files[0]
        let canvas = document.getElementById('c'+this.id)
        let image = document.getElementById('i'+this.id)
        if (!fileData) {
          console.log('没有选择文件')
          return
        }
        if (!canvas.getContext("2d")) {
          this.err('抱歉，您的浏览器不支持图片浏览/压缩功能，请进行升级后再操作。')
          return
        }
        this.displayAndCompressImage(fileData, image, canvas)
      },
      displayAndCompressImage(imageData, image, canvas){
        if (!window.FileReader) {
          this.err = "抱歉，您的浏览器不支持图片浏览/压缩功能，请进行升级，或者自行将图片压缩至1M以下再操作。"
          this.value = imageData
          this.check(this.value)
          return
        }
        let reader = new FileReader()
        Indicator.open('图像获取中，请稍候......')
        reader.readAsDataURL(imageData)
        reader.onload = e => {
          image.src = this.dataUrl = e.target.result
          image.onload = e => {
            canvas.width = 800
            canvas.height = 600
            canvas.getContext("2d").drawImage(image, 0, 0, 800, 600)
            let cDataUrl = canvas.toBlob(b => {
              Indicator.close()
              this.value = b
              this.check(this.value)
            }, imageData.type);
          }
        }
        reader.onerror = (err) => {
          this.err = err
          console.log('出错了')
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"
  .upload
    width calc(100vw - 20px)
    color silver
    margin 10px auto
    line-height 0
    height calc(62.8vw - 12.6px)
    font-size extra-large
    {third-level}
    border 2px dashed
    border-radius 0.2em
    position relative

  img
    width 100%
    height calc(62.8vw - 12.6px - 4px)

  input[type='file']
    opacity 0
    position absolute
    top 0
    bottom 0
    left 0

</style>
