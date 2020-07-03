<template>
  <div class="">
    <div style="margin:23px ">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="width:150px">
        <el-breadcrumb-item style="font-size:18px;">借阅记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="date">
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button
        type="primary"
        size="medium"
        icon="el-icon-search"
        class="magrin"
        @click="query()"
      >查询</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%" max-height="300">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </div>
    <p id="title">借阅统计图</p>
    <chart class="charts" ref="chart1" :options="orgOptions" :auto-resize="true"></chart>
  </div>
</template>
<script>
import { timeDate } from "../../../tools/transformationDate";
export default {
  data() {
    return {
      orgOptions: {},
      value1: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    query() {
      var date = new Date("1970-01-19 16:40:18");
      var time1 = date.getTime();
      console.log(time1);
      time1 = timeDate(time1).dateTime;
      console.log(time1);
    }
  },
  mounted() {
    this.orgOptions = {
      title: {
        text: "ECharts 入门示例"
      },
      tooltip: {},
      legend: {
        data: ["借阅数量"]
      },
      xAxis: {
        data: [],
        axisLabel: {
          interval: 0, //横轴信息全部显示
          rotate: -15 //-15度角倾斜显示
        }
      },
      yAxis: {},
      series: [
        {
          name: "借阅数量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20],
          itemStyle: {
            normal: {
              color: "#6495ED",
              label: {
                show: true, //开启显示
                position: "top", //在上方显示
                textStyle: {
                  //数值样式
                  color: "#787878",
                  fontSize: 16
                }
              }
            }
          }
        }
      ]
    };
  }
};
</script>
<style scoped>
.main {
 padding: 40px 80px;
 text-align: left;
}
.charts {
  width: auto;
  height: 300px;
  margin-top: 2%;
}
button {
  margin-left: 2%;
}
.table {
  margin-top: 2%;
}
#title {
  margin-top: 5%;
  color: #696969;
}
</style>