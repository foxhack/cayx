<template>
  <div>
    <div class="upload center" label="front">正面</div>
    <input type="file" name="front">
  </div>
</template>
<script>
  export default{}
</script>
<style lang="stylus" scoped>
  @import "../../style/base"

  .upload
    width 90%
    margin 10px auto
    line-height 4em
    font-size 2em
    {third-level}
    border 2px dashed
    border-radius 0.2em
</style>
