<template>
  <div class="setting">
    <h3 class="center">设置</h3>
    <!-- <div @click="() => { $router.push('/') }">退出</div> -->
    <div class="theme">
      <h3>主题切换</h3>
      <el-radio-group v-model="radio">
        <el-radio :label="3">天空蓝</el-radio>
        <el-radio :label="6">高贵紫</el-radio>
        <el-radio :label="9">炫彩</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'settings',
  components: {},
  data () {
    return {
      radio: 3,
    }
  },
  created () {},
  mounted () {},
  methods: {}
}
</script> 

<style lang='less' scoped>
.setting {
  max-width: 960px;
  margin: 0 auto;
  background-color: rgb(252, 246, 246);
}
</style>
