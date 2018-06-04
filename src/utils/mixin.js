let mixin = {
  computed : {
    isRegisterCaej(){
      return this.$store.state.user.userStatus.isRegisterCaej
    },
    isRegister(){
      return this.$store.state.user.userStatus.isRegisterCayx
    },
    isOpenAccount(){
      return this.$store.state.user.userStatus.isOpenAccount
    },
    isRiskAppraisal(){
      return this.$store.state.user.userStatus.isRiskAppraisal
    },
    isSetPassword(){
      return this.$store.state.user.userStatus.isSetPassword
    },
    bindCard(){
      return this.$store.state.user.userInfo.bindCard
    },
    userInfo(){
      return this.$store.state.user.userInfo
    },
    asset(){
      return this.$store.state.asset
    },
    productList(){
      return this.$store.getters.productsWithRate
    },
    currentPath(){
      return this.$route.path
    }
  }
}

let inputMixin = {
  data(){
    return {
      value        : this.initValue,
      showRawValue : !this.filterValue,
      state        : '',
      errorMsg     : ''
    }
  },
  props   : {
    initcheck   : Boolean,
    readonly    : Boolean,
    initValue   : [String, Number],
    filterValue : Boolean,
    title       : String,
    placeholder : String
  },
  methods : {
    displayInput(){
      this.showRawValue = true
      this.check(this.value)
    },
    alert(){
      this.$message('您已开户，不能修改此信息。')
    }
  },
  mounted(){
    if (this.initcheck) {
      this.showRawValue = true
      this.check(this.value)
    }
  }
}

export { mixin, inputMixin }
