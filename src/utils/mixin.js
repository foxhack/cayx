let mixin = {
  computed : {
    isRegisterCaej(){
      return this.$store.state.user.userStatus.isRegisterCaej
    },
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
    },
    currentPath(){
      return this.$route.path
    }
  }
}

export { mixin }
