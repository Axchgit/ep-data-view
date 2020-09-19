<template>
  <div>
    <div id="centreLeft2Chart" style="width:4.125rem; height: 4.625rem;font"></div>
  </div>
</template>

<script>
import echartMixins from "@/utils/resizeMixins";

export default {
  props: {
    dataArr: {
      // 默认为空
      default: () => [],
    },
    // loading: {
    //     default: false
    // }
  },
  data() {
    return {
      chart: null,
      echartData: [],
      dataName: [],
      value: [],
    };
  },

  watch: {
    dataArr(newValue) {
      this.echartData = newValue;
      // console.log(this.echartData);
      // console.log(this.echartData.list_data);
      // console.log(this.echartData.list_data[0]["name"]);
      this.echartData.list_data.forEach((item, index) => {
        // this.dataName[index] = item["name"];
        this.value[index] = (item["value"] / this.echartData.count) * 500;
        // console.log(item['name'])
      });
      this.value = this.value.sort();
      // console.log(this.value['length'])
      for (let i = 0; i <= this.value["length"]; i++) {
        this.echartData.list_data.forEach((item) => {
          // console.log(item)
          // console.log(this.value)
          if ((item["value"] / this.echartData.count) * 500 === this.value[i]) {
            this.dataName[i] = item["name"];
          }
        });
      }
      // this.dataName[index] = item["name"];
      // this.value[index] = (item["value"] / this.echartData.count) * 500;

      // console.log(this.echartData.list_data["length"]);


      this.drawPie();
    },
  },
  mixins: [echartMixins],
  mounted() {
    this.drawPie(); //获取数据
    window.setInterval(() => {
      setTimeout(() => {
        this.drawPie();
      }, 0);
    }, process.env.VUE_APP_REFRESH);
    // this.drawPie();
  },
  methods: {
    drawPie() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(
        document.getElementById("centreLeft2Chart")
      );
      let option = {
        angleAxis: {
          interval: 1,
          type: "category",
          data: this.dataName,
          z: this.dataName['length'],
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00c7ff",
              width: 1,
              type: "solid",
            },
          },
          axisLabel: {
            interval: 0,
            show: true,
            color: "#00c7ff",
            margin: 8,
            fontSize: 12,
          },
        },
        radiusAxis: {
          min: 0,
          max: 100,
          interval: 20,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00c7ff",
              width: 1,
              type: "solid",
            },
          },
          axisLabel: {
            formatter: "{value} %",
            show: false,
            padding: [0, 0, 20, 0],
            color: "#00c7ff",
            fontSize: 16,
          },
          splitLine: {
            lineStyle: {
              color: "#00c7ff",
              width: 1,
              type: "solid",
            },
          },
        },
        legend: {
          show: true,
          orient: "vartical",
          top: "center",
          bottom: "0%",
          itemWidth: 16,
          itemHeight: 8,
          itemGap: 16,
          textStyle: {
            color: "#A3E2F4",
            fontSize: 12,
            fontWeight: 0,
          },
          data: ["A"],
        },
        polar: {},
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
          // formatter: "456456",
        },
        toolbox: {
          show: true,
        },
        series: [
          {
            name: "A",
            type: "bar",
            // radius: ["20%", "100%"],
            data: [
              {
                value: this.value[0],
                itemStyle: {
                  normal: {
                    color: "#f54d4d",
                  },
                },
              },
              {
                value: this.value[1],
                itemStyle: {
                  normal: {
                    color: "#f87544",
                  },
                },
              },
              {
                value: this.value[2],
                itemStyle: {
                  normal: {
                    color: "#ffae00",
                  },
                },
              },
              {
                value: this.value[3],
                itemStyle: {
                  normal: {
                    color: "#dcff00",
                  },
                },
              },
              {
                value: this.value[4],
                itemStyle: {
                  normal: {
                    color: "#25d053",
                  },
                },
              },
              {
                value: this.value[5],
                itemStyle: {
                  normal: {
                    color: "#01fff5",
                  },
                },
              },
              {
                value: this.value[6],
                itemStyle: {
                  normal: {
                    color: "#007cff",
                  },
                },
              },
              {
                value: this.value[7],
                itemStyle: {
                  normal: {
                    color: "#4245ff",
                  },
                },
              },
            ],
            coordinateSystem: "polar",
          },
        ],
      };
      this.chart.setOption(option);
    },
    draw() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(
        document.getElementById("centreLeft2Chart")
      );
      //  ----------------------------------------------------------------

      let option = {
        angleAxis: {
          interval: 1,
          type: "category",
          data: [
            "there1",
            "there2",
            "there3",
            "there4",
            "there5",
            // "there6",
            // "there7",
            // "there8",
            // "there9",
            // "there10"
          ],
          z: 5,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00c7ff",
              width: 1,
              type: "solid",
            },
          },
          axisLabel: {
            interval: 0,
            show: true,
            color: "#00c7ff",
            margin: 8,
            fontSize: 12,
          },
        },
        radiusAxis: {
          min: 0,
          max: 100,
          interval: 20,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00c7ff",
              width: 1,
              type: "solid",
            },
          },
          axisLabel: {
            formatter: "{value} %",
            show: false,
            padding: [0, 0, 20, 0],
            color: "#00c7ff",
            fontSize: 16,
          },
          splitLine: {
            lineStyle: {
              color: "#00c7ff",
              width: 1,
              type: "solid",
            },
          },
        },
        legend: {
          show: true,
          orient: "vartical",
          top: "center",
          bottom: "0%",
          itemWidth: 16,
          itemHeight: 8,
          itemGap: 16,
          textStyle: {
            color: "#A3E2F4",
            fontSize: 12,
            fontWeight: 0,
          },
          data: ["A"],
        },
        polar: {},
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
          // formatter: "456456",
        },
        toolbox: {
          show: true,
        },
        series: [
          {
            name: "A",
            type: "bar",
            radius: ["20%", "100%"],
            data: [
              {
                value: 87,
                itemStyle: {
                  normal: {
                    color: "#f54d4d",
                  },
                },
              },
              {
                value: 80,
                itemStyle: {
                  normal: {
                    color: "#f87544",
                  },
                },
              },
              {
                value: 75,
                itemStyle: {
                  normal: {
                    color: "#ffae00",
                  },
                },
              },
              {
                value: 69,
                itemStyle: {
                  normal: {
                    color: "#dcff00",
                  },
                },
              },
              {
                value: 63,
                itemStyle: {
                  normal: {
                    color: "#25d053",
                  },
                },
              },
              // {
              //   value: 54,
              //   itemStyle: {
              //     normal: {
              //       color: "#01fff5"
              //     }
              //   }
              // },
              // {
              //   value: 47,
              //   itemStyle: {
              //     normal: {
              //       color: "#007cff"
              //     }
              //   }
              // },
              // {
              //   value: 40,
              //   itemStyle: {
              //     normal: {
              //       color: "#4245ff"
              //     }
              //   }
              // },
              // {
              //   value: 35,
              //   itemStyle: {
              //     normal: {
              //       color: "#c32eff"
              //     }
              //   }
              // },
              // {
              //   value: 33,
              //   itemStyle: {
              //     normal: {
              //       color: "#ff62e8"
              //     }
              //   }
              // }
            ],
            coordinateSystem: "polar",
          },
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