<template>
  <div class="page in-manage">
    <h3>采购订单</h3>
    <button @click="openDialog">添加采购单</button>
    <div class="list">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column prop="id" label="编号"></el-table-column>
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
        <el-table-column prop="num" label="数量"></el-table-column>
        <el-table-column
          prop="invoiceNum"
          label="发票号">
        </el-table-column>
        <el-table-column prop="indentDate" label="订单日期"></el-table-column>
        <el-table-column prop="arriveDate" label="到货日期"></el-table-column>
        <el-table-column prop="notes" label="备注"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="openDialog(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deletePurchase(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 40]"
      :current-page.sync="page.pageNum"
      :page-size="page.pageSize"
      :total="page.total">
    </el-pagination>
    
    <purchase-dialog ref="PurchaseDialog" @on-exit="refresh"></purchase-dialog>
  </div>
</template>

<script>
import PurchaseDialog from '../../components/manage/purchase.vue'
import { db } from '@/data/db'
import { getDbList } from '@/utils/dbMethod'

export default {
  name: 'inManage',
  inject: ['reload'],
  components: {
    PurchaseDialog,
  },
  data () {
    return {
      tableData: [],
      page: {
        pageNum: 0,
        pageSize: 10,
        total: 0,
      },
    }
  },
  created () {
    db.purchase.orderBy('id').toArray().then((val) => {
      this.page.total = val.length
    })
    getDbList('purchase', 'id', this.page.pageSize).then(val => {
      this.tableData = val
    })
  },
  mounted () {
  },
  methods: {
    openDialog(row) {
      // console.log(row.id);
      this.$refs.PurchaseDialog.openDialog(row.id)
    },
    refresh() {
      this.reload()
    },
    async deletePurchase(row) {
      try {
        const [ oldPurchase ] = await db.purchase.where({ id: row.id }).toArray()
        await this.$refs.PurchaseDialog.editStorage(oldPurchase)
        await db.purchase.where({ id: row.id }).delete()
      } catch (e) {
        console.log('删除失败' + e);
      }
      this.refresh()
      // db.purchase.where({ id: row.id }).then((val) => {
      //   console.log(val);
      // })
    },
    handleSizeChange(val) {
      this.page.pageSize = val
      getDbList('purchase', 'id', this.page.pageSize).then(val => {
        this.tableData = val
      })
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      let currentNum = (this.page.pageNum - 1) * this.page.pageSize
      getDbList('purchase', 'id', this.page.pageSize, currentNum).then(val => {
        this.tableData = val
      })
      // console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style lang='less' scoped>
.in-manage {
  
}
</style>
