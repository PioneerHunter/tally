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
            <el-input v-model="form.name" disabled></el-input>
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
            <el-input v-model="form.money"></el-input>
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
export default {
  name: 'Purchase',
  components: {},
  data () {
    return {
      visible: false,
      form: {
        name: '',
        indentData: '',
        supplier: '',
        arriveData: '',
        invoiceNum: '',
        buyer: '',
        money: '',
        notes: '',
      },
      rules: {
        money: [
          { required: true, message: '请输入总金额', trigger: 'change' }
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
    storage() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.visible = false
          this.$emit('on-exit')
        }
      })
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
