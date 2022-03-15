<template>
  <div class="sider-bar">
    <div class="sider-icon" @click="() => { $router.push('manage') }">
      <el-tooltip class="item" effect="light" content="进销存管理" placement="right">
        <i class="icon el-icon-edit-outline"></i>
      </el-tooltip>
    </div>
    <div class="sider-icon" @click="() => { $router.push('invoice') }">
      <el-tooltip class="item" effect="light" content="发票" placement="right">
        <i class="icon el-icon-edit-outline"></i>
      </el-tooltip>
    </div>
    <div class="sider-icon" @click="() => { $router.push('reportForms') }">
      <el-tooltip class="item" effect="light" content="报表" placement="right">
        <i class="icon el-icon-edit-outline"></i>
      </el-tooltip>
    </div>
    <div class="sider-icon">
      <el-tooltip class="item" effect="light" content="管理" placement="right">
        <i class="icon el-icon-setting"></i>
      </el-tooltip>
    </div>
    <div class="sider-icon" @click="() => { $router.push('/') }">
      <el-tooltip class="item" effect="light" content="收起" placement="right">
        <i class="icon el-icon-s-fold"></i>
        <i class="icon el-icon-s-unfold"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import router from '@/router/index'

export default {
  name: 'Main',
  components: {},
  data () {
    return {
      router,
    }
  },
  create () {
    console.log(1);
  },
  mounted () {
    // console.log(router, 2);
  },
  methods: {}
}
</script>

<style lang='less' scoped>
.sider-bar {
  z-index: 100;
  position: fixed;
  top: 10px;
  left: 10px;
  width: 5%;
  padding: 20px 10px;
  background-color: white;
  opacity: 0.5;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  .sider-icon {
    margin-top: 20px;
    cursor: pointer;
  }
  .icon {
    font-size: 25px;
  }
}
</style>
