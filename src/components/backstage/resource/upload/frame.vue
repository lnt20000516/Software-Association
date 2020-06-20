<template>
  <div class="frame">
    <div v-if="uploadProgress.isUpload" style="text-align:left;">
      <span v-text="qiniuData.key"></span>
      <small style="color:#999999;margin:auto 8px;" v-text="uploadProgress.tip"></small>
      <el-row :gutter="24">
        <el-col :span="22">
          <el-progress :percentage="uploadProgress.percentage" :status="uploadProgress.status"></el-progress>
        </el-col>
        <el-col :span="2">
          <el-link type="danger" style="font-size:13px;">删除</el-link>
        </el-col>
      </el-row>
    </div>
    <el-upload
      v-else
      class="upload-demo"
      drag
      :action="upload_qiniu_url"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :on-error="handleError"
      :before-upload="beforeAvatarUpload"
      :data="qiniuData"
    >
      <div class="el-default" :style="{'padding':`${maxW*0.05}px ${maxW*0.12}px`}">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </div>
      <div class="el-upload__tip" slot="tip">为节省服务器资源请尽量上传容量小的文件，文件上传后只在服务器保存30天</div>
    </el-upload>
  </div>
</template>
<script>
export default {
  data() {
    return {
      qiniuData: {
        key: "",
        token: ""
      },
      upload_qiniu_url: "http://upload-z2.qiniup.com",
      imageUrl: "",
      uploadProgress: {
        isUpload: false,
        percentage: 0,
        status: null,
        tip: "上传中"
      }
    };
  },
  props: {
    isMedium: {
      type: Boolean,
      default: false
    },
    isSmall: {
      type: Boolean,
      default: false
    },
    maxH:{
      type:Number,
      default:0
    },
    maxW:{
      type:Number,
      default:0
    }
  },
  created() {
    this.getQiniuToken();
  },
  methods: {
    getQiniuToken: function() {
      let nowDate = new Date();
      let month = nowDate.getMonth() + 1;
      if (month < 10) month = "0" + month;
      let fileName = `${nowDate.getFullYear()}${month}${nowDate.getDate()}${nowDate.getHours()}${nowDate.getMinutes()}${nowDate.getSeconds()}`;
      this.qiniuData.key = fileName;
      this.$emit("setResName", this.qiniuData.key);
      this.$axios
        .get("resources/token", {
          params: {
            fileKey: fileName
          }
        })
        .then(res => {
          this.qiniuData.token = res.data.data;
        });
    },
    beforeAvatarUpload: function() {
      this.uploadProgress.isUpload = true;
      this.uploadProgress.percentage = Math.floor(Math.random() * 20 + 20);
    },
    handleAvatarSuccess: function(res, file) {
      this.uploadProgress.percentage = Math.floor(Math.random() * 20 + 40);
      setTimeout(() => {
        this.uploadProgress.percentage = Math.floor(Math.random() * 20 + 70);
        this.$axios
          .get(`/resources/download/${this.qiniuData.key}`)
          .then(res => {
            this.uploadProgress.percentage = 100;
            this.uploadProgress.status = "success";
            this.uploadProgress.tip = "上传成功";
            this.$emit("uploadScs");

            this.imageUrl = res.data.data;
            console.log(this.uploadProgress);
          });
      }, 500);
    },
    handleError: function(res) {
      this.uploadProgress.status = "exception";
      this.uploadProgress.tip = "上传失败";
      setTimeout(() => {
        this.uploadProgress.isUpload = false;
      }, 1000);
      this.$message({
        message: "上传失败",
        duration: 2000,
        type: "warning"
      });
    }
  }
};
</script>
<style>
.el-upload-dragger {
  width: 100%;
  height: 100%;
}
.frame {
  margin: 30px auto;
}
</style>