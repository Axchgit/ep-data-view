<template>
  <div id="center">
    <div class="up">
      <div
        class="bg-color-black item"
        v-for="item in titleItem"
        :key="item.title"
      >
        <p class="ml-3 colorBlue fw-b">{{ item.title }}</p>
        <div>
          <dv-digital-flop
            :config="item.number"
            style="width: 100%; height: 0.5rem"
          />
        </div>
      </div>
    </div>
    <div class="down">
      <div class="ranking bg-color-black">
        <span style="color: #5cd9e8">
          <icon name="align-left"></icon>
        </span>
        <span class="fs-xl text mx-2 mb-1">今日业绩排行榜</span>
        <dv-scroll-ranking-board :config="ranking" style="height: 2.75rem" />
      </div>
      <div class="percent">
        <!-- <div class="item bg-color-black">
          <span>今日任务通过率</span>
          <centerChart :id="rate[0].id" :tips="rate[0].tips" :colorObj="rate[0].colorData" />
        </div>
        <div class="item bg-color-black">
          <span>今日任务达标率</span>
          <centerChart :id="rate[1].id" :tips="rate[1].tips" :colorObj="rate[1].colorData" />
        </div> -->
        <div class="water">
          <span style="color: #5cd9e8">
            <icon name="chart-area"></icon>
          </span>
          <span class="fs-xl text mx-2 mb-1">今日业绩目标达成率</span>
          <dv-water-level-pond :config="water" style="height: 2.75rem" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import centerChart from "@/components/echart/center/centerChartRate";

