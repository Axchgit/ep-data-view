<template>
  <div id="index">
    <dv-full-screen-container class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <div class="d-flex jc-center">
          <dv-decoration-10 style="width: 33.3%; height: 0.0625rem" />
          <div class="d-flex jc-center">
            <dv-decoration-8
              :color="['#568aea', '#000000']"
              style="width: 2.5rem; height: 0.625rem"
            />
            <div class="title">
              <span class="title-text">大数据可视化平台</span>
              <dv-decoration-6
                class="title-bototm"
                :reverse="true"
                :color="['#50e3c2', '#67a1e5']"
                style="width: 3.125rem; height: 0.1rem"
              />
            </div>
            <dv-decoration-8
              :reverse="true"
              :color="['#568aea', '#000000']"
              style="width: 2.5rem; height: 0.625rem"
            />
          </div>
          <dv-decoration-10
            style="width: 33.3%; height: 0.0625rem; transform: rotateY(180deg)"
          />
        </div>

        <!-- 第二行 -->
        <div class="d-flex jc-between px-2">
          <div class="d-flex" style="width: 40%">
            <div
              class="react-right ml-4"
              style="
                width: 6.25rem;
                text-align: left;
                background-color: #0f1325;
              "
            >
              <span class="react-before"></span>
              <span class="text">数据分析1</span>
            </div>
            <div class="react-right ml-3" style="background-color: #0f1325">
              <span class="text colorBlue">数据分析2</span>
            </div>
          </div>
          <div style="width: 40%" class="d-flex">
            <div class="react-left bg-color-blue mr-3">
              <span class="text fw-b">vue-big-screen</span>
            </div>
            <div
              class="react-left mr-4"
              style="
                width: 6.25rem;
                background-color: #0f1325;
                text-align: right;
              "
            >
              <span class="react-after"></span>
              <span class="text">{{
                nowTime
              }}</span>
            </div>
          </div>
        </div>

        <div class="body-box">
          <!-- 第三行数据 -->
          <div class="content-box">
            <div>
              <dv-border-box-12>
                <centerLeft1 />
              </dv-border-box-12>
            </div>
            <div>
              <dv-border-box-12>
                <centerLeft2 />
              </dv-border-box-12>
            </div>
            <!-- 中间 -->
            <div>
              <center />
            </div>
            <!-- 中间 -->
            <div>
              <centerRight2 />
            </div>
            <div>
              <dv-border-box-13>
                <centerRight1 />
              </dv-border-box-13>
            </div>
          </div>

          <!-- 第四行数据 -->
          <div class="bototm-box">
            <dv-border-box-13>
              <bottomLeft />
            </dv-border-box-13>
            <dv-border-box-12>
              <bottomRight />
            </dv-border-box-12>
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import moment from "moment";
import centerLeft1 from "./centerLeft1";
import centerLeft2 from "./centerLeft2";
import centerRight1 from "./centerRight1";
import centerRight2 from "./centerRight2";
import center from "./center";
import bottomLeft from "./bottomLeft";
import bottomRight from "./bottomRight";
export default {
  data() {
    return {
      loading: true,
      nowTime: 123,
    };
  },
  components: {
    centerLeft1,
    centerLeft2,
    centerRight1,
    centerRight2,
    center,
    bottomLeft,
    bottomRight,
  },
  // filters: {
  //   moment: function () {
  //     moment.locale(); 
  //     return moment().format('LLLL');
  //   },
  //   formatDate: function (value) {
  //     // var date = new Date(value);
  //     // var year = date.getFullYear();
  //     // var month = padDate(date.getMonth()+1);
  //     // var day = padDate(date.getDate());
  //     // var hours = padDate(date.getHours());
  //     // var minutes = padDate(date.getMinutes());
  //     // var seconds = padDate(date.getSeconds());
  //     // //整理好的数据返回出去
  //     // return year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds;
  //     // return formatTimeToStr(value, "yyyy-MM-dd");
  //     let wk = value.getDay();
  //     let year = value.getFullYear();
  //     /* 在日期格式中，月份是从0开始的，因此要加0
  //      * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
  //      * */
  //     let month =
  //       value.getMonth() + 1 < 10
  //         ? "0" + (value.getMonth() + 1)
  //         : value.getMonth() + 1;
  //     let day = value.getDate() < 10 ? "0" + value.getDate() : value.getDate();
  //     let hours =
  //       value.getHours() < 10 ? "0" + value.getHours() : value.getHours();
  //     let minutes =
  //       value.getMinutes() < 10 ? "0" + value.getMinutes() : value.getMinutes();
  //     let seconds =
  //       value.getSeconds() < 10 ? "0" + value.getSeconds() : value.getSeconds();
  //     // 拼接
  //     let weeks = [
  //       "星期日",
  //       "星期一",
  //       "星期二",
  //       "星期三",
  //       "星期四",
  //       "星期五",
  //       "星期六",
  //     ];
  //     let week = weeks[wk];
  //     return (
  //       year +
  //       "-" +
  //       month +
  //       "-" +
  //       day +
  //       " " +
  //       hours +
  //       ":" +
  //       minutes +
  //       ":" +
  //       seconds +
  //       "  " +
  //       week
  //     );
  //   },
  // },
  mounted() {
    this.cancelLoading();
    this.timer = setInterval(() => {
      moment.locale('zh-cn')
      this.nowTime = moment().format('YYYY年 Mo Do dddd HH:mm:ss'); // 修改数据date
    }, 1000);
  },
  methods: {
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 5000);
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
};
</script>

<style lang="scss">
@import "../assets/scss/index.scss";
</style>