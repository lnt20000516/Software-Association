<template>
  <div class>
    <div style="margin:23px 0">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="width:150px">
        <el-breadcrumb-item style="font-size:18px;">借阅记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <span>项目</span>
      <el-select v-model="selected" placeholder="请选择">
        <el-option label="书籍名称" value="bookName"></el-option>
        <el-option label="借书人用户名" value="memberId"></el-option>
        <el-option label="借书人姓名" value="memberName"></el-option>
        <el-option label="0 全部，1 已归还，2 未归还" value="flag"></el-option>
      </el-select>
      <span>值</span>
      <el-input v-model="value" placeholder="请输入内容" class="size"></el-input>
      <el-button
        type="primary"
        size="medium"
        icon="el-icon-search"
        class="magrin"
        @click="query()"
      >查询</el-button>
      <el-divider></el-divider>
      <div class="menu">
        <el-table :data="bookData" style="width: 100%">
          <el-table-column prop="outdate" label="借出日期" width="150" align="center"></el-table-column>
          <el-table-column prop="outtime" label="借出时间" width="120" align="center"></el-table-column>
          <el-table-column prop="indate" label="应还日期" width="150" align="center"></el-table-column>
          <el-table-column prop="rdate" label="归还日期" width="150" align="center"></el-table-column>
          <el-table-column prop="overday" label="逾期天数" width="100" align="center"></el-table-column>
          <el-table-column prop="bookName" label="书刊名称" width="170" align="center"></el-table-column>
          <el-table-column prop="bookId" label="书刊条码" width="120" align="center"></el-table-column>
          <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[10,15,20,25,30]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { timeDate } from "../../../tools/transformationDate";
export default {
  created() {
    this.getData();
  },
  data() {
    return {
      selected: "",
      value: "",
      form: {
        bookName: "",
        bookId: 0
      },
      pagenum: 1,
      pagesize: 10,
      total: 10,
      bookData: [],
      book: {
        outdate: "",
        outtime: "",
        indate: "",
        overday: -15,
        bookName: "",
        bookId: 0,
        memberName: "",
        memberID: "",
        remark: ""
      },
      token: {}
    };
  },
  methods: {
    getToken: function() {
      //获取登录时存储在localStorage中的header-Token，作为上传凭证
      this.token["HEADER-TOKEN"] = localStorage.getItem("HEADER_TOKEN");
    },
    async query() {
      console.log(this.selected + "  " + this.value);
      const { data: res } = await this.$http.get(
        "bookborrow/search" + "?" + this.selected + "=" + this.value
      );
      if (res.code == 200) {
        this.bookData = res.data.records;
        this.selected = "";
        this.value = "";
        this.pagenum = res.data.current;
        this.total = res.data.total;
        this.$message.success("查询记录成功");
      }
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    async handleCurrentChange(val) {
      const { data: res } = await this.$http.get("bookborrow/search", {
        params: { pageNum: val }
      });
      this.bookData = res.data.records;
      this.pagenum = res.data.current;
    },
    async getData() {
      const { data: res } = await this.$http.get("bookborrow/search", {
        header: this.token
      });
      if (res.code == 200) {
        this.bookData = res.data.records;
        this.selected = "";
        this.value = "";
        this.pagenum = res.data.current;
        this.total = res.data.total;
        this.$message.success("查询记录成功");
        console.log(res.data);
      }
    }
  }
};
</script>
<style scoped>
.main {
  padding: 40px 80px;
}
.el-input {
  width: 300px;
  margin-right: 2%;
}

.left {
  float: left;
}
.right {
  float: right;
}
span {
  margin-left: 1%;
  margin-right: 1%;
}
.el-form {
  width: 80%;
}

.menu {
  margin-top: 5px;
}
</style>