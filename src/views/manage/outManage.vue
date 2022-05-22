<template>
  <div class="page out-manage">
    <div class="manage-header">
      <b>销售订单</b>
      <button class="btn" @click="openDialog">添加销售单</button>
    </div>
    <div class="list">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column prop="id" label="编号" align="center"></el-table-column>
        <el-table-column prop="name" label="商品名" align="center"></el-table-column>
        <el-table-column
          prop="customer"
          label="顾客"
          align="center">
        </el-table-column>
        <el-table-column
          prop="salesman"
          label="销售人员"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.salesman" size="medium">{{ scope.row.salesman }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="money"
          label="总金额"
          align="center">
        </el-table-column>
        <el-table-column prop="num" label="数量" align="center"></el-table-column>
        <el-table-column
          prop="invoiceNum"
          label="发票号"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.invoiceNum" size="medium" type="danger">{{ scope.row.invoiceNum }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="salesTime" label="销售日期" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="profit" label="利润" align="center"></el-table-column>
        <el-table-column prop="notes" label="备注" align="center"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="100">
          <template slot-scope="scope">
            <el-button @click="openDialog(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteSales(scope.row)" type="text" size="small">删除</el-button>
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

    <sales-dialog ref="SalesDialog" @on-exit="refresh"></sales-dialog>
  </div>
</template>

<script>
import { db } from '@/data/db'
import SalesDialog from '../../components/manage/sales.vue'
import { getDbList, search } from '@/utils/dbMethod'

export default {
  name: 'OutManage',
  inject: ['reload'],
  components: {
    SalesDialog,
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
    db.sales.orderBy('id').toArray().then((val) => {
      this.page.total = val.length
    })
    getDbList('sales', 'id', this.page.pageSize).then(val => {
      this.tableData = val
    })
  },
  mounted () {},
  methods: {
    openDialog(row) {
      this.$refs.SalesDialog.openDialog(row.id)
    },
    refresh() {
      this.reload()
    },
    async deleteSales(row) {
      try {
        const [ oldSales ] = await search('sales', { id: row.id })
        await this.$refs.SalesDialog.editStorage(oldSales)
        await db.sales.where({ id: row.id }).delete()
      } catch (e) {
        console.log('删除失败' + e);
      }
      this.refresh()
    },
    handleSizeChange(val) {
      this.page.pageSize = val
      getDbList('sales', 'id', this.page.pageSize).then(val => {
        this.tableData = val
      })
    },
    handleCurrentChange(val) {
      let currentNum = (this.page.pageNum - 1) * this.page.pageSize
      getDbList('sales', 'id', this.page.pageSize, currentNum).then(val => {
        this.tableData = val
      })
    }
  }
}
</script>

<style lang='less' scoped>

</style>
