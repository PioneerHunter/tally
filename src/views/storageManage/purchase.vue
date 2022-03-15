<template>
  <div class="purcahse-dialog">
    <el-dialog
      title="采购订单"
      :visible.sync="visible"
      width="700px"
      :before-close="handleClose"
      center
    >
      <div class="form-list">
        <el-form ref="form"
          :model="form"
          label-width="80px"
          :rules="rules"
          :inline="true">
          <el-form-item label="编号">
            <el-input v-model="form.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="订单日期">
            <el-date-picker
              v-model="form.indentData"
              type="datetime"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="供应商">
            <el-input v-model="form.supplier"></el-input>
          </el-form-item>
          <el-form-item label="到货日期">
            <el-date-picker
              v-model="form.arriveData"
              type="datetime"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="发票号" prop="invoiceNum">
            <el-input v-model="form.invoiceNum"></el-input>
          </el-form-item>
          <el-form-item label="采购人员">
            <el-input v-model="form.buyer"></el-input>
          </el-form-item>
          <el-form-item label="总金额" prop="money">
            <el-input v-model.number="form.money" type="number"></el-input>
          </el-form-item>
          <div>
            <el-form-item label="备注">
              <el-input
                v-model="form.notes"
                type="textarea"
                maxlength="500"
                style="width:505px"
                show-word-limit
                :autosize="{ minRows: 2, maxRows: 3}"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="storage">确 定</el-button>
      </span>
  </el-dialog>
  </div>
</template>

<script>
import { db } from '@/data/db'
import moment from 'moment'

export default {
  name: 'Purchase',
  components: {},
  data () {
    return {
      visible: false,
      form: {
        name: '',
        id: '',
        indentData: '',
        supplier: '',
        arriveData: '',
        invoiceNum: '',
        buyer: '',
        money: '',
        notes: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名', trigger: 'change' }
        ],
        money: [
          { required: true, message: '总金额必须且为数字', trigger: 'change' }
        ],
        invoiceNum: [
          { required: true, message: '请输入发票号', trigger: 'change' }
        ],
      },
    }
  },
  create () {
  },
  mounted () {
    // db.purchase.orderBy('id').offset(5).limit(5).toArray().then((val) => {
    //   console.log(val);
    // })
    // db.purchase.orderBy('id').offset(2).limit(2).toArray().then((val) => {
    //   console.log(val);
    // })
  },
  methods: {
    openDialog() {
      this.visible = true
    },
    handleClose(done) {
      this.$emit('on-exit')
      done();
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
    async storage() {
      let valid
      this.$refs['form'].validate(val => {
        if (val) valid = true
      })
      if (valid) {
        this.visible = false
        this.$emit('on-exit')
        try {
          // 时间格式化
          let indent = this.form.indentData
          let arrive = this.form.arriveData
          indent = indent && moment(this.form.indentData).format('YYYY/MM/DD HH:mm:ss')
          arrive = arrive && moment(this.form.arriveData,).format('YYYY/MM/DD HH:mm:ss')
          // ++id, money, invoiceNum, indentData, arriveData, notes
          const id = await db.purchase.add({
            name: this.form.name,
            supplier: this.form.supplier,
            buyer: this.form.buyer,
            money: this.form.money,
            invoiceNum: this.form.invoiceNum,
            indentData: indent,
            arriveData: arrive,
            notes: this.form.notes,
          })
          console.log(id);
        } catch (err) {
          console.log('加入失败！' + err);
        }
      }
    },
  }
}
</script>

<style lang='less' scoped>
.purcahse-dialog {
  .form-list {
    .el-date-editor {
      width: 207px;
    }
  }
}
</style>
