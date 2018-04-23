<template>
  <div>
    <section v-if="showTransaction==2">
      <div class="title">活期资产交易记录</div>
      <mt-cell v-for="n in 10" :title="'2018-1-'+n" :key="n" :label="randomInOut[n-1]">{{randomAmount[n-1] | money}}</mt-cell>
    </section>
    <section v-if="showTransaction==3">
      <div class="title">定期资产交易记录</div>
      <mt-cell v-for="n in 10" :title="'2018-1-'+n" :key="n" :label="randomInOut[n-1]">{{randomAmount[n-1] | money}}</mt-cell>
    </section>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        showTransaction: this.$route.params.type,
        randomInOut:[],
        randomAmount: []
      }
    },
    computed:{
    },
    methods:{
      generateMock(){
        let randomInOut=[], randomAmount=[]
        for(let n=0; n<10; n++){
          randomInOut.push(Math.random(0,1)>0.5?'买入':'卖出')
          randomAmount.push(Math.random(0,1)*10000)
        }
        this.randomInOut=randomInOut
        this.randomAmount=randomAmount
      }
    },
    watch   : {
      '$route' : 'generateMock'
    },
    created(){
      this.generateMock()
    }
  }

</script>
<style lang="stylus" scoped>
  @import '../../style/base.styl'

</style>
