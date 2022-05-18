<template>
  <div class="preview-dialog">
    <el-dialog
      :visible.sync="visible"
      width="970px"
      center
    >
      <div class="invoice-main">
        <header>
          <div class="title">
            {{ form.province + title }}
            <hr>
          </div>
          <div class="basic-info">
            <div>
              发票代码: {{ form.code }}
              发票号码: {{ form.number }}
            </div>
            <div>
              开票日期：{{ date }}
            </div>
          </div>
        </header>
        <div class="invoice-body">
          <section class="purchase-info">
            <div class="buyer">购买方</div>
            <div class="buyer-info">
              <div>
                <span class="align-right">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
                <span>{{ form.buyerName }}</span>
              </div>
              <div>
                <span class="align-right">纳税人识别号：</span>
                <span>{{ form.buyerTaxNum }}</span>
              </div>
              <div>
                <span class="align-right">地&nbsp;址、&nbsp;电&nbsp;话：</span>
                <span>{{ form.buyerAddress }}</span>
              </div>
              <div>
                <span class="align-right">开户行及账户：</span>
                <span>{{ form.buyerBank }}</span>
              </div>
            </div>
            <div class="password">密码区</div>
          </section>

          <section class="goods-table">
            <div class="table-item" style="width: 24%">
              <div class="table-head">货物或应税劳务、服务名称</div>
              <div v-for="item in tableData" :key="item.name">
                {{ item.name }}
              </div>
            </div>
            <div class="table-item" style="width: 10%">
              <div class="table-head">规格型号</div>
              <div v-for="item in tableData" :key="item.name">
                {{ item.modal }}
              </div>
            </div>
            <div class="table-item" style="width: 7%">
              <div class="table-head">单位</div>
              <div v-for="item in tableData" :key="item.name">
                {{ item.units }}
              </div>
            </div>
            <div class="table-item" style="width: 10%">
              <div class="table-head">数量</div>
              <div v-for="item in tableData" :key="item.name">
                {{ item.number }}
              </div>
            </div>
            <div class="table-item" style="width: 10%">
              <div class="table-head">单价</div>
              <div v-for="item in tableData" :key="item.name">
                {{ item.price }}
              </div>
            </div>
            <div class="table-item" style="width: 16%">
              <div class="table-head">金额</div>
              <div v-for="item in tableData" :key="item.name">
                {{ item.money }}
              </div>
            </div>
            <div class="table-item" style="width: 7%">
              <div class="table-head">税率</div>
              <div v-for="item in tableData" :key="item.name">
                {{ item.taxRate }}
              </div>
            </div>
            <div class="table-item" style="width: 16%">
              <div class="table-head">税额</div>
              <div v-for="item in tableData" :key="item.name">
                {{ item.tax }}
              </div>
            </div>
          </section>

          <section class="total-tax">
            <div style="width: 24%">
              合&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;计
            </div>
            <div style="width: 10%"></div>
            <div style="width: 7%"></div>
            <div style="width: 10%"></div>
            <div style="width: 10%"></div>
            <div style="width: 16%">￥{{ totalMoney }}</div>
            <div style="width: 7%"></div>
            <div style="width: 16%">￥{{ taxTotalMoney }}</div>
          </section>

          <section class="total">
            <div class="post-tax">除税合计（大写）</div>
            <div class="lower-case">
              <div>&otimes;{{ form.name }}</div>
              <div>（小写）￥{{ totalMoney + taxTotalMoney }}</div>
            </div>
          </section>

          <section class="sales-info">
            <div class="seller">销售方</div>
            <div class="seller-info">
              <div>
                <span class="align-right">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
                <span>{{ form.salesName }}</span>
              </div>
              <div>
                <span class="align-right">纳税人识别号：</span>
                <span>{{ form.salesTaxNum }}</span>
              </div>
              <div>
                <span class="align-right">地&nbsp;址、&nbsp;电&nbsp;话：</span>
                <span>{{ form.salesAddress }}</span>
              </div>
              <div>
                <span class="align-right">开户行及账户：</span>
                <span>{{ form.salesBank }}</span>
              </div>
            </div>
            <div class="notes">备注</div>
          </section>
        </div>

        <footer>
          <div>收款人：{{ form.payee }}</div>
          <div>复核：{{ form.review }}</div>
          <div>开票人：{{ form.drawer }}</div>
          <div>销售方：（章）</div>
        </footer>
      </div>
      
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { timeFormat } from '@/utils/public'

export default {
  name: 'PreviewDialog',
  components: {},
  props: {
    form: {
      type: Object,
      default() {
        return {};
      },
    },
    tableData: {
      type: Array,
      default() {
        return {};
      },
    },
  },
  data () {
    return {
      visible: false,
      title: '增值税普通发票',
    }
  },
  computed: {
    date() {
      return timeFormat(new Date(), 1)
    },
    totalMoney() {
      console.log(this.tableData.reduce((sum, ele) => sum + ele.money, 0));
      return +this.tableData.reduce((sum, ele) => sum + Number(ele.money), 0)
    },
    taxTotalMoney() {
      return +this.tableData.reduce((sum, ele) => sum + Number(ele.tax), 0)
    },
  },
  created () {
    console.log(this.form);
  },
  mounted () {},
  methods: {
    openDialog() {
      this.visible = true
    },
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/preview.less';
</style>
