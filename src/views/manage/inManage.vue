<template>
  <div class="page in-manage">
    <div class="manage-header">
      <b>采购订单</b>
      <button class="btn" @click="openDialog">添加采购单</button>
    </div>
    <div class="list">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column prop="id" label="编号" align="center"></el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="商品名">
        </el-table-column>
        <el-table-column
          prop="supplier"
          align="center"
          label="供应商">
        </el-table-column>
        <el-table-column
          prop="buyer"
          align="center"
          label="采购人员"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.buyer" size="medium">{{ scope.row.buyer }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="money"
          align="center"
          label="总金额">
        </el-table-column>
        <el-table-column prop="num" label="数量" align="center"></el-table-column>
        <el-table-column
          prop="invoiceNum"
          align="center"
          label="发票号"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.invoiceNum" size="medium" type="danger">{{ scope.row.invoiceNum }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="indentDate" label="订单日期" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="arriveDate" label="到货日期" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="notes" label="备注" align="center"></el-table-column>
        <el-table-column
          fixed="right"
          align="center"
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
      class="pagination"
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
    },
  }
}
</script>

<style lang='less' scoped>
/deep/.el-table {
  // background-color: red;
  // opacity: 0.9;
  thead tr th {
    // background-color: #8C9EFF;
    // color: white;
  }
}
</style>
