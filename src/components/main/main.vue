<template>
  <div>
    <sider-bar />
    <router-view />
  </div>
</template>

<script>
import siderBar from './siderBar.vue'
export default {
  name: 'Main',
  components: {
    siderBar
  },
  data () {
    return {
    }
  },
  create () {
    console.log(1);
  },
  mounted () {
  },
  methods: {}
}
</script>

<style>

</style>
