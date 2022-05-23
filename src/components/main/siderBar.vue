<template>
  <!-- <div class="sider-bar"> -->
  <div class="sider-bar">
    <div v-show="!show" class="shrink"  @click="foldMenu">
      <i class="icon el-icon-caret-right"></i><span>展开</span>
    </div>
    <div v-show="show" class="items">
      <a class="item active"  @click="() => { $router.push('inManage') }">
        <i class="icon el-icon-edit"></i><span>进销存</span>
      </a>
      <a class="item" @click="() => { $router.push('salary') }">
        <i class="icon el-icon-money"></i><span>工资</span>
      </a>
      <a class="item" @click="() => { $router.push('invoice') }">
        <i class="icon el-icon-s-check"></i><span>发票</span>
      </a>
      <a class="item" @click="() => { $router.push('reportForms') }">
        <i class="icon el-icon-s-data"></i><span>报表</span>
      </a>
      <a class="item" @click="() => { $router.push('set') }">
        <i class="icon el-icon-setting"></i><span>设置</span>
      </a>
      <a class="item" @click="foldMenu">
        <i class="icon el-icon-caret-left"></i><span>隐藏</span>
      </a>
    </div>
  </div>
</template>

<script>
import router from '@/router/index'

export default {
  name: 'SiderBar',
  components: {},
  data () {
    return {
      router,
      show: true,
    }
  },
  create () {
    console.log(1);
  },
  mounted () {
    // console.log(router, 2);
  },
  methods: {
    foldMenu() {
      this.show = !this.show
    },
  }
}
</script>

<style lang='less' scoped>
// @import '@/assets/siderBar.css';
.sider-bar {
  z-index: 100;
  position: fixed;
  bottom: 5%;
  // left: calc(50% - 150px);
  left: 10%;
  cursor: pointer;
  
  // background-color: rgba(126, 87, 194, 0.5);
  border-radius: 5px;
  color: white;
  .shrink {
    width: 60px;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .items {
    display: flex;
    opacity: 0.8;
    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 10px 0;
      width: 60px;
      height: 60px;
      text-decoration: none;
      .icon {
        transition: 0.5s;
      }
      span {
        display: none;
      }
    }
    a:hover .icon {
      transform: translateY(-35px);
      opacity: 0;
    }
    a:hover span {
      display: inline;
    }
  }
}
</style>
