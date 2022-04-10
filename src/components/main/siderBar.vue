<template>
  <!-- <div class="sider-bar"> -->
  <div class="sider-bar">
    <input type="checkbox" class="menu-toggler" id="menu_toggler" checked>
    <label for="menu_toggler"></label>
    <ul>
      <li class="menu-item">
        <a @click="() => { $router.push('inManage') }">
          <i class="icon el-icon-edit-outline" aria-hidden="true"></i>
        </a>
      </li>
      <li class="menu-item">
        <a @click="() => { $router.push('storageManage') }">
          <i class="icon el-icon-edit-outline" aria-hidden="true"></i>
        </a>
      </li>
      <li class="menu-item">
        <a @click="() => { $router.push('outManage') }">
          <i class="icon el-icon-edit-outline" aria-hidden="true"></i>
        </a>
      </li>
      <li class="menu-item">
        <a @click="() => { $router.push('invoice') }">
          <i class="icon el-icon-edit-outline" aria-hidden="true"></i>
        </a>
      </li>
      <li class="menu-item">
        <a @click="() => { $router.push('reportForms') }">
          <i class="icon el-icon-edit-outline" aria-hidden="true"></i>
        </a>
      </li>
      <li class="menu-item">
        <a @click="() => { $router.push('outManage') }">
          <i class="icon el-icon-setting" aria-hidden="true"></i>
        </a>
      </li> 
    </ul>
    <!-- <div class="sider-icon" @click="() => { $router.push('inManage') }">
      <el-popover
        placement="right"
        width="30"
        trigger="hover">
        <div @click="() => { $router.push('inManage') }">进货订单</div>
        <div @click="() => { $router.push('storageManage') }">库存</div>
        <div @click="() => { $router.push('outManage') }">出库</div>
        <i class="icon el-icon-edit-outline" slot="reference"></i>
      </el-popover>
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
    </div> -->
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
@import '@/assets/siderBar.css';
// .sider-bar {
//   z-index: 100;
//   position: fixed;
//   bottom: 120px;
//   left: 120px;
//   cursor: pointer;
//   width: 40px;
//   height: 40px;
//   padding: 20px 10px;
//   background-color: rgb(121, 41, 41);
//   opacity: 0.5;
//   border-radius: 5px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
//   .sider-icon {
//     margin-top: 20px;
//     cursor: pointer;
//   }
//   .icon {
//     font-size: 30px;
//   }
// }
.sider-bar {
  z-index: 100;
  position: fixed;
  bottom: 160px;
  left: 160px;
  cursor: pointer;
}
</style>
