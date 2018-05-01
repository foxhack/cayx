let mixin = {
  computed : {
    isRegister(){
      return this.$store.state.user.userStatus.isRegisterCayx
    },
    isBindCard(){
      return this.$store.state.user.userStatus.isBindCard
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
    }
  }
}

export { mixin }