export default {
  data() {
    return {
      newData: {},
      newPercentage: {},
      titleItem: [
        {
          title: "今日累计签约商品",
          number: {
            number: [120],
            toFixed: 0,
            content: "{nt}件",
          },
        },
        {
          title: "今日累计业绩金额",
          number: {
            number: [18],
            toFixed: 1,
            content: "{nt}元",
          },
        },
        {
          title: "今日累计出单量",
          number: {
            number: [2],
            toFixed: 0,
            content: "{nt}单",
          },
        },
        {
          title: "本月累计签约商品",
          number: {
            number: [14],
            toFixed: 0,
            content: "{nt}件",
          },
        },
        {
          title: "本月累计业绩金额",
          number: {
            number: [106],
            toFixed: 1,
            content: "{nt}元",
          },
        },
        {
          title: "本月累计出单量",
          number: {
            number: [100],
            toFixed: 0,
            content: "{nt}单",
          },
        },
      ],
      ranking: {
        data: [],
        waitTime: "",
        // carousel: "page",
        unit: "",
      },
      water: {
        data: [45],
        shape: "roundRect",
        formatter: "{value}%",
        waveNum: 3,
      },
      // 通过率和达标率的组件复用数据
      // rate: [
      //   {
      //     id: "centerRate1",
      //     tips: 60,
      //     colorData: {
      //       textStyle: "#3fc0fb",
      //       series: {
      //         color: ["#00bcd44a", "transparent"],
      //         dataColor: {
      //           normal: "#03a9f4",
      //           shadowColor: "#97e2f5",
      //         },
      //       },
      //     },
      //   },
      //   {
      //     id: "centerRate2",
      //     tips: 40,
      //     colorData: {
      //       textStyle: "#67e0e3",
      //       series: {
      //         color: ["#faf3a378", "transparent"],
      //         dataColor: {
      //           normal: "#ff9800",
      //           shadowColor: "#fcebad",
      //         },
      //       },
      //     },
      //   },
      // ],
    };
  },
  mounted() {
    this.fetchList(); //获取数据
    this.getSixNumber(); //获取数据
    this.getPerformancePercentage(); //获取数据

    window.setInterval(() => {
      setTimeout(() => {
        this.fetchList();
        this.getSixNumber();
        this.getPerformancePercentage();
      }, 0);
    }, process.env.VUE_APP_REFRESH);
    // console.log(process.env.VUE_APP_REFRESH)
  },
  methods: {
    async fetchList() {
      const { status, data } = await this.$http.get(
        process.env.VUE_APP_API + "/DataView/getPerformanceRankingWithinDay"
      );
      if (status === 200) {
        if (JSON.stringify(data.data) !== JSON.stringify(this.ranking.data)) {
          this.ranking = {};
          this.ranking.data = data.data;
          this.ranking.unit = "单";
          this.ranking.waitTime = process.env.VUE_APP_REFRESH;
        }
      }
    },

    async getPerformancePercentage() {
      const { status, data } = await this.$http.get(
        process.env.VUE_APP_API + "/DataView/getPerformancePercentage"
      );
      if (status === 200) {
        // console.log(123, data.data);
        this.water = {};

        this.newPercentage = {
          data: [(data.data*100).toFixed(2)],
          shape: "roundRect",
          formatter: "{value}%",
          waveNum: 3,
        };
        this.water = this.newPercentage;

        // if (JSON.stringify(data.data) !== JSON.stringify(this.ranking.data)) {
        //   this.ranking = {};
        //   this.ranking.data = data.data;
        //   this.ranking.unit = "单";
        //   this.ranking.waitTime = process.env.VUE_APP_REFRESH;
        // }
      }
    },

    async getSixNumber() {
      const { status, data } = await this.$http.get(
        process.env.VUE_APP_API + "/DataView/getTheSixNumber"
      );
      if (status === 200) {
        // if (JSON.stringify(data.data) !== JSON.stringify(this.ranking.data)) {
        // console.log(this.titleItem[1].number.number);
        // console.log(data.data);
        this.titleItem = [];
        this.newData = [
          {
            title: "今日累计签约商品",
            number: {
              number: [120],
              toFixed: 0,
              content: "{nt}件",
            },
          },
          {
            title: "今日累计业绩金额",
            number: {
              number: [18],
              toFixed: 1,
              content: "{nt}元",
            },
          },
          {
            title: "今日累计出单量",
            number: {
              number: [2],
              toFixed: 0,
              content: "{nt}单",
            },
          },
          {
            title: "本月累计签约商品",
            number: {
              number: [14],
              toFixed: 0,
              content: "{nt}件",
            },
          },
          {
            title: "本月累计业绩金额",
            number: {
              number: [106],
              toFixed: 1,
              content: "{nt}元",
            },
          },
          {
            title: "本月累计出单量",
            number: {
              number: [100],
              toFixed: 0,
              content: "{nt}单",
            },
          },
        ];
        this.titleItem = this.newData;
        // this.titleItem =[]
        for (let i = 0; i < 6; i++) {
          // console.log(this.titleItem[i].number.number);
          // console.log(typeof(this.titleItem[i].number.number))
          // console.log(typeof((Object)(data.data[i])))

          // this.titleItem[i].number.number = [1, 2];
          this.titleItem[i].number.number[0] = data.data[i];
        }
        // this.ranking = {};
        // this.ranking.data = data.data;
        // this.ranking.unit = "件商品";
        // this.ranking.waitTime = 4000;
        // }
      }
    },
  },
  components: {
    // centerChart,
    // centerChart1,
    // centerChart2
  },
};
</script>

<style lang="scss" scoped>
#center {
  display: flex;
  flex-direction: column;
  .up {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      border-radius: 0.0625rem;
      padding-top: 0.2rem;
      margin-top: 0.1rem;
      width: 32%;
      height: 0.875rem;
    }
  }
  .down {
    padding: 0.07rem 0.05rem;
    padding-bottom: 0;
    width: 100%;
    display: flex;
    height: 3.1875rem;
    justify-content: space-between;
    .bg-color-black {
      border-radius: 0.0625rem;
    }
    .ranking {
      padding: 0.125rem;
      width: 59%;
    }
    .percent {
      width: 40%;
      display: flex;
      flex-wrap: wrap;
      // .item {
      //   width: 50%;
      //   height: 1.5rem;
      //   span {
      //     margin-top: 0.0875rem;
      //     display: flex;
      //     justify-content: center;
      //   }
      // }
      .water {
        width: 100%;
      }
    }
  }
}
</style>