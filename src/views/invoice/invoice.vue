<template>
  <div class="invoice">
    <section class="top-bar flex">
      <div>
        <el-select v-model="form.province" placeholder="请选择开票地区">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <button class="preview-btn btn" @click="preview">
        <i class="el-icon-view"></i>
        预览
      </button>
    </section>

    <el-steps :active="active" align-center>
      <el-step title="发票基本信息"></el-step>
      <el-step title="购买方"></el-step>
      <el-step title="货物"></el-step>
      <el-step title="销售方"></el-step>
      <el-step title="底部栏信息"></el-step>
    </el-steps>

    <section v-show="active === 0" class="step">
      <div class="flex">
        <div>
          发票代码：<input v-model="form.code" />
        </div>
        <div>
          发票号码：<input v-model="form.number" />
        </div>
      </div>
    </section>

    <section v-show="active === 1" class="step">
      <div class="flex">
        <div>
          名称：<input v-model="form.buyerName" />
        </div>
        <div>
          纳税人识别号：<input v-model="form.buyerTaxNum" />
        </div>
        <div>
          地址、电话：<input v-model="form.buyerAddress" />
        </div>
        <div>
          开户行及账号：<input v-model="form.buyerBank" />
        </div>
      </div>
    </section>

    <section v-show="active === 2" class="step">
      <div class="center">
        <ve-table
          rowKeyFieldName="rowKey"
          :columns="columns"
          :table-data="tableData"
          :editOption="editOption"
          border-y
        />
        <button class="btn add-btn" @click="addTable">增加一行</button>
      </div>
    </section>

    <section v-show="active === 3" class="step">
      <div class="flex">
        <div>
          名称：<input v-model="form.salesName" />
        </div>
        <div>
          纳税人识别号：<input v-model="form.salesTaxNum" />
        </div>
        <div>
          地址、电话：<input v-model="form.salesAddress" />
        </div>
        <div>
          开户行及账号：<input v-model="form.salesBank" />
        </div>
        <div>
          备注：<input v-model="form.notes" />
        </div>
      </div>
    </section>

    <section  v-show="active === 4" class="step">
      <div class="flex">
        <div>
          收款人：<input v-model="form.payee" />
        </div>
        <div>
          复核：<input v-model="form.review" />
        </div>
        <div>
          开票人：<input v-model="form.drawer" />
        </div>
      </div>
    </section>

    <div class="center">
      <button v-show="active !== 0" class="btn" @click="back">上一步</button>
      <button v-show="active !== 4" class="btn" @click="next">下一步</button>
      <button v-show="active === 4" class="print-btn btn" @click="print">
        <i class="el-icon-printer"></i>
        打印
      </button>
    </div>

    <preview-dialog ref="PreviewDialog" :form="form" :tableData="tableData"></preview-dialog>
  </div>
</template>

<script>
import PreviewDialog from '@/components/preview-dialog.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Invoice',
  components: {
    PreviewDialog,
  },
  data () {
    return {
      form: {
        province: '',
        code: '043001900204',
        number: '83688203',
        buyerName: '公司',
        buyerTaxNum: '91430203399322614U',
        buyerAddress: '',
        buyerBank: '',
        salesName: '经营部',
        salesTaxNum: '92430203MA4PJ63M6L',
        salesAddress: '长沙市',
        salesBank: '156153032646498156长沙银行',
        notes: '',
        payee: '',
        review: '',
        drawer: '郭启缘',
      },
      active: 0,
      rowKey: 3,
      columns: [
        { field: "name", key: "a", title: "货物或应税劳务、服务名称", align: "center", edit: true },
        { field: "modal", key: "b", title: "规格型号", align: "center", edit: true },
        { field: "units", key: "c", title: "单位", align: "center", edit: true },
        { field: "number", key: "d", title: "数量", align: "center", edit: true },
        { field: "price", key: "e", title: "单价", align: "center", edit: true },
        { field: "money", key: "f", title: "金额", align: "center", edit: true },
        { field: "taxRate", key: "g", title: "税率", align: "center", edit: true },
        { field: "tax", key: "h", title: "税额", align: "center", edit: true }
      ],
      tableData: [
        { name: "产品1", modal:"q", units: "个", number: "10", price: "20", money: "200", taxRate: "1%", tax: "2", rowKey: 0 },
        { name: "产品2", modal:"a", units: "个", number: "20", price: "5", money: "100", taxRate: "2%", tax: "1", rowKey: 1 },
      ],
      editOption: {
        cellValueChange: ({ row, column }) => {
          console.log("cellValueChange row::", row)
          console.log("cellValueChange column::", column)
        },
      },
    }
  },
  computed: {
    date() {
      return timeFormat(new Date(), 1)
    },
    ...mapGetters({
      options: 'getProvince',
    })
  },
  create () {},
  mounted () {},
  methods: {
    preview() {
      this.$refs.PreviewDialog.openDialog()
    },
    addTable() {
      this.tableData.push({ name: "", modal:"", units: "", number: "", price: "", money: "", taxRate: "", tax: "", rowKey: this.rowKey })
      this.rowKey++
    },
    back() {
      if (this.active-- < 1) this.active = 0
    },
    next() {
      if (this.active === 0 && !this.form.province) {
        console.log(this.form.province);
        this.$message.warning('请先选择开票地区')
        // return
      }
      if (this.active++ > 3) this.active = 0;
    },
    print() {
      this.$message.error('未安装打印机驱动！')
    },
  }
}
</script>

<style lang="less" scoped>
.invoice {
  max-width: 1100px;
  margin: 0 auto;
  .top-bar {
    justify-content: space-between;
  }
  section {
    margin: 50px auto;
    width: 920px;
    .flex {
      flex-flow: wrap;
      div {
        width: 400px;
        margin: 10px 10px;
        text-align: right;
      }
    }
    input {
      height: 40px;
      width: 250px;
      padding: 0 15px;
      font-size: 16px;
      outline-style: none ;
      border: 1px solid #dcdfe6;
      border-radius: 5px;
      box-shadow: 0 0 3px #888888;
      cursor: pointer;
      caret-color: #dcdfe6;
    }
    input:focus {
      box-shadow: 0 0 10px #888888;
    }
    .add-btn {
      margin-top: 20px;
    }
  }
  section:first-child {
    margin-top: 0;
    margin-bottom: 50px;
  }
}
</style>
