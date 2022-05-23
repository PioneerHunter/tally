<template>
  <div id="app">
    <router-view v-if="isReloaded"></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  data() {
    return {
      isReloaded: true
    }
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  methods: {
    reload() {
      this.isReloaded = false
      this.$nextTick(() => {
        this.isReloaded = true
      })
    }
  }
}
</script>

<style>
body {
  position: fixed;
  top: 0;
  left: 0;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  background-image: url('');
  background-repeat: no-repeat;
  background-size: cover;
}
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
  /* color: #2c3e50; */
}
</style>
