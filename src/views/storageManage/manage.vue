<template>
  <div class="page purchase-sale-stock">
    <h3>进销存管理</h3>
    <button @click="openDialog">进货</button>
    <div class="list">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
    
    <purchase-dialog ref="PurchaseDialog" @on-exit="refresh"></purchase-dialog>
  </div>
</template>

<script>
import PurchaseDialog from './purchase.vue'

export default {
  name: 'Manage',
  inject: ['reload'],
  components: {
    PurchaseDialog,
  },
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  create () {
  },
  mounted () {},
  methods: {
    openDialog() {
      this.$refs.PurchaseDialog.openDialog()
    },
    refresh() {
      this.reload()
    },
  }
}
</script>

<style lang='less' scoped>
.purchase-sale-stock {
  margin: 0 30px;
}
</style>
