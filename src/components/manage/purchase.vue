<template>
  <div class="purcahse-dialog">
    <el-dialog
      :title="mode === 'enter' ? '采购订单' : '编辑采购订单'"
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
              v-model="form.indentDate"
              type="datetime"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="供应商">
            <el-input v-model="form.supplier"></el-input>
          </el-form-item>
          <el-form-item label="到货日期">
            <el-date-picker
              v-model="form.arriveDate"
              type="datetime"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="发票号" prop="invoiceNum">
            <el-input v-model="form.invoiceNum"></el-input>
          </el-form-item>
          <el-form-item label="采购人员">
            <el-select v-model="form.buyer" filterable placeholder="支持搜索">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="总金额" prop="money">
            <el-input v-model.number="form.money" type="number"></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="num">
            <el-input v-model.number="form.num" type="number"></el-input>
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
        <button class="btn" type="primary" @click="ok">确 定</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { db } from '@/data/db'
import { search, getData } from '@/utils/dbMethod'
import { timeFormat } from '@/utils/public'

export default {
  name: 'Purchase',
  components: {},
  data () {
    return {
      visible: false,
      mode: 'enter',
      form: {
        name: '',
        id: '',
        indentDate: '',
        supplier: '',
        arriveDate: '',
        invoiceNum: '',
        buyer: '',
        money: '',
        num: '',
        notes: '',
      },
      oldForm: {},
      options: [],
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
  created () {
  },
  mounted () {
    // db.storage.orderBy('id').offset(0).toArray().then((val) => {
      // console.log(val);
    // })
  },
  methods: {
    async beiyong() {
      const is = await db.purchase.where({ name: 'dsaf' }).toArray()
    },
    openDialog(id) {
      this.visible = true
      db.purchase.orderBy('id').toArray().then(val => {
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
      })
      this.getStaffs()
    },
    /** 获取员工列表 */
    async getStaffs() {
      console.log(1);
      let staff = await getData('salary', 'id')
      this.options = staff.map(ele => ({ value: ele.name, label: ele.name }))
    },
    /** 获取编辑详情 */
    async getDetail(id) {
      const [ detail ] = await search('purchase', { id })
      this.form = { ...detail }
      this.oldForm = { ...detail }
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
    async ok() {
      let valid
      this.$refs['form'].validate(val => {
        if (val) valid = true
      })
      if (valid) {
        this.visible = false
        // 时间格式化
        let indent = this.form.indentDate
        let arrive = this.form.arriveDate
        indent = indent && timeFormat(this.form.indentDate)
        arrive = arrive && timeFormat(this.form.arriveDate)
        let params = { ...this.form }
        params.indentDate = indent
        params.arriveDate = arrive
        try {
          if (this.mode === 'enter') {
            await this.enterStorage()
            await db.purchase.add(params)
          } else {
            await this.editStorage(this.oldForm, true)
            await db.purchase.update(this.form.id, params)
          }
          this.$emit('on-exit')
        } catch (err) {
          console.log('加入失败！' + err);
        }
      }
    },
    async enterStorage() {
      // isExist：仓库中是否存在当前待加入商品
      const isExist = await db.storage.where({ name: this.form.name }).toArray()

      let money = Number(this.form.money)
      let num = Number(this.form.num)
      let storageParams = {
        name: this.form.name,
        num: num,
      }
      try {
        if (isExist.length) {
          storageParams.money = (money + isExist[0].money * isExist[0].num) / (num + isExist[0].num)
          storageParams.num += Number(isExist[0].num)
          await db.storage.update(isExist[0].id, storageParams)
        } else {
          storageParams.money = money / num
          await db.storage.add(storageParams)
        }
      } catch (e) {
        console.log('录入失败' + e);
      }
    },
    async editStorage(form, isEnter) {
      // oldPurchase：未修改前的订单内容，oldStorage：未修改前的仓库内容
      const oldPurchase = await db.purchase.where({ id: form.id }).toArray()
      const oldStorage = await db.storage.where({ name: form.name }).toArray()
      let storageParams = {
        name: oldStorage[0].name,
        num: 0,
      }
      try {
        storageParams.num = oldStorage[0].num - oldPurchase[0].num
        if (storageParams.num) {
          storageParams.money = ((oldStorage[0].num * oldStorage[0].money) - oldPurchase[0].money) / storageParams.num
          await db.storage.update(oldStorage[0].id, storageParams)
        } else {
          await db.storage.where({ id: oldStorage[0].id }).delete()
        }
        if (isEnter) await this.enterStorage()
      } catch (e) {
        console.log('编辑失败' + e);
      }
    },
  }
}
</script>

<style lang='less' scoped>
.purcahse-dialog {
  .form-list {
    .el-date-editor,
    .el-select {
      width: 207px;
    }
  }
}
</style>
