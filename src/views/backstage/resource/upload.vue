<template>
  <div class="upload">
    <div style="margin:23px 0;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="width:150px">
        <el-breadcrumb-item style="font-size:18px;">资源上传</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="资源上传" name="first" class="upload-content">
          <upload-frame
            @uploadScs="isUploadScs=true"
            @setResName="setResName"
            @setType="setType"
            :isMedium="isMedium"
            :isSmall="isSmall"
            :maxH="maxH"
            :maxW="maxW"
            ref="frame"
          ></upload-frame>
          <upload-information
            v-if="isUploadScs&&activeName==='first'"
            :resName="resourceName"
            :serverType="serverType"
            @init="dataInit"
          ></upload-information>
        </el-tab-pane>
        <el-tab-pane label="所有资源" name="second">
        <all-res>
        </all-res>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import uploadFrame from "@/components/backstage/resource/upload/frame.vue";
import uploadInformation from "@/components/backstage/resource/upload/information.vue";
export default {
  data() {
    return {
      activeName: "first",
      isUploadScs: false,
      resourceName: "",
      serverType: "2",
      maxH: 0,
      maxW: 0,
      isMedium: false,
      isSmall: false
    };
  },
  mounted() {
    this.pageSizeInit();
  },
  watch: {
    "$parent.$data.maxH": function(newVal) {
      this.maxH = newVal;
    },
    "$parent.$data.maxW": function(newVal) {
      this.maxW = newVal;
      this.pageSizeInit();
    }
  },
  methods: {
    pageSizeInit() {
      this.maxH = this.$parent.$data.maxH;
      this.maxW = this.$parent.$data.maxW;
      if (this.maxW < 800) {
        this.isMedium = false;
        this.isSmall = true;
      } else if (this.maxW < 1000) {
        this.isMedium = true;
        this.isSmall = false;
      } else {
        this.isMedium = false;
        this.isSmall = false;
      }
    },
    dataInit() {
      console.log(1);
      console.log(this.$data);
      console.log(this.$options.data());
      Object.assign(this.$data, this.$options.data())
      this.pageSizeInit();
      this.$refs.frame.dataInit();
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    setResName(val) {
      console.log(val);
      this.resourceName = val;
    },
    setType(val) {
      this.serverType = val;
    }
  },
  components: {
    uploadFrame,
    uploadInformation
  }
};
</script>