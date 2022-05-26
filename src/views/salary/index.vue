<template>
  <div class="salary">
    <div class="add center">
      <div class="add-name" @click="slide">{{ title }}</div>
      <transition name="slide-fade">
        <div v-show="show">
          <div class="flex add-form">
            <div>
              名称：<input v-model="form.name" type="text">
            </div>
            <div>
              底薪：<input v-model="form.salary" type="text">
            </div>
            <div>
              提成：<input v-model="form.extraSalary" type="text">
            </div>
            <div>
              其他：<input v-model="form.other" type="text">
            </div>
          </div>
          <button class="btn" @click="addSalary">新增/修改</button>
        </div>
      </transition>
    </div>
    <div class="list">
      <ve-table
        rowKeyFieldName="rowKey"
        :columns="columns"
        :table-data="tableData"
        :editOption="editOption"
        border-y
      />
    </div>
  </div>
</template>

<script>
import { addData, getData, updateData, search, deleteData } from '@/utils/dbMethod'

export default {
  name: 'Salary',
  components: {},
  inject: ['reload'],
  data () {
    return {
      isAdmin: true,
      title: '新增/修改员工工资',
      form: {
        name: '',
        salary: '',
        extraSalary: '',
        other: '',
      },
      show: false,
      rowKey: 0,
      columns: [
        { field: "name", key: "name", title: "姓名", align: "center", edit: true },
        { field: "salary", key: "salary", title: "底薪", align: "center", edit: true },
        { field: "extraSalary", key: "extraSalary", title: "提成", align: "center", edit: true },
        { field: "other", key: "other", title: "其他", align: "center", edit: true },
        { 
          field: "option",
          key: "e",
          title: "操作",
          align: "center",
          renderBodyCell: ({ row, rowIndex }, h) => {
            return (
              <span>
                <button
                  class="btn"
                  on-click={() => this.deleteRow(row.id, rowIndex)}
                >
                  删除
                </button>
              </span>
            );
          },
        },
      ],
      tableData: [],
      editOption: {
        cellValueChange: ({ row, column }) => {
          console.log("cellValueChange row::", row)
          console.log("cellValueChange column::", column)
        },
      },
    }
  },
  created () {
    this.isAdmin = window.sessionStorage.getItem('isAdmin') === 'true'
    if (!this.isAdmin) {
      this.columns.pop()
      this.title ='员工工资展示'
    }
    getData('salary', 'id').then(data => {
      // console.log(data)
      data.forEach(ele => {
        ele.rowKey = this.rowKey
        this.tableData.push(ele)
        this.rowKey++
      })
    })
  },
  mounted () {},
  methods: {
    slide() {
      if (!this.isAdmin) return false
      this.show = !this.show
      let ele = document.querySelector('.add')
      let back = document.querySelectorAll('.btn')[0]
      let backgroundColor = getComputedStyle(back, null).getPropertyValue("background-color")
      console.log(backgroundColor);
      if (this.show) {
        ele.style.backgroundColor  = "white"
        ele.style.color  = "black"
      } else {
        setTimeout(() => {
          // ele.style.backgroundColor  = "#7E57C2"
          ele.style.backgroundColor  = backgroundColor
          ele.style.color  = "white"
        }, 400)
      }
    },
    async addSalary() {
      if (!this.form.name) {
        this.$message.warning('请输入员工姓名！')
        return
      }
      let isExist = await search('salary', { name: this.form.name })
      if (isExist.length) {
        updateData('salary', isExist[0].id, this.form)
      } else {
        addData('salary', this.form)
      }
      this.reload()
      // addData('salary', this.form)
    },
    deleteRow(id, index) {
      this.tableData.splice(index, 1)
      deleteData('salary', id)
    },
  }
}
</script>

<style lang='less' scoped>
.salary {
  width: 1000px;
  margin: 0 auto;
}
.add {
  margin: 20px 0;
  padding: 10px;
  border-radius: 10px;
  // border: 1px solid #888888;
  box-shadow: 0 0 15px #888888;
  // background-color: #7E57C2;
  color: white;
  opacity: 0.8;
  .add-name {
    cursor: pointer;
  }
  .add-form {
    width: 600px;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
    div {
      padding: 10px;
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
