<template>
  <div id="centreRight1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-line"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">月度业绩佣金排行榜</span>
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <dv-scroll-board :config="config" style="width:3.375rem;height:4.28rem" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newData: [],
      rightOnedataArr: {},
      config: {
        // header: ["组件", "分支", "覆盖率"],
        // data: [
        //   ["组件1", "dev-1", "<span  class='colorGrass'>↑75%</span>"],
        //   ["组件2", "dev-2", "<span  class='colorRed'>↓33%</span>"],
        //   ["组件3", "dev-3", "<span  class='colorGrass'>↑100%</span>"],
        //   ["组件4", "rea-1", "<span  class='colorGrass'>↑94%</span>"],
        //   ["组件5", "rea-2", "<span  class='colorGrass'>↑95%</span>"],
        //   ["组件6", "fix-2", "<span  class='colorGrass'>↑63%</span>"],
        //   ["组件7", "fix-4", "<span  class='colorGrass'>↑84%</span>"],
        //   ["组件8", "fix-7", "<span  class='colorRed'>↓46%</span>"],
        //   ["组件9", "dev-2", "<span  class='colorRed'>↓13%</span>"],
        //   ["组件10", "dev-9", "<span  class='colorGrass'>↑76%</span>"],
        // ],
        // rowNum: 7, //表格行数
        // headerHeight: 35,
        // headerBGC: "#0f1325", //表头
        // oddRowBGC: "#0f1325", //奇数行
        // evenRowBGC: "#171c33", //偶数行
        // index: true,
        // columnWidth: [50],
        // align: ["center"],
      },
    };
  },
  components: {},
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
        process.env.VUE_APP_API+"/DataView/expecCommissionRanking"
      );
      if (status === 200) {
        if (
          JSON.stringify(data.data) !== JSON.stringify(this.rightOnedataArr)
        ) {
          this.rightOnedataArr = data.data;
          let valueArr = Object.values(this.rightOnedataArr);
          console.log(Object.values(valueArr));
          //知识点:处理对象数组
          for (let i = 0; i < this.rightOnedataArr["length"]; i++) {
            this.newData.push(Object.values(this.rightOnedataArr[i]));
          }
          this.config.data = [];
          this.config.data = this.newData;

          this.config = {
            header: ["姓名" ,"预计佣金"],
            data: this.newData,
            rowNum: 7, //表格行数
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
  },
};
</script>

<style lang="scss">
#centreRight1 {
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
  .body-box {
    border-radius: 0.125rem;
    overflow: hidden;
  }
}
</style>