<template>
  <div class="page purchase-sale-stock">
    <h3>进销存管理</h3>
    <button @click="openDialog">进货</button>
    <div class="list">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名">
        </el-table-column>
        <el-table-column
          prop="supplier"
          label="供应商">
        </el-table-column>
        <el-table-column
          prop="buyer"
          label="采购人员">
        </el-table-column>
        <el-table-column
          prop="money"
          label="总金额">
        </el-table-column>
        <el-table-column
          prop="invoiceNum"
          label="发票号">
        </el-table-column>
        <el-table-column
          prop="indentData"
          label="订单日期">
        </el-table-column>
        <el-table-column
          prop="arriveData"
          label="到货日期">
        </el-table-column>
        <el-table-column
          prop="notes"
          label="备注">
        </el-table-column>
      </el-table>
    </div>
    
    <purchase-dialog ref="PurchaseDialog" @on-exit="refresh"></purchase-dialog>
  </div>
</template>

<script>
import PurchaseDialog from './purchase.vue'
import { db } from '@/data/db'

export default {
  name: 'Manage',
  inject: ['reload'],
  components: {
    PurchaseDialog,
  },
  data () {
    return {
      tableData: [],
    }
  },
  create () {
  },
  mounted () {
    db.purchase.orderBy('id').offset(0).toArray().then((val) => {
      console.log(val);
      this.tableData = val
    })
  },
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
