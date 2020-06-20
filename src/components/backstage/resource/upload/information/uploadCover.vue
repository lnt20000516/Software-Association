<template>
     <div class="upload-information_cover">
      <el-popover placement="right" title="可选封面" trigger="manual" v-model="visible">
        <div>
          <ul style="list-style:none;">
            <li v-for="(item,index) in cover" :key="index" style="float:left;">
              <img :src="item" alt class="choosable-img" @click="uploadCover(index)" />
            </li>
          </ul>
        </div>
        <div style="float:left;" slot="reference" @click="visible=true" v-autoClick>
          <el-upload
            class="avatar-uploader"
            action="http://upload-z2.qiniup.com"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-error="handleError"
            :before-upload="beforeAvatarUpload"
            :data="qiniuData"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-popover>
    </div>
</template>
<script>
export default {
  data() {
    return {
      imageUrl: "",
      visible: false,
      qiniuData: {
        key: "",
        token: ""
      },
      cover: [
        require("@/assets/img/resImg/重要文件.jpg"),
        require("@/assets/img/resImg/普通文件.jpg")
      ]
    };
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
    imgToFile(img) {//img->通过canvas生成dataURL，生成base64，再转换成blob，最后生成file
      let canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      let ct = canvas.getContext("2d");
      ct.drawImage(img, 0, 0, img.width, img.height);
      let ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
      let dataURL = canvas.toDataURL("image/" + ext);//使用canvas将img转换为dataURL
      let base64 = {
        dataURL: dataURL,
        type: "image/" + ext
      };//生成base64对象
      let bytes = window.atob(dataURL.split(",")[1]);//通过atob生成bytes
      let ab = new ArrayBuffer(bytes.length);//生成二进制数据缓冲区
      let ia = new Uint8Array(ab);//8位无符号整型数组
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      let blob = new Blob([ab], { type: base64.type });//生成blob对象
      return new File([blob], `cover.${ext}`, { type: base64.type });//生成文件对象
    },
    uploadCover(index) {
      let img = new Image();
      img.src = this.cover[index];
      let file;
      let _this = this;
      img.onload = function() {
        file = _this.imgToFile(img);
        let f = new FormData();
        f.append("key", _this.qiniuData.key);
        f.append("token", _this.qiniuData.token);
        f.append("file", file);
        _this.$axios.post("http://upload-z2.qiniup.com", f).then(res => {
          _this.setImg();
        });
      };
    },
    beforeAvatarUpload(file) {
      console.log(file.type === "image/jpeg");
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 6;
      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 6MB!");
      }
      return isJPG && isLt2M;
    },
    async setImg() {
      try {
        let res = await this.$axios.get(
          `/resources/download/${this.qiniuData.key}`
        );
        if (res.status === 200) {
          this.imageUrl = res.data.data;
          this.$emit('setLogo',this.imageUrl)
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
    handleAvatarSuccess() {
      this.setImg();
    },
    handleError() {
      this.$message.error("上传失败！");
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
.choosable-img {
  width: 100px;
  height: 100px;
  margin: 10px;
  border-radius: 5px;
}

.el-popover__title {
  color: #888888;
  font-size: 14px;
}
</style>