<template>
  <div class="page storage-manage">
    <div class="manage-header">
      <b>仓库存储</b>
    </div>
    <div class="list">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column prop="id" label="编号" align="center" width="50px"></el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="商品名">
        </el-table-column>
        <el-table-column
          prop="num"
          align="center"
          label="数量/个">
        </el-table-column>
        <el-table-column
          prop="money"
          align="center"
          label="单价/元">
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
  </div>
</template>

<script>
import { db } from '@/data/db'
import { getDbList } from '@/utils/dbMethod'

export default {
  name: 'StorageManage',
  components: {},
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
    db.storage.orderBy('id').toArray().then((val) => {
      this.page.total = val.length
    })
    getDbList('storage', 'id', this.page.pageSize).then(val => {
      this.tableData = val
    })
  },
  mounted () {
  },
  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val
      getDbList('storage', 'id', this.page.pageSize).then(val => {
        this.tableData = val
      })
    },
    handleCurrentChange(val) {
      let currentNum = (this.page.pageNum - 1) * this.page.pageSize
      getDbList('storage', 'id', this.page.pageSize, currentNum).then(val => {
        this.tableData = val
      })
    }
  }
}
</script>

<style lang='less' scoped>

</style>
