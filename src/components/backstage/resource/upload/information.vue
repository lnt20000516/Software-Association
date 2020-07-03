<template>
  <div class="upload-information">
    <h3>基本信息</h3>
    <p class="info-title">
      <span style="color:red;margin:0;font-size:18px;">*</span>
      <span>上传封面:</span>(格式jpeg、png，文件大小≤6MB，建议尺寸≥178px*178px)
    </p>
    <upload-cover @setLogo="setLogo"></upload-cover>
    <p class="info-title" style="clear:both;">
      <span style="color:red;margin:0;font-size:18px;">*</span>
      <span>作者：</span>
    </p>
    <el-radio v-model="author" label="1">本人</el-radio>
    <el-radio v-model="author" label="2">他人</el-radio>
    <el-input v-model="res.author" placeholder="请输入作者姓名" v-if="author==='2'"></el-input>
    <p class="info-title" style="clear:both;">
      <span style="color:red;margin:0;font-size:18px;">*</span>
      <span>资源名称:</span>
    </p>
    <el-input v-model="res.resourceName" placeholder="键入资源名称"></el-input>
    <p class="info-title" style="clear:both;">
      <span style="color:red;margin:0;font-size:18px;">*</span>
      <span>资源类别:</span>
    </p>
    <el-select v-model="resSortName" placeholder="请选择">
      <el-option
        v-for="item in resourceCategory"
        :key="item.id"
        :label="item.remark"
        :value="item.resourceCategoryName"
      >
        <span style="float:left">{{item.remark}}</span>
        <span style="float:right;color:#8492a6;font-size:13px">{{item.resSortName}}</span>
      </el-option>
    </el-select>
    <p class="info-title" style="clear:both;">
      <span style="color:red;margin:0;font-size:18px;">*</span>
      <span>资源描述:</span>
    </p>
    <el-input
      type="textarea"
      placeholder="输入更多资源信息"
      v-model="res.description"
      maxlength="30"
      show-word-limit
      resize
      rows="4"
    />
    <div style="margin: 10px;">
      <el-button type="primary" plain @click="uploadResInfo()"><i class="el-icon-upload"></i> 立即上传</el-button>
      <el-popover placement="top" width="160" v-model="isOpenClearTip">
        <p>
          <i class="el-icon-info" style="color:red"></i> 取消后将不会保留您输入的数据
        </p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="isOpenClearTip = false">点错了</el-button>
          <el-button type="primary" size="mini" @click="clearUpload()">好的</el-button>
        </div>
        <el-button slot="reference" type="text" style="color:#666666;"  round >取消上传</el-button>
      </el-popover>
    </div>
  </div>
</template>
<script>
import uploadCover from "@/components/backstage/resource/upload/information/uploadCover.vue";
export default {
  data() {
    return {
      author: "1", //用于判定选择为本人还是他人
      resSortName: "", //用于绑定选择的资源分类
      res: {
        //上传给服务器的数据
        author: null,
        description: null,
        fileKey: "",
        type: "2",
        resourceCategoryID: 0,
        resourceLogo: null,
        resourceName: null
      },
      resourceCategory: [],
      isOpenClearTip: false
    };
  },
  props: {
    resName: {
      type: String,
      default: ""
    },
    serverType: {
      type: String,
      default: "2"
    }
  },
  watch: {
    serverType(newVal) {
      this.res.type = newVal;
    }
  },
  created() {
    this.setResSort();
    this.res.resourceName = this.resName;
    this.res.fileKey = this.resName;
  },
  methods: {
    setLogo(val) {
      //设置上传资源封面链接
      this.res.resourceLogo = val;
    },
    async setResSort() {
      //设置展示的分类
      try {
        let res = await this.$axios.get("resocategory/page", {
          params: {
            limit: 1000
          }
        });
        if (res.status === 200) {
          if (res.data.code === 200) {
            this.resourceCategory = res.data.data.records;
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
        console.log(err);
      }
    },
    async uploadResInfo() {
      try {
        if (this.author === "1") {
          await this.setAuthor();
        }
        this.resourceCategory.forEach(item => {
          if (item.resourceCategoryName === this.resSortName) {
            this.res.resourceCategoryID = item.id;
          }
        });
        let res = await this.$axios.post("resources/", this.res);
        if (res.status === 200) {
          if (res.data.code === 200) {
            this.$message.success({
              message: "上传成功"
            });
            this.$emit("init");
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
        console.log(err);
      }
    },
    clearUpload() {
      this.$emit("init");
    },
    async setAuthor() {
      //获取本人用户名
      try {
        let id = this.$cookies.get("activeUser").split("&")[0];
        let res = await this.$axios.get("member/" + id);
        console.log(res);
        if (res.status === 200) {
          if (res.data.code === 200) {
            this.res.author = res.data.data.memberName;
          } else {
            this.$message.error({
              message: "未获取到您的用户名，请确认是否清理localStorage"
            });
          }
        } else {
          this.$message.error({
            message: "请求错误"
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  mounted() {
    window.onbeforeunload = function(e) {
      e = e || window.event;
      if (e) {
        e.retrunValue = "关闭提示";
      }
      return "关闭提示";
    };
  },
  components: {
    uploadCover
  }
};
</script>
<style>
.upload-information {
  text-align: left;
}
.info-title {
  color: #888888;
  font-size: 13px;
}
.info-titlespan {
  color: #666666;
  font-size: 16px;
  margin: 10px;
}
.el-input {
  margin: 15px 0;
}
</style>