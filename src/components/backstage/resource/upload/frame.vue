<template>
  <div class="frame">
    <div v-if="!uploadProgress.isUpload">
      <p style="margin:20px 0;text-align:left;">
        <span>选择存放位置：</span>
        <el-radio v-model="serverType" label="2">七牛云</el-radio>
        <el-radio v-model="serverType" label="1">本地服务器</el-radio>
      </p>
      <!--上传资源入口-->
      <el-upload
        class="upload-demo"
        drag
        :action="serverLink[serverType]"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :on-error="handleError"
        :on-progress="handleProgress"
        :before-upload="beforeAvatarUpload"
        :data="data[serverType]"
        :headers="headers"
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

    <!--上传时进度条-->
    <div v-else style="text-align:left;">
      <el-row style="display:flex;align-items:flex-end;">
        <el-col :span="3">
          <svg
            t="1593414460738"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="18674"
            width="50"
            height="50"
          >
            <path
              d="M983.746692 341.299873H341.299873v642.446819h481.835114V843.21145a20.076463 20.076463 0 0 1 20.076463-20.076463h140.535242z m-255.974905-40.152927l-70.267621-260.99402L40.152926 205.582982 205.582982 823.134987 301.146946 797.738261V341.299873a40.152926 40.152926 0 0 1 40.152927-40.152927zM983.746692 863.287913H863.287913v120.458779a120.96069 120.96069 0 0 0 24.29252-2.409176c47.079306-10.038232 85.927262-58.623272 95.563965-105.702578A31.419665 31.419665 0 0 0 983.746692 863.287913z"
              fill="#FFFFFF"
              p-id="18675"
            />
            <path
              d="M863.287913 983.746692a120.458779 120.458779 0 0 0 120.458779-120.458779H863.287913zM341.299873 341.299873v642.446819h481.835114V843.21145a20.076463 20.076463 0 0 1 20.076463-20.076463h140.535242V341.299873z"
              fill="#F7D54A"
              p-id="18676"
            />
            <path
              d="M903.440839 923.517302h20.076463v-20.076463h-20.076463z m40.152926-20.076463v-20.076463h-20.076463v20.076463z m-80.305852-40.152926v20.076463h20.076463v-20.076463z m0 80.305852v20.076463h20.076463v-20.076463z m113.432016-40.152926a119.454955 119.454955 0 0 0 5.219881-20.076463H963.670228v20.076463zM963.670228 863.287913h-20.076463v20.076463h20.076463z m-20.076463 40.152926v20.076463h20.076463v-20.076463z m-20.076463-40.152926h-20.076463v20.076463h20.076463z m-60.229389 40.152926v20.076463h20.076463v-20.076463z m66.553475 60.229389H923.517302v3.814528c2.208411-1.204588 4.31644-2.409176 6.324086-3.814528zM903.440839 923.517302h-20.076463v20.076463h20.076463z m64.043917 0H963.670228v6.324086c1.405352-2.007646 2.60994-4.115675 3.914911-6.324086z m-14.655818 20.076463H943.593765v9.335556a121.061072 121.061072 0 0 0 9.335556-9.335556zM903.440839 883.364376h-20.076463v20.076463h20.076463z m20.076463 60.229389h20.076463v-20.076463h-20.076463z m-20.076463 20.076463h20.076463v-20.076463h-20.076463z m-20.076463 18.269582a119.354573 119.354573 0 0 0 20.076463-5.219881V963.670228h-20.076463zM240.917557 662.523282v20.076463h20.076463v-20.076463z m0 80.305852v20.076463h20.076463v-20.076463z m0-160.611704v20.076463h20.076463v-20.076463z m20.076463 200.764631h20.076463v-20.076464h-20.076463z m0-120.458779h20.076463v-20.076463h-20.076463z m0 40.152926h20.076463v-20.076463h-20.076463z m-20.076463-80.305852v20.076463h20.076463v-20.076463z m20.076463 120.458778h20.076463v-20.076463h-20.076463z m0-120.458778h20.076463v-20.076463h-20.076463z m-20.076463 80.305852v20.076463h20.076463v-20.076463z m60.229389-20.076463v-20.076463h-20.076463v20.076463z m80.305853-381.452799h20.076463v-20.076463h-20.076463z m80.305852 0h20.076463v-20.076463h-20.076463z m-40.152926 0h20.076463v-20.076463h-20.076463zM240.917557 782.982061v20.076463h20.076463v-20.076463z m60.229389-381.452799v-20.076463h-20.076463v20.076463z m40.152927-100.382316h20.076463v-20.076463h-20.076463z m281.070483 0h20.076463v-20.076463h-20.076463z m40.152926 0h20.076463v-20.076463h-20.076463z m-80.305852 0h20.076463v-20.076463h-20.076463z m-80.305853 0h20.076463v-20.076463h-20.076463z m40.152926 0h20.076464v-20.076463h-20.076464z m-240.917557 60.22939v-20.076463h-20.076463v20.076463z m0 361.376335v-20.076463h-20.076463v20.076463z m-40.152926-140.535241h20.076463v-20.076463h-20.076463z m40.152926 180.688167v-20.076463h-20.076463v20.076463z m-40.152926 45.573572l20.076463-5.420645h-20.076463z m20.076463-5.420645l20.076463-5.320263V782.982061h-20.076463v20.076463z m20.076463-281.070484v-20.076463h-20.076463v20.076463z m0-80.305852v-20.076463h-20.076463v20.076463z m0 200.764631v-20.076463h-20.076463v20.076463z m0-160.611705v-20.076463h-20.076463v20.076463z m0 80.305853v-20.076464h-20.076463v20.076464z m0 40.152926v-20.076463h-20.076463v20.076463z m140.535242-341.299873v20.076463h20.076463v-20.076463z m270.028429-20.076463H702.676208v20.076463h14.354671zM481.835114 240.917557h-20.076463v20.076463h20.076463z m0 20.076463v20.076463h20.076463v-20.076463z m40.152926-20.076463h-20.076463v20.076463h20.076463z m-80.305852 0h-20.076463v20.076463h20.076463z m-40.152926 20.076463v20.076463h20.076463v-20.076463z m120.458778 0v20.076463h20.076463v-20.076463z m-160.611704-20.076463h-20.076463v20.076463h20.076463z m0 20.076463v20.076463h20.076463v-20.076463z m40.152926-20.076463h-20.076463v20.076463h20.076463z m200.764631 20.076463v20.076463h20.076463v-20.076463z m40.152926 0v20.076463h20.076463v-20.076463z m60.229389 20.076463v20.076463h20.076463v-20.076463zM240.917557 542.064503v20.076464h20.076463v-20.076464z m321.22341-301.146946h-20.076464v20.076463h20.076464z m120.458778 20.076463v20.076463h20.076463v-20.076463z m-40.152926-20.076463h-20.076463v20.076463h20.076463z m-80.305852 20.076463v20.076463h20.076463v-20.076463z m40.152926-20.076463h-20.076463v20.076463h20.076463z m-281.070484 20.076463v20.076463h20.076464v-20.076463z m361.376336-20.076463h-20.076463v20.076463h20.076463zM240.917557 421.605725v20.076463h20.076463v-20.076463z m20.076463 0h20.076463v-20.076463h-20.076463z m-20.076463-40.152926v20.076463h20.076463v-20.076463z m20.076463 80.305852h20.076463v-20.076463h-20.076463z m0 80.305852h20.076463v-20.076463h-20.076463z m0-160.611704h20.076463v-20.076463h-20.076463z m-20.076463 120.458778v20.076463h20.076463v-20.076463z m20.076463 0h20.076463v-20.076463h-20.076463z m-20.076463-40.152926v20.076463h20.076463v-20.076463z m40.152926-140.535242h20.076463v-20.076463h-20.076463z m40.152926-80.305852h-20.076463v20.076463h20.076463z m-20.076463 40.152926v-20.076463h-20.076463v20.076463z m-20.076463 0h-20.076463v20.076463h20.076463z m20.076463 20.076463h20.076463v-20.076463h-20.076463z m-20.076463-60.229389h-20.076463v20.076463h20.076463z m-40.152926 100.382316v20.076463h20.076463v-20.076463z m20.076463 0h20.076463v-20.076464h-20.076463z m-20.076463-40.152927v20.076463h20.076463v-20.076463z m0-40.152926v20.076463h20.076463v-20.076463z"
              opacity=".1"
              p-id="18677"
            />
            <path
              d="M521.98804 702.676208a100.382315 100.382315 0 1 0 100.382316 100.382316 100.382315 100.382315 0 0 0-100.382316-100.382316z m0 180.688168a80.305852 80.305852 0 1 1 80.305853-80.305852 80.305852 80.305852 0 0 1-80.305853 80.305852z m200.764631-461.758651H421.605725v20.076463h301.146946zM421.605725 562.140967h481.835114v-20.076464H421.605725z m0 60.229389h401.529262v-20.076463H421.605725z m0-140.535242v20.076463h481.835114v-20.076463z m321.223409 220.841094a40.152926 40.152926 0 1 0 40.152927 40.152926 40.152926 40.152926 0 0 0-40.152927-40.152926z m0 60.229389a20.076463 20.076463 0 1 1 20.076463-20.076463 20.076463 20.076463 0 0 1-20.076463 20.076463z"
              opacity=".15"
              p-id="18678"
            />
            <path
              d="M983.746692 301.146946H769.229683L696.452505 30.114695A40.152926 40.152926 0 0 0 647.465935 1.405352L30.114695 166.935791a40.152926 40.152926 0 0 0-28.709343 48.98657l165.530439 617.853151a40.152926 40.152926 0 0 0 48.98657 28.307813L301.146946 839.196157V983.746692a40.152926 40.152926 0 0 0 40.152927 40.152926h521.98804a160.611705 160.611705 0 0 0 160.611705-160.611705V341.299873a40.152926 40.152926 0 0 0-40.152926-40.152927z m-682.599746 40.152927v456.438388L205.582982 823.134987 40.152926 205.582982 657.805313 40.152926l70.267621 260.99402H341.299873a40.152926 40.152926 0 0 0-40.152927 40.152927z m521.988041 501.911577v140.535242H341.299873V341.299873h642.446819v481.835114H843.21145a20.076463 20.076463 0 0 0-20.076463 20.076463z m40.152926 140.535242V863.287913h120.458779a120.458779 120.458779 0 0 1-120.458779 120.458779z"
              opacity=".85"
              p-id="18679"
            />
          </svg>
        </el-col>
        <el-col :span="19">
          <p>
            <span v-text="data['2'].key"></span>
            <small
              class="progress_tip"
              v-text="toVisualFileSize(uploadProgress.loaded)+'/'+toVisualFileSize(uploadProgress.fsize)"
            ></small>
            <small
              class="progress_tip"
              v-if="uploadProgress.percentage!=100"
              v-text="toVisualFileSize(uploadProgress.nSpeed)"
            ></small>
            <small class="progress_tip" v-text="uploadProgress.tip"></small>
          </p>
          <el-progress :percentage="uploadProgress.percentage" :status="uploadProgress.status"></el-progress>
        </el-col>
         <!--
         <el-col :span="2">
          <el-link type="danger">删除</el-link>
        </el-col>
         -->
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      serverType: "2",
      //上传凭证
      data: {
        "1": {
          filekey: ""
        },
        "2": {
          key: "",
          token: ""
        }
      },
      //上传到本地服务器需要用到的headers
      headers: {},
      //上传的链接地址，本地和七牛云
      serverLink: {
        "1": "http://120.26.177.203/resources/upload/local",
        "2": "http://upload-z2.qiniup.com"
      },
      resUrl: "", //上传文件的获取路径
      //上传进度
      uploadProgress: {
        isUpload: false, //是否执行上传
        percentage: 0, //上传进度百分比
        loaded: 0, //已上传大小
        // byteloaded:0,//已上传字节
        nSpeed: 0, //上传网速
        status: null, //上传状态图标
        tip: "上传中", //上传文字提示
        fsize: ""
      }
    };
  },
  props: {
    //响应式属性
    isMedium: {
      //是否为中等大小宽度<1000
      type: Boolean,
      default: false
    },
    isSmall: {
      //是否为小型大小宽度<800
      type: Boolean,
      default: false
    },
    maxH: {
      //可视高度
      type: Number,
      default: 0
    },
    maxW: {
      //可视宽度
      type: Number,
      default: 0
    }
  },
  watch: {
    serverType(newVal) {
      this.$emit("setType", newVal);
      if (newVal === "1") {
        this.headers = {
          "HEADER-TOKEN": localStorage.getItem("HEADER_TOKEN")
        };
      } else {
        this.headers = {
        };
      }
    }
  },
  created() {
    //页面载入前获取七牛云上传凭证
    this.getQiniuToken();
  },
  methods: {
    dataInit(){
       Object.assign(this.$data, this.$options.data());
       this.getQiniuToken();
    },
    getQiniuToken() {
      //获取七牛云上传凭证
      let nowDate = new Date();
      let month = nowDate.getMonth() + 1;
      if (month < 10) month = "0" + month;
      //生成临时文件名
      let fileName = `${nowDate.getFullYear()}${month}${nowDate.getDate()}${nowDate.getHours()}${nowDate.getMinutes()}${nowDate.getSeconds()}`;
      this.data["1"].fileKey = fileName;
      this.data["2"].key = fileName;
      this.$emit("setResName", fileName); //传递临时文件名给父组件
      this.$axios
        .get("resources/token", {
          params: {
            fileKey: fileName
          }
        })
        .then(res => {
          this.data["2"].token = res.data.data;
        });
    },
    toVisualFileSize(fsize) {
      let size;
      let unit = 1024 * 1024 * 1024; //1GB
      let pos;
      if (fsize > unit) {
        size = fsize / unit;
        pos = "GB";
      } else {
        unit /= 1024; //1MB
        if (fsize > unit) {
          size = fsize / unit;
          pos = "MB";
        } else {
          unit /= 1024; //1KB
          if (fsize > unit) {
            size = fsize / unit;
            pos = "KB";
          } else {
            unit /= 1024; //1B
            size = fsize / unit;
            pos = "B";
          }
        }
      }
      return size.toFixed(2) + pos;
    },
    beforeAvatarUpload: function(file) {
      console.log(file);
      let fsize;
      let size = 1024 * 1024 * 1024 * 5; //1GB
      let pos;
      if (file.size < size) {
        this.uploadProgress.isUpload = true; //上传资源前，设置是否执行上传为true
        return true;
      } else {
        this.$message.warning("上传文件已达到最大限制,不可超过5GB");
        return false;
      }
    },
    handleProgress(event, file, fileList) {
      //文件上传时调用（会随着文件上传一直被调用）
      this.uploadProgress.fsize = event.total; //存储文件大小,用于展示
      this.uploadProgress.nSpeed = event.loaded - this.uploadProgress.loaded;
      this.uploadProgress.loaded = event.loaded; //计算已上传文件大小
      this.uploadProgress.percentage = Math.floor(
        (event.loaded / event.total) * 100
      );
    },
    handleAvatarSuccess: function(res, file) {
      // this.$axios
      //   .get(`/resources/download/${this.data['2'].key}`)
      //   .then(res => {
      this.uploadProgress.status = "success";
      this.uploadProgress.tip = "上传成功";
      this.$emit("uploadScs");
      // this.resUrl = res.data.data;
      console.log(res);
      // });
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
/*
给进度提示加样式
*/
.progress_tip {
  color: #999999;
  margin: auto 8px;
  font-size: 14px;
}
</style>