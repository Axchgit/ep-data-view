<template>
  <div id="centreLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color: #5cd9e8">
          <icon name="chart-bar"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">月度业绩排行榜</span>
          <dv-decoration-3
            style="
              width: 1.25rem;
              height: 0.25rem;
              position: relative;
              top: -0.0375rem;
            "
          />
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <dv-scroll-board :config="config" style="width100%;height:4rem" />
      </div>
      <!-- <div class="d-flex jc-center">
        <centreLeft1Chart />
      </div> -->
      <!-- 4个主要的数据 -->
      <!-- <div class="bottom-data">
        <div class="item-box" v-for="(item,index) in numberData" :key="index">
          <div class="d-flex">
            <span class="coin">￥</span>
            <dv-digital-flop :config="item.number" style="width:2.5rem;height:.625rem;" />
          </div>
          <p class="text" style="text-align: center;">
            {{item.text}}
            <span class="colorYellow">(件)</span>
          </p>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
// import centreLeft1Chart from "@/components/echart/centerLeft2/centreLeft1Chart";
export default {
  data() {
    return {
      newData: [],
      rightOnedataArr: {},
      config: {
        // lineWidth: 30,
        // activeRadius: "80%",
        // radius: "75%",
        // activeTimeGap: 2000,
        // data: [],
      },
      // numberData: [],
    };
  },
  components: {
    // centreLeft1Chart
  },
  mounted() {
    // this.changeTiming();
    this.fetchList(); //获取数据
    window.setInterval(() => {
      setTimeout(() => {
        this.fetchList();
      }, 0);
    }, process.env.VUE_APP_REFRESH);
    // console.log(process.env.VUE_APP_REFRESH)
  },
  methods: {
    async fetchList() {
      const { status, data } = await this.$http.get(
        process.env.VUE_APP_API + "/DataView/PerformanceRanking"
      );
      if (status === 200) {
        if (
          JSON.stringify(data.data) !== JSON.stringify(this.rightOnedataArr)
        ) {
          this.newData = [];
          this.rightOnedataArr = data.data;
          // let valueArr = Object.values(this.rightOnedataArr);
          // console.log(Object.values(valueArr));
          //知识点:处理对象数组
          for (let i = 0; i < this.rightOnedataArr["length"]; i++) {
            this.newData.push(Object.values(this.rightOnedataArr[i]));
          }
          this.config.data = [];
          this.config.data = this.newData;

          this.config = {
            header: ["姓名", "签单(件)"],
            data: this.newData,
            rowNum: 5, //表格行数
            headerHeight: 35,
            headerBGC: "#0f1325", //表头
            oddRowBGC: "#0f1325", //奇数行
            evenRowBGC: "#171c33", //偶数行
            index: true,
            columnWidth: [50],
            align: ["center"],
          };
          //           this.config.data = []
          // this.config.data = this.newData
          // console.log(this.newData)
          // console.log(this.config.data)

          // this.rightOnedataArr.value
          // let arr = [];
          // for (let i in this.rightOnedataArr) {
          //   arr.push(this.rightOnedataArr[i]); //属性
          //   //arr.push(obj[i]); //值
          // }
          // this.config.index = false
          // console.log(JSON.stringify(this.rightOnedataArr[0]));
          // console.log(JSON.stringify(this.config.data));

          // console.log(this.config.data);
        }
      }
    },
    // changeTiming() {
    //   setInterval(() => {
    //     this.changeNumber();
    //   }, 3000);
    // },
    // changeNumber() {
    //   this.numberData.forEach((item, index) => {
    //     item.number.number[0] += ++index;
    //     item.number = { ...item.number };
    //   });
    // },
  },
};
</script>

<style lang="scss">
#centreLeft1 {
  padding: 0.2rem;
  height: 5.125rem;
  min-width: 3.75rem;
  border-radius: 0.0625rem;
  .bg-color-black {
    height: 4.8125rem;
    border-radius: 0.125rem;
  }
  .text {
    color: #c3cbde;
  }
  .chart-box {
    margin-top: 0.2rem;
    width: 2.125rem;
    height: 2.125rem;
    .active-ring-name {
      padding-top: 0.125rem;
    }
  }

  .bottom-data {
    .item-box {
      float: right;
      position: relative;
      width: 50%;
      color: #d3d6dd;
      // 金币
      .coin {
        position: absolute;
        left: 0.1rem;
        top: 0.2125rem;
        font-size: 0.25rem;
        color: #ffc107;
      }
      .colorYellow {
        color: yellowgreen;
      }
    }
  }
}
</style>