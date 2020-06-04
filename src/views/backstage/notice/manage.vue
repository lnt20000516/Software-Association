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
          <router-link to="/backstage/notice/edit" tag="div" class="operationBtn">
            <el-button type="primary" round style="padding:9px 15px;">
              <i class="el-icon-edit"></i>
              写个公告
            </el-button>
          </router-link>
          <el-input
            style="width:240px;float:left;margin:10px 0;"
            v-model="state"
            size="small"
            placeholder="请输入标题搜索"
          ></el-input>
        </el-col>
      </el-row>
       <div class="badge">{{draftBadge}}</div>
       <el-row :gutter="24">
        <el-col :span="24">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="已发布" name="first">
              <newsData ref="newsData1"></newsData>
            </el-tab-pane>
            <el-tab-pane label="草稿" name="second">
              <newsData ref="newsData2"></newsData>
            </el-tab-pane>
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
      activeName: "first",
      activeFlag: 0,
      allSort: "",
      restaurants: [],
      state: "",
      timeout: null
    };
  },
  created() {
    this.setDraftBadge();
    this.setAllSort();
  },
  methods: {
    setNotice(index) {
      this.$refs.newsData1.newsFlag = this.activeFlag;
      this.$refs.newsData1.title = this.title;
      this.$refs.newsData1.setNotice();
      this.$refs.newsData2.newsFlag = this.activeFlag;
      this.$refs.newsData2.title = this.title;
      this.$refs.newsData2.setNotice();
    },
    setAllSort() {
      this.$axios("newscategory/", {
        method: "get"
      }).then(res => {
        console.log(res);
        this.allSort = res.data.records;
      });
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
      this.activeFlag = tab.index;
      this.setNotice(tab.index);
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  watch: {
    state: function(newsVal) {
      this.title = newsVal;
      this.setNotice();
    }
  },
  components: {
    newsData
  }
};
</script>
<style scoped>
.operationBtn {
  float: left;
  margin: 8px;
}
.badge{
  width: 15px;
  height: 15px;
  background-color: #409eff;
  font-size: 12px;
  position: absolute;
  left: 135px;
  border-radius: 50%;
  padding: 3px;
  color: white;
  z-index: 9;
}

</style>

