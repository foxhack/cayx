<template>
  <div class="page-with-top">
    <mt-loadmore :top-method="loadTop"
                 @top-status-change="handleTopChange"
                 ref="loadmore">
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">
          <mt-spinner type="fading-circle" color="#C49A16"></mt-spinner>
        </span>
      </div>
      <div v-infinite-scroll="generateMock"
           infinite-scroll-disabled="loadMore"
           infinite-scroll-distance="10">
        <mt-cell v-for="r,index in random"
                 :title="r.date"
                 :key="index" :label="r.type">
          {{r.amount|money}}|{{index}}
        </mt-cell>
        <mt-spinner type="fading-circle" color="#C49A16" v-show="loadMore"></mt-spinner>
      </div>
    </mt-loadmore>
  </div>
</template>
<script>
  import { Spinner, Loadmore } from 'mint-ui';
  export default{
    data(){
      return {
        loadMore     : false,
        topStatus    : '',
        pid          : this.$route.params.pid,
        random       : []
      }
    },
    components : {
      'mt-spinner'  : Spinner,
      'mt-loadmore' : Loadmore
    },
    methods    : {
      loadTop(){
        let random = []
        for (let n = 0; n < 3; n++) {
          random.push({
            date   : '2018-2-'+(n+1),
            type   : (Math.random(0, 1) > 0.5 ? '买入' : '卖出'),
            amount : (Math.random(0, 1)*10000)
          })
        }
        setTimeout(() => {
          this.random = random.concat(this.random)
          this.$refs.loadmore.onTopLoaded()
        }, 2500)
      },
      handleTopChange(status) {
        this.topStatus = status;
        console.log(status)
      },
      generateMock(){
        this.loadMore=true
        let random = []
        for (let n = 0; n < 20; n++) {
          random.push({
            date   : '2018-1-'+(n+1),
            type   : (Math.random(0, 1) > 0.5 ? '买入' : '卖出'),
            amount : (Math.random(0, 1)*10000)
          })
        }
        setTimeout(() => {
          this.random = this.random.concat(random)
          this.loadMore=false
        }, 2500)
      }
    },
    watch      : {
      '$route' : 'generateMock'
    },
    created(){
      this.generateMock()
    }
  }

</script>
<style lang="stylus" scoped>
  span.rotate
    transform rotate(180deg)
</style>
