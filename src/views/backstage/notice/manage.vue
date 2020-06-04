<template>
  <div class="Manage within">
    <el-row :gutter="24">
      <el-row :gutter="24">
        <el-col :span="24">
          <div style="margin:23px;">
            <el-breadcrumb separator-class="el-icon-arrow-right" style="width:150px">
              <el-breadcrumb-item style="font-size:18px;">协会公告</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24">
      <el-col style="width:400px;float:right;">
            <el-dropdown trigger="click" class="operationBtn" >
              <el-button type style="outline:none;padding:10px 15px;">
                所有分类
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item>双皮奶</el-dropdown-item>
                <el-dropdown-item>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <router-link to="/backstage/notice/edit" tag="div"  class="operationBtn" >
              <el-button type="primary" round style="padding:9px 15px;">
                <i class="el-icon-edit"></i>
                写个公告
              </el-button>
            </router-link>
            <el-button type="danger" round plain  class="operationBtn"  style="padding:9px 15px;">
              <i class="el-icon-delete"></i>
              批量删除
            </el-button>
            </el-col>
      </el-row>
      <el-row :gutter="24">
      <el-col :span="24">
         
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="已发布" name="first"> <newsData ref="newsData"></newsData></el-tab-pane>
            <el-tab-pane label="草稿" name="second"> <newsData ref="newsData"></newsData></el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import newsData from "@/components/backstage/notice/newsData.vue";
export default {
  data() {
    return {
      draftBadge: 0,
      activeName:'first',
    };
  },
  created() {
    this.setDraftBadge();
  },
  methods: {
    setNotice(flag) {
      this.$refs.newsData.newsFlag = flag;
      this.$refs.newsData.setNotice();
    },
    setDraftBadge() {
      //设置草稿总条数
      let _this = this;
      this.$axios("news/", {
        method: "get",
        credentials: "include",
        params: {
          newsFlag: 1,
          pageNo: 1,
          title: ""
        }
      }).then(res => {
        _this.draftBadge = res.data.totalCount;
        if (_this.draftBadge > 999) _this.draftBadge = "999+";
      });
    },
    openEdit() {
      this.$parent.openEdit();
    },
     handleClick(tab, event) {
        console.log(tab, event);
        this.setNotice(tab.index)
      }
  },
  components: {
    newsData
  }
};
</script>
<style scoped>
.operationBtn{
  float: left;
  margin: 8px;
}
</style>

