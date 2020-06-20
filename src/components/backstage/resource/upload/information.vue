<template>
  <div class="upload-information">
    <h3>基本信息</h3>
    <p class="info-title">
      <span style="color:red;margin:0;font-size:18px;">*</span>
      <span>上传封面:</span>(格式jpeg、png，文件大小≤6MB，建议尺寸≥178px*178px)
    </p>
    <uploadCover @setLogo="setLogo"></uploadCover>
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
    <el-select v-model="res.reSortName" placeholder="请选择">
      <el-option
        v-for="item in resourceCategory"
        :key="item.id"
        :label="item.remark"
        :value="item.resourceCategoryName"
      >
        <span style="float:left">{{item.remark}}</span>
        <span style="float:right;color:#8492a6;font-size:13px">{{item.resourceCategoryName}}</span>
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
    <el-button type="primary" round @click="uploadResInfo()">立即上传</el-button>
    <el-button type round>取消上传</el-button>
  </div>
</template>
<script>
import uploadCover from "@/components/backstage/resource/upload/information/uploadCover.vue";
export default {
  data() {
    return {
      author: "1",
      resourceCategoryName: "",
      description: "",
      // res: {
      //   author: "",
      //   desc: "",
      //   reSortName: 0,
      //   resLogo: "",
      //   resName: ""
      // },
      res: {
        author: "1",
        description: null,
        reSortName: null,
        resourceCategoryID: 0,
        resourceLogo: null,
        resourceName: null
      },
      resourceCategory: []
    };
  },
  props: {
    resName: {
      type: String,
      default: ""
    }
  },
  created() {
    this.setResSort();
    this.res.resourceName = this.resName;
  },
  watch: {
    author(newVal) {
      if (newVal === "1") {
        res.author = "1";
      }
    }
  },
  methods: {
    setLogo(val) {
      this.res.resourceLogo = val;
    },
    async setResSort() {
      try {
        let res = await this.$axios.get("resocategory/page", {
          params: {
            limit: 1000
          }
        });
        console.log(res);
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
        if (this.res.author === "1")
          this.res.author =await this.getMemberName();
        this.resourceCategory.forEach(item=>{
          if(item.resourceCategoryName===this.res.reSortName){
            this.res.resourceCategoryID=item.id;
          }
        })
        let res = await this.$axios.post("resources/", this.res);
        if (res.status === 200) {
          if (res.data.code === 200) {
            this.$message.success({
              message: "上传成功"
            });
            console.log(res);
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
    async getMemberName() {
      try {
        let id = this.$cookies.get("activeUser").split("&")[0];
        let res = await this.$axios.get("member/" + id);
        console.log(res);
        if (res.status === 200) {
          if (res.data.code === 200) {
            return res.data.data.memberName;
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
    }
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
  margin: 15px0;
}
</style>