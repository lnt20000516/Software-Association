<template>
  <div class="notice-edit">
    <el-row :gutter="24">
      <el-row :gutter="24">
        <div style="margin:23px 0;">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Backstage/notice' }" style="font-size:18px;">所有公告</el-breadcrumb-item>
            <el-breadcrumb-item style="font-size:18px;">编辑公告</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="18">
          <div style="width:90%">
          <el-input style="margin:10px 0;" v-model="news.title" placeholder="标题"></el-input>
          <edit ref="edit"></edit>
          <div style="float:right;margin:10px 0;">
            <el-button @click="putOut(1)">保存草稿</el-button>
            <el-button type="primary" @click="putOut(0)">发布公告</el-button>
          </div>
          </div>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix" style="text-align:left;font-weight:bold;">
              <span>操作</span>
            </div>
            <div>
              <sidebar ref="sidebar" :operation="operation"></sidebar>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import edit from "@/components/backstage/notice/edit/froalaEdit.vue";
import sidebar from "@/components/backstage/notice/edit/sidebar.vue";
export default {
  data() {
    return {
      adminId: "",
      news: {
        title: "",
        content: ""
      },
      operation: {
        top: 0,
        newsCategoryId: "",
        newsLabels: []
      }
    };
  },
  created() {
    this.adminId = this.$cookies.get("activeUser").split("&")[0];
    let id = this.$route.query.id;
    if (id) {
      this.setPage(id);
    }
  },
  methods: {
    async putOut(flag) {
      //数据
      this.news.content = this.$refs.edit.content;
      this.operation = this.$refs.sidebar.operation;
      console.log((new Date(this.operation.date) - 0) / 1000);
      //判断是修改还是发布
      let method = "post";
      let data = {
        adminId: this.adminId,
        categoryId: this.operation.newsCategoryId,
        content: this.news.content,
        flag: flag,
        newsLabel: this.operation.newsLabels.join(","),
        title: this.news.title,
        top: this.operation.top,
        topTime: this.operation.date
          ? (new Date(this.operation.date) - 0) / 1000
          : (new Date() - 0) / 1000
      };
      if (this.$route.query.id) {
        method = "put";
        data.newsId = this.$route.query.id;
      }
      try {
        let res = await this.$axios("news/", {
          method: method,
          data: data
        });
        if (res.status === 200) {
          if (res.data.code === 200) {
            let msg = "";
            if (flag == 1) msg = "保存成功";
            else msg = "发布成功";
            this.$message.success(msg);
            this.$router.push("/backstage/notice/manager");
          } else {
            this.$message.error(res.data.message);
          }
        } else {
          this.$message.error({
            message: "请求错误"
          });
        }
      } catch (err) {
        this.$message.error({
          message: err
        });
      }
    },
    async setPage(id) {
      try {
        let res = await this.$axios.get("news/" + id);
        if (res.status === 200) {
          if (res.data.code === 200) {
            this.news.title = res.data.data.title;
            this.$refs.edit.resetValue(res.data.data.content);
            let operation = {
              top: res.data.data.top,
              newsCategoryId: res.data.data.newsCategory.id,
              newsLabels: res.data.data.newsLabel.split(",")
            };
            this.$refs.sidebar.operation = operation;
          } else {
            this.$message.error({
              message: res.data.message
            });
          }
        } else {
          this.$message.error({
            message: "请求错误"
          });
        }
      } catch (err) {
        this.$message.error({
          message: err
        });
      }
    }
  },
   mounted() {
    window.onbeforeunload = function(e) {
      e=e||window.event;
      if(e){
        e.retrunValue='关闭提示';
      }
      return '关闭提示';
    };
  },
  components: {
    edit,
    sidebar
  }
};
</script>

