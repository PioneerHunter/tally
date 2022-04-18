<template>
  <div  class="page storage-manage">
    <h3>仓库存储</h3>
    <div class="list">
      <el-table
        :data="tableData"
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
        <!-- <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="100">
          <template slot-scope="scope">
            <el-button @click="openDialog(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deletePurchase(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<script>
// import { db } from '@/data/db'
import { getDbList } from '@/utils/dbMethod'

export default {
  name: '',
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
  create () {},
  mounted () {
    getDbList('storage', 'id', this.page.pageSize).then(val => {
      this.tableData = val
    })
    // console.log(getList('storage', 'id', this.page.pageSize));
    // this.tableData = getList('storage', 'id', this.page.pageSize)
  },
  methods: {}
}
</script>

<style lang='less' scoped>

</style>
