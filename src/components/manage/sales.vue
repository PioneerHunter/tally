<template>
  <div class="sales-dialog">
    <el-dialog
      :title="mode === 'enter' ? '销售订单' : '编辑销售订单'"
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
            <el-select v-model="form.name" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售日期">
            <el-date-picker
              v-model="form.salesTime"
              type="datetime"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="销售人员">
            <el-select v-model="form.salesMan" filterable placeholder="支持搜索">
              <el-option
                v-for="item in salesMan"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="顾客">
            <el-input v-model="form.customer"></el-input>
          </el-form-item>
          <el-form-item label="发票号" prop="invoiceNum">
            <el-input v-model="form.invoiceNum"></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="num">
            <el-input v-model.number="form.num" type="number" :placeholder="maxGoods"></el-input>
          </el-form-item>
          <el-form-item label="总金额" prop="money">
            <el-input v-model.number="form.money" type="number"></el-input>
          </el-form-item>
          <el-form-item label="利润"> 
            <el-input v-model="form.profit" disabled></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              v-model="form.notes"
              type="textarea"
              maxlength="500"
              style="width:209px;"
              :autosize="{ minRows: 2, maxRows: 3}"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="btn" type="primary" @click="validateForm">确 定</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { db } from '@/data/db'
import { search, getData } from '@/utils/dbMethod'
import { timeFormat } from '@/utils/public'

export default {
  name: 'Sales',
  components: {},
  data () {
    return {
      visible: false,
      mode: 'enter',
      form: {
        name: '',
        id: '',
        salesTime: '',
        salesMan: '',
        customer: '',
        invoiceNum: '',
        profit: '',
        money: '',
        num: '',
        notes: '',
      },
      options: [],
      salesMan: [],
      maxGoods: '',
      oldForm: {},
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
        num: [
          { required: true, message: '数量必须且为数字', trigger: 'change' }
        ],
      },
    }
  },
  watch: {
    'form.name'() {
      db.storage.where({ name: this.form.name }).toArray().then((val) => {
        this.maxGoods = `最大不超过${val[0].num}个`
      })
    },
    'form.num'() {
      if (this.form.money) {
        search('storage', { name: this.form.name }).then(val => {
          this.form.profit = this.form.money - this.form.num * val[0].money
        })
      }
    },
    'form.money'() {
      if (this.form.num) {
        search('storage', { name: this.form.name }).then(val => {
          this.form.profit = this.form.money - this.form.num * val[0].money
        })
      }
    },
  },
  created () {
    // db.storage.update(1, { num: 5 })
    this.getGoods()
    // db.sales.orderBy('id').toArray().then(val => {
    //     console.log(val);
    // })
  },
  mounted () {},
  methods: {
    openDialog(id) {
      this.visible = true
      db.sales.orderBy('id').toArray().then(val => {
        if (id) {
          this.mode = 'edit'
          this.getDetail(id)
        } else {
          if (!val.length) {
            this.form.id = 1
            return
          }
          this.form.id = val[val.length - 1].id + 1
        }
        this.getStaffs()
      })
    },
    /** 获取员工列表 */
    async getStaffs() {
      console.log(1);
      let staff = await getData('salary', 'id')
      this.salesMan = staff.map(ele => ({ value: ele.name, label: ele.name }))
    },
    async getDetail(id) {
      const [ detail ] = await search('sales', { id })
      this.form = { ...detail }
      this.oldForm = { ...detail }
    },
    handleClose(done) {
      // deleteData('sales', 16)
      this.$emit('on-exit')
      done();
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
    getGoods() {
      db.storage.orderBy('id').offset(0).toArray().then((val) => {
        this.options = val.map((item) => ({ value: item.name, label: item.name }))
      })
    },
    /** 表单校验 */
    async validateForm() {
      let valid
      this.$refs['form'].validate(val => {
        if (val) valid = true
      })
      if (valid) {
        const [ oldStorage ] = await db.storage.where({ name: this.form.name }).toArray()
        if (oldStorage.num < this.form.num) {
          this.$message({
            showClose: true,
            message: '数量超出仓库数量！',
            type: 'error'
          })
          return
        }
        this.ok()
      }
    },
    async ok() {
      this.visible = false

      // 时间格式化
      let salesTime = this.form.salesTime
      salesTime = salesTime && timeFormat(salesTime)
      let params = { ...this.form }
      params.salesTime = salesTime
      try {
        if (this.mode === 'enter') {
          await this.outStorage()
          await db.sales.add(params)
        } else {
          await this.editStorage(this.oldForm, true)
          await db.sales.update(this.form.id, params)
        }
        this.$emit('on-exit')
      } catch (e) {
        console.log('销售订单录入失败' + e);
      }
    },
    async outStorage() {
      try {
        const [ oldStorage ] = await search('storage', { name: this.form.name })
        let newNum = oldStorage.num - this.form.num
        await db.storage.update(oldStorage.id, { num: newNum })
      } catch (e) {
        console.log('仓库录入失败' + e);
      }
    },
    async editStorage(form, isEnter) {
      try {
        const [ oldStorage ] = await search('storage', { name: form.name })
        let newNum = oldStorage.num + form.num
        await db.storage.update(oldStorage.id, { num: newNum })
        if (isEnter) await this.outStorage()
      } catch (e) {
        console.log('编辑失败' + e);
      }
    },
  }
}
</script>

<style lang='less' scoped>
.sales-dialog {
  .form-list {
    .el-date-editor,
    .el-select {
      width: 207px;
    }
  }
}
</style>
