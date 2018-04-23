<template>
  <div id="home">
    <main-menu></main-menu>
    <router-view></router-view>
  </div>
</template>
<script>
  import MainMenu from '@/components/menu'
  export default{
    name       : 'Home',
    data(){
      return {
      }
    },
    components : { MainMenu }

  }
</script>

