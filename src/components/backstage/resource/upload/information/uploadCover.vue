<template>
  <div class="upload-information_cover">
    <el-popover placement="right" title="可选封面" trigger="manual" v-model="visible">
      <div>
        <!--可选封面-->
        <ul style="list-style:none;">
          <li v-for="(item,index) in cover" :key="index" style="float:left;">
            <img :src="item" alt class="choosable-img" @click="uploadCover(index)" />
          </li>
        </ul>
      </div>
      <!--自选封面-->
      <div style="float:left;" slot="reference" @click="visible=true" v-autoClick>
        <el-upload
          class="avatar-uploader"
          action="http://120.26.177.203/news/picturesUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleError"
          :before-upload="beforeAvatarUpload"
          :on-progress="handleProgress"
          :headers="token"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-if="!isUpload" class="el-icon-plus avatar-uploader-icon"></i>
          <el-progress
            style="width: 178px;height: 178px;"
            width="178"
            stroke-width="3"
            v-if="!imageUrl&&isUpload"
            type="circle"
            :percentage="uploadProgress.percentage"
            :status="uploadProgress.status"
          ></el-progress>
        </el-upload>
      </div>
    </el-popover>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isUpload: false, //是否处于上传状态
      uploadProgress: {
        percentage: 0, //上传进度
        status: null
      },
      imageUrl: "",
      visible: false,
      token: {
        "HEADER-TOKEN": ""
      },
      cover: [
        require("@/assets/img/resImg/重要文件.jpg"),
        require("@/assets/img/resImg/普通文件.jpg")
      ]
    };
  },
  created() {
    this.getToken();
  },
  methods: {
    getToken: function() {
      //获取登录时存储在localStorage中的header-Token，作为上传凭证
      this.token["HEADER-TOKEN"] = localStorage.getItem("HEADER_TOKEN");
    },
    imgToFile(img) {
      //img->通过canvas生成dataURL，生成base64，再转换成blob，最后生成file
      let canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      let ct = canvas.getContext("2d");
      ct.drawImage(img, 0, 0, img.width, img.height);
      let ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
      let dataURL = canvas.toDataURL("image/" + ext); //使用canvas将img转换为dataURL
      let base64 = {
        dataURL: dataURL,
        type: "image/" + ext
      }; //生成base64对象
      let bytes = window.atob(dataURL.split(",")[1]); //通过atob生成bytes
      let ab = new ArrayBuffer(bytes.length); //生成二进制数据缓冲区
      let ia = new Uint8Array(ab); //8位无符号整型数组
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      let blob = new Blob([ab], { type: base64.type }); //生成blob对象
      return new File([blob], `cover.${ext}`, { type: base64.type }); //生成文件对象
    },
    uploadCover(index) {
      //点击可选封面时，上传封面，并展示
      let img = new Image();
      img.src = this.cover[index];
      let file;
      let _this = this;
      img.onload = function() {
        file = _this.imgToFile(img); //将本地图片转换为file文件
        let f = new FormData();
        f.append("file", file);
        _this.$axios.post("news/picturesUpload", f).then(res => {
          console.log(res.data.link);
          _this.imageUrl = res.data.link;
          _this.$emit("setLogo", _this.imageUrl);
        });
      };
    },
    beforeAvatarUpload(file) {
      //上传封面前判断是否为jpeg或png格式，判断大小是否小于6MB
      this.isUpload = false;
      this.uploadProgress.percentage=0;
      this.imageUrl=0;
      this.uploadProgress.status=null;
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 6;
      if (!isJPG && !isPNG) {
        this.$message.error("上传的封面图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传的封面图片大小不能超过 6MB!");
      }
      console.log(file);

      console.log(isJPG + " " + isPNG + " " + isLt2M);
      return (isJPG || isPNG) && isLt2M;
    },
    handleProgress(event, file, fileList) {
      this.isUpload = true;
      //文件上传时调用（会随着文件上传一直被调用）
      this.uploadProgress.percentage = Math.floor(
        (event.loaded / event.total) * 100
      );
    },
    handleAvatarSuccess(res, file) {
      //当上传成功时，将上传的图片预览展示
      console.log(res);
      this.uploadProgress.status = "success";
      this.imageUrl = res.link;
      this.$emit("setLogo", this.imageUrl);
      
    },
    handleError(res) {
       this.uploadProgress.status = "exception";
      this.$message.error(`上传失败！${res.message}`); //上传失败时，发出提示。
     
    }
  },
  directives: {
    autoClick: {
      inserted(el) {
        el.click();
      }
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
/*
  设置可选封面样式
*/
.choosable-img {
  width: 100px;
  height: 100px;
  margin: 10px;
  border-radius: 5px;
}
/*
  设置可选封面标题样式
*/
.el-popover__title {
  color: #888888;
  font-size: 14px;
}
</style>