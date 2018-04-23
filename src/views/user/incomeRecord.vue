<template>
  <transition name="slide-left">
    <section v-if="showTransaction==1">
      <div class="title">活期帐户收益明细</div>
      <mt-cell v-for="n in 10" :title="'2018-1-'+n" :key="n">+{{randomAmount[n-1] | money}}</mt-cell>
    </section>
    <section v-if="showTransaction==2">
      <div class="title">定期帐户收益明细</div>
      <mt-cell v-for="n in 10" :title="'2018-1-'+n" :key="n">+{{randomAmount[n-1] | money}}</mt-cell>
    </section>
  </transition>
</template>
<script>
  export default{
    data(){
      return{
        showTransaction: this.$route.params.type,
        randomAmount: []
      }
    },
    computed:{
    },
    methods:{
      generateMock(){
        let randomInOut=[], randomAmount=[]
        for(let n=0; n<10; n++){
          randomAmount.push(Math.random(0,1)*10000)
        }
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
