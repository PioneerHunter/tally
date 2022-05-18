<template>
  <div class="invoice">
    <section class="top-bar flex">
      <div>
        <el-cascader
          :options="options"
          :show-all-levels="false"
          placeholder="请选择开票地区"
        ></el-cascader>
      </div>
      <button class="preview-btn" @click="preview">
        <i class="el-icon-view"></i>
        预览
      </button>
      <button class="print-btn" @click="preview">
        <i class="el-icon-printer"></i>
        打印
      </button>
    </section>

    <section>
      <div class="name" @click="show.basic = !show.basic">发票信息</div>
      <transition name="slide-fade">
        <div v-show="show.basic" class="number-info flex">
          <div>
            发票代码：<input v-model="form.code" />
          </div>
          <div>
            发票号码：<input v-model="form.number" />
          </div>
        </div>
      </transition>
    </section>

    <section class="buyer">
      <div class="name" @click="show.buy = !show.buy">购买方信息</div>
      <transition name="slide-fade">
        <div v-show="show.buy" class="flex">
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
      </transition>
    </section>

    <section>
      <div class="name" @click="show.goods = !show.goods">货物信息</div>
      <transition name="slide-fade">
        <div v-show="show.goods">
          <ve-table
            rowKeyFieldName="rowKey"
            :columns="columns"
            :table-data="tableData"
            :editOption="editOption"
            
            border-y
          />
          <button @click="addTable">增加一行</button>
        </div>
      </transition>
    </section>

    <section>
      <div class="name" @click="show.sales = !show.sales">销售方信息</div>
      <transition name="slide-fade">
        <div v-show="show.sales" class="flex">
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
      </transition>
    </section>

    <section>
      <div class="name" @click="show.bottom = !show.bottom">底部信息</div>
      <transition name="slide-fade">
        <div v-show="show.bottom" class="flex">
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
      </transition>
    </section>

    <preview-dialog ref="PreviewDialog" :form="form" :tableData="tableData"></preview-dialog>
  </div>
</template>

<script>
import PreviewDialog from '@/components/preview-dialog.vue'
import VDistpicker from 'v-distpicker' // 城市选择器

export default {
  name: 'Invoice',
  components: {
    PreviewDialog,
    VDistpicker,
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
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }]
        }],
      }],
      show: {
        basic: true,
        buy: true,
        goods: true,
        sales: true,
        bottom: true,
      },
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
    }
  }
}
</script>

<style lang="less" scoped>
.invoice {
  .top-bar {
    margin-bottom: 50px;
    .preview-btn {
      // background-color: #4fc08d;
      // border: 0;
    }
  }
  section {
    margin: 0 auto;
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
      height: 30px;
      width: 200px;
      padding: 0 10px;
      outline-style: none ;
      border: 1px solid #dcdfe6;
      border-radius: 10px;
      box-shadow: 0 0 3px #888888;
      cursor: pointer;
      caret-color: #dcdfe6;
    }
    input:focus {
      box-shadow: 0 0 10px #888888;
    }
  }
  .name {
    height: 40px;
    line-height: 40px;
    margin: 10px 0;
    // background-color: #7E57C2;
    text-align: center;
    background-color: rgb(97, 202, 74);
    opacity: 0.8;
    cursor: pointer;
    border-radius: 15px;
    box-shadow: 0 0 15px #333232;
  }
  .name:hover {
    opacity: 1;
    box-shadow: 0 0 10px 10px #888888;
  }
  .number-info {
    // background-color: rgb(219, 213, 213);
  }
}

// vue 过度动画
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
{
  transform: translateY(-10px);
  opacity: 0;
}
</style>
