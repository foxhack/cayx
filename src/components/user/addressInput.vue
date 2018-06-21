<template>
  <div id="address-input">
    <mt-cell v-if="readonly" :title="title ||'联系地址'" @click.native="alert">
      <template v-if="showRawValue">{{value}}</template>
      <template v-else>{{value|address}}</template>
    </mt-cell>
    <div v-else>
      <mt-cell v-if="showRawValue"
               title="所属地区"
               :value="area?area:'点击选择地区'"
               is-link
               @click.native="showAreaInput=true">
        <!--<span class="mint-field-state is-succuess">-->
        <!--<i class="mintui mintui-field-success"></i>-->
        <!--</span>-->
      </mt-cell>
      <mt-field v-if="showRawValue"
                label="详细地址"
                type="textarea"
                :class="{'mint-cell-allow-right':state==''}"
                disableClear
                :placeholder="placeholder || '请输详细地址'"
                :value="detail"
                :state="state"
                @input.native="check(area+' '+$event.target.value)">
      </mt-field>
      <mt-cell v-else :title="title ||'联系地址'" is-link @click.native="displayInput">{{value|address}}</mt-cell>
      <div v-if="state=='error'" class="error">{{errorMsg}}</div>
      <mt-popup class="area-picker" style="width: 100vw;" v-model="showAreaInput" position="bottom">
        <mt-picker :slots="addressArea" @change="setNewArea" showToolbar>
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
  import AREA from '@/assets/area.json'
  import { postalCode } from '@/utils/config'
  let index = 0
  let index2 = 0
  let province = AREA.map(res => {
    return res.name
  })
  let city = AREA[index].children.map(res => {
    return res.name
  })
  let area = AREA[index].children[index2].children.map(res => {
    return res.name
  })
  export default{
    name       : 'AddressInput',
    data(){
      return {
        addressArea            : [
          {
            flex      : 1,
            values    : province,
            className : 'slot1',
            textAlign : 'center'
          },
          {
            divider   : true,
            content   : '-',
            className : 'slot2'
          }, {
            flex      : 1,
            values    : city,
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
            values    : area,
            className : 'slot5',
            textAlign : 'center'
          }
        ],
        area                   : '',
        detail                 : '',
        selectedArea           : '',
        selectedAreaPostalCode : '',
        showAreaInput          : false,
        postalCode             : ''
      }
    },
    mixins     : [inputMixin],
    components : {
      'mt-popup'  : Popup,
      'mt-picker' : Picker
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
      check(val){
        this.value = val
        console.log('调用联系地址检查方法'+val)
        if (!this.area) {
          this.state = 'error'
          this.errorMsg = '请选择所属地区'
          this.$parent.state.address = false
          return
        }
        if (!VALIDATE.address.test(val)) {
          this.state = 'error'
          let min = this.area < 8 ? 8-this.area.length : 1
          let max = 40-this.area.length
          this.errorMsg = '请输入'+min+'-'+max+'个汉字'
          this.$parent.state.address = false
        } else {
          this.state = 'success'
          this.$parent.state.address = true
        }
      },
      setNewArea(picker, values) {
        console.log('触发areaChange')
        let one = values[0]
        let two = values[1]
        let index = province.indexOf(one)
        if (index >= 0 && province.length > 0) {
          city = AREA[index].children.map(res => {
            return res.name
          })
          picker.setSlotValues(1, city)
          two = values[1]
        }

        let index2 = city.indexOf(two)
        if (index2 >= 0 && city.length > 0) {
          area = AREA[index].children[index2].children.map(res => {
            return res.name
          })
          picker.setSlotValues(2, area)
        }
        this.selectedArea = values
        this.selectedAreaPostalCode = postalCode[AREA[index].code]
      },
      confirmArea(){
        this.area = this.selectedArea.join('')
        this.postalCode=this.selectedAreaPostalCode
        this.showAreaInput = false
        this.check(this.area+' '+this.detail)
      }
    },
    created(){
      if (this.value) {
        let address = this.value.split(' ')
        this.area = address[0]
        address.shift()
        this.detail = address.join()
      }
    }
  }
</script>

