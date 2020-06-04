<template>
  <div class="Sidebar">
    <el-col :span="24">
      <p>置顶</p>
      <el-switch style="float:right;" v-model="top" active-color="#409EFF" inactive-color="#e0e0e0"></el-switch>
    </el-col>
    <el-col :span="24" v-if="top">
      <p>高级置顶</p>
      <el-switch
        style="float:right;"
        v-model="highTop"
        active-color="#409EFF"
        inactive-color="#e0e0e0"
      ></el-switch>
    </el-col>
    <el-col :span="24">
      <p>选择分类</p>
      <div id="category" class="overflow selectDiv">
        <el-radio
          v-for="item in categoryData"
          :key="item.id"
          v-model="operation.newsCategoryId"
          :label="item.id"
          style="float:left;width:100%;"
        >{{item.newsCategoryName}}</el-radio>
      </div>
    </el-col>
    <el-col :span="24">
      <p style=" margin: 10px 0;">文章标签</p>
      <div class="overflow selectDiv">
        <el-tag
          style=" margin: 3px;"
          :key="tag"
          v-for="tag in operation.newsLabels"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >{{tag}}</el-tag>
      </div>
      <el-input
        class="input-new-tag"
        style="margin:10px 0;width:100%"
        v-if="inputVisible"
        v-model="newLabel"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
      ></el-input>
      <el-button style v-else class="button-new-tag" size="small" @click="showInput">添加标签</el-button>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      top: false,
      highTop: false,
      operation: {
        top: 0,
        newsCategoryId: "",
        newsLabels: []
      },
      categoryData: [],
      inputVisible: false,
      newLabel: ""
    };
  },
  computed: {
    topVal: function() {
      if (this.top == true && this.highTop == true) {
        this.operation.top = 2;
      } else if (this.top == true) {
        this.operation.top = 1;
      } else {
        this.operation.top = 0;
      }
      console.log(this.operation.top);
    }
  },
  watch: {
    "operation.top": function(newVal, oldVal) {
      console.log(newVal);
      if (newVal === 2) {
        this.top = true;
        this.highTop = true;
      } else if (newVal === 1) {
        this.top = true;
        this.highTop = false;
      } else {
        this.top = false;
        this.highTop = false;
      }
    },
    top: function(newVal, oldVal) {
      this.setTop(newVal, this.highTop);
    },
    highTop: function(newVal, oldVal) {
      this.setTop(this.top, newVal);
    }
  },
  created() {
    this.setCategoryData();
  },
  methods: {
    setCategoryData() {
      //设置分类数据
      let _this = this;
      this.$axios("newscategory/", {
        method: "get",
        headers: {
          "X-XSRF-TOKEN": this.$cookies.get("XSRF-TOKEN"),
          "HEADER-TOKEN": localStorage.getItem("HEADER_TOKEN")
        },
        credentials: "include"
      }).then(res => {
        this.categoryData = res.data.records;
        console.log(res);
      });
    },
    //添加标签
    handleClose(tag) {
      this.operation.newsLabels.splice(
        this.operation.newsLabels.indexOf(tag),
        1
      );
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let label = this.operation.newsLabels;
      if (label.length >= 6) {
        this.$message.error("标签最多只能有六个");
      } else {
        let newLabel = this.newLabel;
        if (newLabel.length <= 0 || newLabel.length > 6) {
          this.$message.error("标签必须在1-6个字之间哦~");
        } else if (label.indexOf(newLabel) != -1) {
          this.$message.error("标签重复啦!>__<");
        } else {
          label.push(newLabel);
        }
      }
      this.inputVisible = false;
      this.newLabel = "";
    },
    //设置top值
    setTop(top, highTop) {
      if (top && highTop) {
        this.operation.top = 2;
      } else if (top) {
        this.operation.top = 1;
      } else {
        this.operation.top = 0;
      }
    }
  }
};
</script>

<style scoped>
.el-col {
  text-align: left;
  padding: 10px 0;
}
p {
  display: inline;
}
.selectDiv {
  overflow: auto;
  width: 90%;
  height: 160px;
  border: 1px solid #e0e0e0;
  padding: 10px;
}

.overflow {
  overflow: hidden;
}

.overflow:hover {
  overflow: auto;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.el-button {
  margin: 10px 0;
  padding: 0 10px;
  box-sizing: content-box;
  width: 90%;
}
</style>
