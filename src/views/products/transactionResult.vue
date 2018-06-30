<template>
  <div class="dialog">
    <el-steps direction="vertical" :active="0">
      <el-step :description="'交易订单号'+tid" :title=" amount | money"></el-step>
      <el-step title="到账时间以银行处理为准"></el-step>
    </el-steps>
    <div class="primary-btn fix-bottom" @click="goto">确定</div>
  </div>
</template>
<script>
  import{ Step, Steps } from 'element-ui'
  export default{
    props      : ['amount', 'tid'],
    components : {
      'el-steps' : Steps,
      'el-step'  : Step
    },
    computed   : {
      title(){
        return '成功转入'
      }
    },
    methods    : {
      goto(){
        this.$router.replace({ name : 'productList' })
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .dialog
    height 10em
    padding 10px
</style>
