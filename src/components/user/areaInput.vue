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
        area                 : new Area(areaData),
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
        if (!!val || (val && val.length!==6)) {
          this.state = 'error'
          this.errorMsg = '请选择所属地区'
          return
        }
        this.state = 'success'
        this.$parent.state.areaCode = true
      },
      setNewArea(picker, values) {
        if (!values[0]) {
          console.log('初始化地区列表')
          //初始化列表
          this.area.initArea()
          this.addressArea[0].values = this.area.getList.call(this.area.province).map(res => {return res.name})
          this.addressArea[0].defaultIndex = this.area.getSelectedIndex.call(this.area.province)
          this.addressArea[2].values = this.area.getList.call(this.area.city).map(res => {return res.name})
          this.addressArea[2].defaultIndex = this.area.getSelectedIndex.call(this.area.city)
          this.addressArea[4].values = this.area.getList.call(this.area.district).map(res => {return res.name})
          this.addressArea[4].defaultIndex = this.area.getSelectedIndex.call(this.area.district)
          this.selectedAreaFullName = this.area.getAreaFullName()
          this.selectedAreaCode = this.area.getSelectedCode.call(this.area.district)
        } else {
          if (!values[0] || !values[1] || !values[2]) {
            console.log('发生错误，所选值有误')
            return
          }
          this.area.setSelectedItem.call(this.area.province, 'name', values[0])
          this.addressArea[0].defaultIndex = this.area.getSelectedIndex.call(this.area.province)
          this.area.city.setList()
          this.addressArea[2].values = this.area.getList.call(this.area.city).map(res => {return res.name})
          this.area.setSelectedItem.call(this.area.city, 'name', values[1])
          this.addressArea[2].defaultIndex = this.area.getSelectedIndex.call(this.area.city)
          this.area.district.setList()
          this.addressArea[4].values = this.area.getList.call(this.area.district).map(res => {return res.name})
          this.area.setSelectedItem.call(this.area.district, 'name', values[2])
          this.addressArea[4].defaultIndex = this.area.getSelectedIndex.call(this.area.district)
          this.selectedAreaFullName = values[0]+values[1]+values[2]
          this.selectedAreaCode = this.area.getSelectedCode.call(this.area.district)
        }
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
        this.addressArea[0].values = this.area.getList.call(this.area.province).map(res => {return res.name})
        this.addressArea[0].defaultIndex = this.area.getSelectedIndex.call(this.area.province)
        this.addressArea[2].values = this.area.getList.call(this.area.city).map(res => {return res.name})
        this.addressArea[2].defaultIndex = this.area.getSelectedIndex.call(this.area.city)
        this.addressArea[4].values = this.area.getList.call(this.area.district).map(res => {return res.name})
        this.addressArea[4].defaultIndex = this.area.getSelectedIndex.call(this.area.district)
        this.areaFullName = this.area.getAreaFullName()
      }
    }
  }
</script>

