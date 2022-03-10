<template>
  <div class="about">
    <h1
      @click="() => { this.$router.push('home') }"
    >This is an about page</h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  // name: 'About',
  components: {
  },
  created() {
    console.log(window.location.href)
  },
}
</script>