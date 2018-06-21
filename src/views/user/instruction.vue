<template>
  <transition name="slide">
    <div id="instruction-wrapper" class="page-with-top-bottom">
      <div class="top center hr-line">
        <div class="go-back arrow-left" @click="close">
          &nbsp;&nbsp;返回
        </div>
        <div class="">{{title}}</div>
      </div>
      <div class="content">
        说明页组件
      </div>
      <div>
        <mt-picker :slots="addressArea" @change="setNewArea" valueKey="name"></mt-picker>
        <p>选择地区{{selectedProvince}} {{selectedCity}} {{selectedCounty}}</p>
        <p>邮编{{selectedCode}}</p>
      </div>
    </div>
  </transition>
</template>
<script>
  import { Picker } from 'mint-ui';
  import AREA from '@/assets/area.json'
  export default{
    name       : 'Instruction',
    data(){
      return {
        addressArea      : [
          {
            flex         : 1,
            defaultIndex : 0,
            values       : this.getArea(AREA),
            className    : 'slot1',
            textAlign    : 'center'
          },
          {
            divider   : true,
            content   : '-',
            className : 'slot2'
          }, {
            flex      : 1,
            values    : this.getArea(AREA[0].children),
            className : 'slot3',
            textAlign : 'center'
          },
          {
            divider   : true,
            content   : '-',
            className : 'slot4'
          },
          {
            flex      : 1,
            values    : this.getArea(AREA[0].children[0].children),
            className : 'slot5',
            textAlign : 'center'
          }
        ],
        selectedProvince : '省',
        selectedCity     : '市',
        selectedCounty   : '区/县',
        selectedCode     : ''
      }
    },
    props      : ['title'],
    components : {
      'mt-picker' : Picker
    },
    methods    : {
      getFile(event){
        let file = event.target.files[0]
        if (!file) {
          console.log('没有文件')
          return
        }
        let begin = (file.size/1024/1024).toFixed(2)+'M'
        let fileType = file.type
        this.canvas = document.getElementById('c-test')
        let image = document.getElementById('i-test')
        let reader = new FileReader()
        let _ = this
        reader.readAsDataURL(file)
        reader.onload = e => {
          image.src = e.target.result
          image.onload = e => {
            _.canvas.width = 800
            _.canvas.height = 600
            _.canvas.getContext("2d").drawImage(image, 0, 0, 800, 600)
            let cDataUrl = _.canvas.toBlob(b => {
              let after = (b.size/1024/1024).toFixed(2)+'M'
              console.log('压缩前'+begin, '压缩后'+after)
              this.blob = b
            }, fileType);
          }

        }
      },
      setNewArea(picker, values) {
        console.log('触发areaChange')
        let subArea = this.getArea(AREA[values[0].index].children)
        let subSubArea = this.getArea(AREA[values[0].index].children[values[1].index].children)
        picker.setSlotValues(1, subArea)
        picker.setSlotValues(2, subSubArea)
        this.selectedProvince = values[0].name;
        this.selectedCity = values[1].name;
        this.selectedCounty = values[2].name;
        this.selectedCode = AREA[values[0].index].children[values[1].index].children[values[2].index].code;
      },
      getArea(parentArea){
        let area = []
        parentArea.forEach((value, index) => area.push({ name : value.name, index : index }))
        return area
      },
      close(){
        this.$emit('closeInstruction')
      },
    },
    mounted(){
      // this.myAddressSlots[0].values=this.getArea()
      // this.$nextTick(() => { //vue里面全部加载好了再执行的函数  （类似于setTimeout）
      //   this.myAddressSlots[0].defaultIndex = 0
      // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
      //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
      //  });
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
    z-index 2000
    background-color white

    .top
      position absolute
      z-index 1
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
