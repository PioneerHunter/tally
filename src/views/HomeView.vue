<template>
  <div class="home">
    首页
    <div @click="() => { this.$router.push('about') }">副业</div>
    <div @click="() => { this.$router.push('/') }">登录</div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
  },
  created() {
    console.log(window.location.href)
  },
}
</script>
