<template>
  <div class="in-out-manage">
    <section>
      <h3>进销存管理</h3>
      <div class="manage-sider-bar">
        <div @click="() => { $router.push('inManage') }">订单管理</div>
        <div @click="() => { $router.push('outManage') }">销售单管理</div>
        <div @click="() => { $router.push('storageManage') }">仓库管理</div>
      </div>
    </section>
    <router-view class="manage"></router-view>
  </div>
</template>

<script>
export default {
  name: 'manageList',
  components: {},
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang='less' scoped>
section {
  position: fixed;
  top: 11%;
  left: 10px;
  width: 10%;
  height: 70%;
  // background-color: #7E57C2;
  opacity: 0.8;
  text-align: center;
  border-radius: 5px;
  color: white;
  box-shadow: 0 0 10px #888888;
  cursor: pointer;
  .manage-sider-bar {
    margin-top: 80px;
    div {
      line-height: 40px;
    }
    div:hover {
      // background-color: #6b2fd2;
    }
    div:active {
      color: black;
    }
  }
}
section:hover {
  opacity: 1;
}
.manage {
  margin-left: 15%;
  margin-right: 5%;
}
</style>
