<template>
  <section>
    <div class="title">设置交易密码</div>
    <set-password
        inputname="password"
        v-model="password"
        v-on:isValid="setValid">
    </set-password>
    <input type="button" class="primary-btn fix-bottom" value="确定设置">
  </section>
</template>
<script>

</script>
