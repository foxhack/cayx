<template>
  <div class="time-line-wrapper">
    <div class="line"></div>
    <div class="time-line-content flex-row">
      <div class="time-line-item" v-for="i in items">
        <div class="dot-wrapper">
          <div class="dot"></div>
        </div>
        <div class="time-line-title-text" v-if="i.title">{{i.title}}</div>
        <div class="time-line-sub-title-text" v-if="i.subTitle">{{i.subTitle}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name  : 'TimeLine',
    props : ['items']
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"
  .time-line-wrapper
    color striking-text-color

  .line
    background striking-text-color
    height 2px

  .time-line-content
    margin-top -5px

  .time-line-item
    text-align center
    flex 1
    font-size 14px
    color #5e5e5e
    font-weight 200
    padding-top 20px
    position relative
    .dot-wrapper
      position: absolute;
      z-index: 10;
      top: 0;
      left: 50%;
      margin-left: -6px;
      width: 12px;
      height: 12px;
      .dot
        width: 8px;
        height: 8px;
        margin-left 2px
        border-radius 50%
        background striking-text-color
  .time-line-title-text
    opacity 0.75
</style>
