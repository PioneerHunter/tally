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
    <!-- <div class="list">
      <ve-table
        rowKeyFieldName="rowKey"
        :columns="columns"
        :table-data="tableData"
        :editOption="editOption"
        border-y
      />
    </div> -->
    <div class="swiper-3d">
      <swiper class="swiper" :options="swiperOption">
        <template v-for="item in tableData">
          <swiper-slide :key="item.name">
            <div>姓名：{{ item.name }}</div>
            <div v-if="item.salary">底薪：{{ item.salary }}</div>
            <div v-if="item.extraSalary">提成：{{ item.extraSalary }}</div>
            <div v-if="item.other">其他：{{ item.other }}</div>
            <button class="btn" @click="deleteRow(item.id)">删除</button>
          </swiper-slide>
        </template>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <!-- <button class="btn">新增/修改员工工资</button> -->
    </div>
  </div>
</template>

<script>
import { addData, getData, updateData, search, deleteData } from '@/utils/dbMethod'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'Salary',
  components: {
    Swiper,
    SwiperSlide
  },
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
      swiperOption: {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows : true
        },
        pagination: {
          el: '.swiper-pagination'
        }
      },
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
      let back = document.querySelectorAll('.circle')[0]
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
    deleteRow(id) {
      deleteData('salary', id)
      this.reload()
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

.swiper-3d {
  width: 100%;
  height: 500px;
  padding-top: 50px;
  padding-bottom: 50px;
  border-radius: 10px;
  box-shadow: 0 0 15px #888888;
  // opacity: 0.8;
  .swiper {
    // opacity: 0.8;
    height: 100%;
    width: 100%;

    .swiper-slide {
      position: relative;
      top: 0;
      width: 300px;
      height: 300px;
      text-align: center;
      font-weight: bold;
      font-size: 18px;
      font-family: KaiTi;
      // background-color: #F5F5DC; // 米色
      // background-color:	#FF8C00; // 橙色
      // background-color: #ff6633;
      // background-color: rgba(255, 102, 51, 0.8); // 主打
      // background-color: #ff9933; // 黄色
      background-position: center;
      background-size: cover;
      border-radius: 5px;
      box-shadow: 0 0 15px #888888;
      // color: black;
      color: white;
      div {
        padding: 10px;
      }
      div:first-child {
        margin-top: 20px;
      }
      button {
        position: absolute;
        bottom: 20px;
        transform: translateX(-50%);
      }
    }

    .swiper-pagination {
      /deep/ .swiper-pagination-bullet.swiper-pagination-bullet-active {
        background-color: white;
      }
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
