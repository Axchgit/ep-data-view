<!--
 * @Description: 
 * @Author: xch
 * @Date: 2020-09-20 02:39:12
 * @FilePath: \vue-framed:\wamp64\www\ep-data-view\src\views\centerRight2.vue
 * @LastEditTime: 2021-05-23 00:22:29
 * @LastEditors: xch
-->
<template>
  <div id="centreRight2">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color: #5cd9e8">
          <icon name="align-left"></icon>
        </span>
        <span class="fs-xl text mx-2">今日员工登录记录</span>
      </div>
      <div class="d-flex jc-center body-box" style="margin-top: 0">
        <!-- <dv-capsule-chart :config="config" style="width: 100%;height:2rem" /> -->
        <dv-scroll-board :config="config" style="width: 100%; height: 4.5rem" />
        <!-- ---------------------------------------- -->
        <!-- <centreRight2Chart1></centreRight2Chart1> -->
      </div>
    </div>
  </div>
</template>

<script>
// import centreRight2Chart1 from "@/components/echart/centreRight2/centreRight2Chart1";

export default {
  data() {
    return {
      config: {
        // header: ["姓名", "登录次数", "最近时间"],
        // data: [
        //   ["行1列1", "行1列2", "行1列3"],
        //   ["行2列1", "行2列2", "行2列3"],
        //   ["行3列1", "行3列2", "行3列3"],
        //   ["行4列1", "行4列2", "行4列3"],
        //   ["行5列1", "行5列2", "行5列3"],
        //   ["行6列1", "行6列2", "行6列3"],
        //   ["行7列1", "行7列2", "行7列3"],
        //   ["行8列1", "行8列2", "行8列3"],
        //   ["行9列1", "行9列2", "行9列3"],
        //   ["行10列1", "行10列2", "行10列3"],
        // ],
        // index: true,
        // columnWidth: [50],
        // align: ["center"],
        // carousel: "page",
        // // rowNum:,
        // headerBGC: "#095875",
        // oddRowBGC: "#0e1326",
        // waitTime: 5000, //轮播间隔

        // data: [
        //   {
        //     name: "南阳",
        //     value: 167
        //   },
        //   {
        //     name: "周口",
        //     value: 67
        //   },
        //   {
        //     name: "漯河",
        //     value: 123
        //   },
        //   {
        //     name: "郑州",
        //     value: 55
        //   },
        //   {
        //     name: "西峡",
        //     value: 98
        //   }
        // ]
      },
    };
  },
  // components: { centreRight2Chart1 },
  mounted() {
    this.getLoginRecord();
    window.setInterval(() => {
      setTimeout(() => {
        this.getLoginRecord();
      }, 0);
    }, process.env.VUE_APP_REFRESH*10);
    // console.log(this.config.data)
  },
  methods: {
    async getLoginRecord() {
      const { status, data } = await this.$http.get(
        process.env.VUE_APP_API + "/DataView/getLoginRecordByDay"
      );
      if (status === 200) {
        this.config.data = data.data;
        // console.log(this.config.data);
        this.config = {
          header: ["姓名", "次数", "最近时间"],
          indexHeader:"序号",
          data: data.data,
          index: true,
          columnWidth: [50,70,60],
          align: ["center"],
          carousel: "page",
          // rowNum:,
          headerBGC: "#095875",
          oddRowBGC: "#0e1326",
          waitTime: 5000, //轮播间隔
        };
        // this.timeArr = data.data[0];
        // return data.data;
        // console.log(123,this.timeArr)
      }
    },
  },
};
</script>

<style lang="scss">
#centreRight2 {
  padding: 0.0625rem;
  height: 5rem;
  min-width: 5rem;
  border-radius: 0.0625rem;
  .bg-color-black {
    padding: 0.0625rem;
    height: 5.0625rem;
    border-radius: 0.125rem;
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    border-radius: 0.125rem;
    overflow: hidden;
  }
}
</style>