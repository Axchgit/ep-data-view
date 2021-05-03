<!--
 * @Description: 
 * @Author: xch
 * @Date: 2020-09-20 02:39:12
 * @FilePath: \vue-framed:\wamp64\www\ep-data-view\src\views\centerLeft2.vue
 * @LastEditTime: 2021-05-03 18:57:35
 * @LastEditors: xch
-->
<template>
  <div id="centreLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-pie"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">订单金额分布图</span>
          <dv-decoration-1 style="width:1.25rem;height:.25rem; position:relative;top:-.0375rem;" />
        </div>
      </div>
      <div class="d-flex jc-center">
        <centreLeft2Chart :data-arr="dataArr" />
      </div>
    </div>
  </div>
</template>

<script>
import centreLeft2Chart from "@/components/echart/centerLeft2/centreLeft2Chart";
export default {
  data() {
    return {
      dataArr: {},
    };
  },
  components: {
    centreLeft2Chart,
  },
  mounted() {
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
        process.env.VUE_APP_API+"/DataView/OrderAmountDistribution"
      );
      if (status === 200) {
        if (JSON.stringify(data.data) !== JSON.stringify(this.dataArr)) {
          this.dataArr = data.data;
        }
      }
    },
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
}
</style>