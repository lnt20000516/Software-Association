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
            :isMedium="isMedium"
            :isSmall="isSmall"
            :maxH="maxH"
            :maxW="maxW"
          ></upload-frame>
          <upload-information v-if="isUploadScs" :resName="resourceName"></upload-information>
        </el-tab-pane>
        <el-tab-pane label="所有资源" name="second"></el-tab-pane>
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
      maxH: 0,
      maxW: 0,
      isMedium: false,
      isSmall: false
    };
  },
  mounted() {
    this.maxH = this.$parent.$data.maxH;
    this.maxW = this.$parent.$data.maxW;
    this.init();
  },
  watch: {
    "$parent.$data.maxH": function(newVal) {
      this.maxH = newVal;
    },
    "$parent.$data.maxW": function(newVal) {
      this.maxW = newVal;
      this.init();
    }
  },
  methods: {
    init() {
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
    handleClick(tab, event) {
      console.log(tab, event);
    },
    setResName(val) {
      console.log(val);
      this.resourceName = val;
    }
  },
  components: {
    uploadFrame,
    uploadInformation
  }
};
</script>