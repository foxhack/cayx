<template>
  <div id="area-input">
    <mt-cell v-if="readonly" :title="title ||'所属地区'" @click.native="alert">
      <template v-if="showRawValue">{{areaFullName}}</template>
      <template v-else>{{areaFullName|address}}</template>
    </mt-cell>
    <div v-else>
      <div @click="show">
        <mt-field v-if="showRawValue"
                  readonly
                  label="所属地区"
                  :value="areaFullName|limit(10)"
                  :state="state">
        </mt-field>
        <mt-cell v-else
                 :title="title ||'所属地区'"
                 is-link>
          {{areaFullName|limit(10)|address}}
        </mt-cell>
      </div>
      <div v-if="state=='error'" class="error">{{errorMsg}}</div>
      <mt-popup class="area-picker" style="width: 100vw;" v-model="showAreaInput" position="bottom">
        <mt-picker :slots="addressArea" @change="setNewArea" showToolbar :visibleItemCount="7">
          <span @click="showAreaInput=false">取消</span>
          <span @click="confirmArea">确定</span>
        </mt-picker>
      </mt-popup>
    </div>
  </div>
</template>
<script>
  import { VALIDATE } from '@/utils/config'
  import { inputMixin } from '@/utils/mixin'
  import { Popup, Picker } from 'mint-ui';
  import { Area } from '@/utils/common'
  import areaData from '@/assets/area.json'

  export default{
    name       : 'AreaInput',
    data(){
      return {
        area                 : Area(areaData),
        addressArea          : [
          {
            flex         : 1,
            values       : null,
            defaultIndex : 0,
            className    : 'slot1',
            textAlign    : 'center'
          },
          {
            divider   : true,
            content   : '-',
            className : 'slot2'
          }, {
            flex         : 1,
            values       : null,
            defaultIndex : 0,
            className    : 'slot3',
            textAlign    : 'center'
          },
          {
            divider   : true,
            content   : '-',
            className : 'slot4'
          },
          {
            flex         : 1,
            values       : null,
            defaultIndex : 0,
            className    : 'slot5',
            textAlign    : 'center'
          }
        ],
        showAreaInput        : false,
        areaFullName         : '',
        selectedAreaFullName : '',
        selectedAreaCode     : ''
      }
    },
    mixins     : [inputMixin],
    components : {
      'mt-popup'  : Popup,
      'mt-picker' : Picker
    },
    filters    : {
      limit(s, l){
        return s.substr(0, l)
      }
    },
    watch      : {
      showAreaInput(val){
        if (val) {
          document.body.style = "position:fixed; left:0; right:0; overflow-y:hidden"
        } else {
          document.body.style = ""
        }
      }
    },
    methods    : {
      show(){
        this.showAreaInput = true
        this.displayInput()
      },
      check(val){
        console.log('调用联系所属地区检查方法'+val)
        if (!val || (val && val.length!==6)) {
          this.state = 'error'
          this.errorMsg = '请选择所属地区'
          return
        }
        this.state = 'success'
        this.$parent.state.areaCode = true
      },
      initAreaList(){
        this.area.initArea()
        this.addressArea[0].values = this.area.province.getList().map(res => {return res.name})
        this.addressArea[0].defaultIndex = this.area.province.getSelectedIndex()
        this.addressArea[2].values = this.area.city.getList().map(res => {return res.name})
        this.addressArea[2].defaultIndex = this.area.city.getSelectedIndex()
        this.addressArea[4].values = this.area.district.getList().map(res => {return res.name})
        this.addressArea[4].defaultIndex = this.area.district.getSelectedIndex()
        this.selectedAreaFullName = this.area.getAreaFullName()
        this.selectedAreaCode = this.area.district.getSelectedCode()
      },
      setNewArea(picker, values) {
        if (!values[0] || !values[1] || !values[2]) {
          this.initAreaList()
          console.log('发生错误，所选值有误')
          return
        }
        this.area.province.setSelectedItem('name', values[0])
        this.addressArea[0].defaultIndex = this.area.province.getSelectedIndex()
        this.area.city.setList()
        this.addressArea[2].values = this.area.city.getList().map(res => {return res.name})
        this.area.city.setSelectedItem('name', values[1])
        this.addressArea[2].defaultIndex = this.area.city.getSelectedIndex()
        this.area.district.setList()
        this.addressArea[4].values = this.area.district.getList().map(res => {return res.name})
        this.area.district.setSelectedItem('name', values[2])
        this.addressArea[4].defaultIndex = this.area.district.getSelectedIndex()
        this.selectedAreaFullName = values[0]+values[1]+values[2]
        this.selectedAreaCode = this.area.district.getSelectedCode()
      },
      confirmArea(){
        this.areaFullName = this.selectedAreaFullName
        this.value = this.selectedAreaCode
        this.check(this.value)
        this.showAreaInput = false
      }
    },
    created(){
      if (this.value) {
        this.area.setAreaByCode(this.value)
        this.addressArea[0].values = this.area.province.getList().map(res => {return res.name})
        this.addressArea[0].defaultIndex = this.area.province.getSelectedIndex()
        this.addressArea[2].values = this.area.city.getList().map(res => {return res.name})
        this.addressArea[2].defaultIndex = this.area.city.getSelectedIndex()
        this.addressArea[4].values = this.area.district.getList().map(res => {return res.name})
        this.addressArea[4].defaultIndex = this.area.district.getSelectedIndex()
        console.log('created阶段初始化得到的name并赋值'+this.area.getAreaFullName())
        this.areaFullName = this.area.getAreaFullName()
      }
    }
  }
</script>

