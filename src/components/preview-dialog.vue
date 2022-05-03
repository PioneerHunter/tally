<template>
  <div class="preview-dialog">
    <el-dialog
      :visible.sync="visible"
      width="970px"
      center
    >
      <div  class="invocie-main">
        <header>
          <div class="title">
            {{ title }}
            <hr>
          </div>
          <div class="basic-info">
            <div>
              发票代码: 
              发票号码: 
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
                <span></span>
              </div>
              <div>
                <span class="align-right">纳税人识别号：</span>
                <span></span>
              </div>
              <div>
                <span class="align-right">地&nbsp;址、&nbsp;电&nbsp;话：</span>
                <span></span>
              </div>
              <div>
                <span class="align-right">开户行及账户：</span>
                <span></span>
              </div>
            </div>
            <div class="password">密码区</div>
          </section>

          <section class="goods-table">
            <div class="table-item" style="width: 24%">
              <div class="table-head">货物或应税劳务、服务名称</div>
              <div>dsaf</div>
            </div>
            <div class="table-item" style="width: 10%">
              <div class="table-head">规格型号</div>
            </div>
            <div class="table-item" style="width: 7%">
              <div class="table-head">单位</div>
            </div>
            <div class="table-item" style="width: 10%">
              <div class="table-head">数量</div>
            </div>
            <div class="table-item" style="width: 10%">
              <div class="table-head">单价</div>
            </div>
            <div class="table-item" style="width: 16%">
              <div class="table-head">金额</div>
            </div>
            <div class="table-item" style="width: 7%">
              <div class="table-head">税率</div>
            </div>
            <div class="table-item" style="width: 16%">
              <div class="table-head">税额</div>
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
            <div style="width: 16%">￥</div>
            <div style="width: 7%"></div>
            <div style="width: 16%">￥</div>
          </section>

          <section class="total">
            <div class="post-tax">除税合计（大写）</div>
            <div class="lower-case">
              <div>&otimes;{{ '' }}</div>
              <div>（小写）￥</div>
            </div>
          </section>

          <section class="sales-info">
            <div class="seller">销售方</div>
            <div class="seller-info">
              <div>
                <span class="align-right">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
                <span></span>
              </div>
              <div>
                <span class="align-right">纳税人识别号：</span>
                <span></span>
              </div>
              <div>
                <span class="align-right">地&nbsp;址、&nbsp;电&nbsp;话：</span>
                <span></span>
              </div>
              <div>
                <span class="align-right">开户行及账户：</span>
                <span></span>
              </div>
            </div>
            <div class="notes">备注</div>
          </section>
        </div>

        <footer>
          <div>收款人：</div>
          <div>复核：</div>
          <div>开票人：</div>
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
  },
  created () {},
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
