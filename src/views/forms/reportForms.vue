<template>
  <div class="report">
    <h3>利润报表/元</h3>
    <section class="chart">
      <div class="chart-bar flex">
        <div @click="changeLine">线图</div>
        <div @click="changeBar">条形图</div>
        <div @click="changeColume">柱状图</div>
        <!-- <div>条形图</div> -->
        <div @click="changeDonut">圆环图</div>
        <div @click="changeArea">面积图</div>
        <div @click="changeRadar">雷达图</div>
      </div>
      <apexchart
        class="apex-chart"
        :type="type"
        :options="options"
        :series="series"
      ></apexchart>
    </section>
  </div>
</template>

<script>
import { getData, search } from '@/utils/dbMethod'

export default {
  name: 'reportForms',
  components: {},
  data () {
    return {
      type: 'line',
      options: {},
      series: [],
      salesData: [],
    }
  },
  created () {
    this.getSalesList()
  },
  mounted () {},
  methods: {
    refresh() {
      Object.keys(this.options).forEach(key => (this.options[key] = ''))
      this.series = []
    },
    async getSalesList() {
      this.salesData = await getData('sales', 'id')
      this.changeLine()
    },
    changeLine() {
      this.type = 'line'
      this.options = {
        chart: {
          id: 'line-chart',
          type: 'line',
        },
        stroke: {
          show: true,
          curve: 'smooth',
        },
        xaxis: {
          categories: this.salesData.map(ele => ele.name)
        }
      }
      this.series = [{
        data: this.salesData.map(ele => ele.profit)
      }]
    },
    changeBar() {
      this.type = 'bar'
      this.options = {
        chart: {
          id: 'bar-chart'
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
      }
      this.series = [{
        data: []
      }]
      
      this.calProfit().forEach((val, key) => {
        this.series[0].data.push({ x: key, y: val })
      })
    },
    changeColume() {
      this.type = 'bar'
      this.options = {
        chart: {
          id: 'colume-chart'
        },
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        xaxis: {
          categories: this.salesData.map(ele => ele.name)
        }
      }
      this.series = [{
        data: this.salesData.map(ele => ele.profit)
      }]
    },
    changeDonut() {
      this.type = 'donut'
      this.options = {
        plotOptions: {
          pie: {
            customScale: 0.7,
            donut: {
              // background: 888888,
            }
          }
        },
        // chartOptions: {
        //   labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
        // }
        labels: []
      }
      this.series = []
      this.calProfit().forEach((val, key) => {
        this.options.labels.push(key)
        this.series.push(val)
      })
    },
    changeArea() {
      this.type = 'area'
      this.options = {
        chart: {
          id: 'colume-chart'
        },
        xaxis: {
          categories: this.salesData.map(ele => ele.name)
        }
      }
      this.series = [{
        // name: 'series-1',
        data: this.salesData.map(ele => ele.profit)
      }]
    },
    changeRadar() {
      this.type = 'radar'
      this.options = {
        labels: ['六月', '五月', '四月', '三月', '二月', '一月'],
      }
      this.series = [
        {
          name: "商品1",
          data: [45, 52, 38, 24, 33, 10]
        },
        {
          name: "商品2",
          data: [26, 21, 20, 6, 8, 15]
        }
      ]
    },
    // 计算好各商品的利润和
    calProfit() {
      let map = new Map()
      this.salesData.forEach(ele => {
        if (map.has(ele.name)) {
          map.set(ele.name, map.get(ele.name) + ele.profit)
        } else {
          map.set(ele.name, ele.profit)
        }
      })
      return map
    }
  }
}
</script>

<style lang="less" scoped>
.report {
  max-width: 900px;
  margin: 20px auto;
}

.chart {
  .chart-bar {
    // width: 100%;
    box-shadow: 0 0 10px #888888;
    margin-bottom: 40px;
    border-radius: 5px;
    opacity: 0.8;
    div {
      flex: 1;
      height: 50px;
      line-height: 50px;
      text-align: center;
      // margin-right: 10px;
      // background-color: rgb(12, 180, 236);
      // background-color: #81D4FA;
      // background-color: #7E57C2;
      // border-right: 1px solid white;
      cursor: pointer;
      // transition: 0.5s;
    }
    div:first-child {
      border-radius: 5px 0 0 5px;
    }
    div:last-child {
      border-radius: 0 5px 5px 0;
      // border-right: 0px solid rgb(12, 180, 236);
    }
  }
}
</style>

<style lang="less">
.apexcharts-canvas  {
  height: 600px;
  border-radius: 5px;
  box-shadow: 0 0 10px #888888;
  background-color: rgba(248, 239, 239, 0.5);
  .apexcharts-xaxis {
    .apexcharts-datalabel {
      color: black;
    }
    
  }
}
</style>
