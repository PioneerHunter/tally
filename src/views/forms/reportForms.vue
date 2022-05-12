<template>
  <div class="report">
    <h3>报表</h3>
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
export default {
  name: 'reportForms',
  components: {},
  data () {
    return {
      type: 'line',
      options: {},
      series: [],
    }
  },
  create () {
  },
  mounted () {
    this.changeLine()
  },
  methods: {
    refresh() {
      Object.keys(this.options).forEach(key => (this.options[key] = ''))
      this.series = []
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
          categories: [1991,1992,1993,1994,1995,1996,1997,1998,1999]
        }
      }
      this.series = [{
        data: [1,2,3,4,5,6,7,8]
      }]
      // console.log(this.options, this.series);
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
        data: [{
          x: 'category A',
          y: 10
        }, {
          x: 'category B',
          y: 18
        }, {
          x: 'category C',
          y: 13
        }, {
          x: 'category D',
          y: 19
        }]
      }]
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
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      }
      this.series = [{
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
      // console.log(this.options, this.series);
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
        labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
      }
      this.series = [30, 40, 20, 10]
    },
    changeArea() {
      this.type = 'area'
      this.options = {
        chart: {
          id: 'colume-chart'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      }
      this.series = [{
        // name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
    },
    changeRadar() {
      this.type = 'radar'
      this.options = {
        labels: ['April', 'May', 'June', 'July', 'August', 'September'],
      }
      this.series = [
        {
          name: "Radar Series 1",
          data: [45, 52, 38, 24, 33, 10]
        },
        {
          name: "Radar Series 2",
          data: [26, 21, 20, 6, 8, 15]
        }
      ]
    },
  }
}
</script>

<style lang="less" scoped>
.report {
  max-width: 900px;
  margin: 20px auto;
  // padding: 20px;
  // box-shadow: 0 0 10px #888888;
  // border-radius: 20px;
}

.chart {
  .chart-bar {
    // width: 100%;
    box-shadow: 0 0 10px #888888;
    margin-bottom: 40px;
    border-radius: 5px;
    div {
      flex: 1;
      height: 50px;
      line-height: 50px;
      text-align: center;
      // margin-right: 10px;
      // background-color: rgb(12, 180, 236);
      // background-color: #81D4FA;
      background-color: rgb(97, 202, 74);
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
    div:hover {
      transition: 0.5s;
      transform: scale(130%, 130%);
      opacity: 0.8;
      border-radius: 5px;
    }
  }
}
</style>

<style>
.apexcharts-canvas  {
  height: 600px;
  border-radius: 5px;
  box-shadow: 0 0 10px #888888;
}
</style>
