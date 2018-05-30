<template>
    <section class="progress hr-line flex-row">
      <div class="step flex-col" :class="{active:p.step<=currentProgress}" v-for="p in progress">
        <div class="img center" :class="{active:p.step<=currentProgress}">{{p.step}}</div>
        <div>{{p.title}}</div>
      </div>
    </section>
</template>
<script>

  export default{
    data(){
      return {
        progress          : [
          { step : 1, title : '注册长安严选' },
          { step : 2, title : '开户' },
          { step : 3, title : '风险测评' },
        ],
      }
    },
    computed   : {
      currentProgress(){
        if (!this.isRegister) {
          return 1
        }
        else {
          if (!this.openAccount) {
            return 2
          }
          else {
            return 3
          }
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"

  .progress
    color primary-text-color
    position relative
    background #fff
    height 4em
    justify-content space-around
    align-items center
    .step.active
      color secondary-text-color
      {first-level}
    .step
      align-items center
      {third-level}
      color primary-text-color
      font-size 0.8em
      .img
        width 2em
        height 2em
        background-color #f5f5f5
        border-radius 50%
        color #fff
        margin-bottom: 0.2em
      .img.active
        background-color secondary-text-color
</style>
