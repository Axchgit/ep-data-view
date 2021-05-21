<template>
  <div>
    <div id="bottomLeftChart" style="width: 11.25rem; height: 6.25rem"></div>
  </div>
</template>

<script>
import echartMixins from "@/utils/resizeMixins";
export default {
  data() {
    return {
      chart: null,
      commission: [],
      timeArr: [],
      goodsNum: [],
    };
  },
  mixins: [echartMixins],
  // created(){
  //   this.getCountPerformanceAndCommissionSum();
  // },
  mounted() {
    // this.getCountPerformanceAndCommissionSum().then((res) => {
    //   // console.log(1,res)
    //   this.commission =res[1]
    //   this.timeArr = res[0]
    //   console.log(1,res[0])

    //   // res.length
    //   //   ? this.$message.error("获取数据失败")
    //   //   : (this.nationChartData = res);
    // });
    this.getCountPerformanceAndCommissionSum();
    this.getGoodsNumSum();
    this.draw();
    this.charTimg();
  },
  methods: {
    async getCountPerformanceAndCommissionSum() {
      const { status, data } = await this.$http.get(
        process.env.VUE_APP_API +
          "/DataView/getPerformanceAndCommissionSumInMonth"
      );
      if (status === 200) {
        this.commission = data.data[1];
        // // console.log(this.commission[1]);
        this.timeArr = data.data[0];
        // return data.data;
        // console.log(123,this.timeArr)
      }
    },

    async getGoodsNumSum() {
      const { status, data } = await this.$http.get(
        process.env.VUE_APP_API + "/DataView/getGoodsNumSumInMonth"
      );
      if (status === 200) {
        this.goodsNum = data.data;
        // // console.log(this.commission[1]);
        // this.timeArr = data.data[0];
        // return data.data;
        // console.log(123,this.timeArr)
      }
    },
    charTimg() {
      setInterval(() => {
        this.draw();

        // this.times = this.times + 1;
        // this.weeks = this.times % 4;
      }, 10000);
    },

    draw() {
      // this.getCountPerformanceAndCommissionSum();

      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(
        document.getElementById("bottomLeftChart")
      );
      //  ----------------------------------------------------------------
      // console.log(2,this.timeArr);
      let category = [];
      for (let i = 0; i < 30; i++) {
        category.push(this.timeArr[i]); //属性
        //arr.push(obj[i]); //值
      }
      console.log(2, category);

      let barData = [];
      // console.log(JSON.stringify(this.timeArr));

      for (let i = 0; i < 30; i++) {
        barData.push(this.commission[i]/100); //属性
        //arr.push(obj[i]); //值
      }
      console.log(barData);
      // console.log(123);
      let rateData = [];
      for (let i = 0; i < 30; i++) {
        // let rate = barData[i] / lineData[i];
        // let rate = i + 1;
        // rateData[i] = rate.toFixed(2);
        rateData.push(this.goodsNum[i]); //属性
      }

      let option = {
        title: {
          text: "",
          x: "center",
          y: 0,
          textStyle: {
            color: "#B4B4B4",
            fontSize: 16,
            fontWeight: "normal",
          },
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,0.1)",
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
              backgroundColor: "#7B7DDC",
            },
          },
        },
        legend: {
          data: ["日签单数",  "日获佣金"],
          textStyle: {
            color: "#B4B4B4",
          },
          top: "0%",
        },
        grid: {
          x: "8%",
          width: "88%",
          y: "4%",
        },
        xAxis: {
          data: category,
          axisLine: {
            lineStyle: {
              color: "#B4B4B4",
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: [
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#B4B4B4",
              },
            },

            axisLabel: {
              formatter: "{value} ",
            },
          },
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#B4B4B4",
              },
            },
            axisLabel: {
              formatter: "{value} ",
            },
          },
        ],
        series: [
          {
            name: "日签单数",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 8,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: "#F02FC2",
              },
            },
            data: rateData,
          },

          {
            name: "日获佣金",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#956FD4" },
                  { offset: 1, color: "#3EACE5" },
                ]),
              },
            },
            data: barData,
          },

          // {
          //   name: "计划贯通",
          //   type: "bar",
          //   barGap: "-100%",
          //   barWidth: 10,
          //   itemStyle: {
          //     normal: {
          //       barBorderRadius: 5,
          //       color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //         { offset: 0, color: "rgba(156,107,211,0.8)" },
          //         { offset: 0.2, color: "rgba(156,107,211,0.5)" },
          //         { offset: 1, color: "rgba(156,107,211,0.2)" }
          //       ])
          //     }
          //   },
          //   z: -12,

          //   data: lineData
          // }
        ],
      };
      this.chart.setOption(option);
    },
  },
  destroyed() {
    window.onresize = null;
  },
};
</script>

<style lang="scss" scoped>
</style>