<template>
  <div class="aside">
    <div class="logo-box" v-if="isShowLogo">
      <img src="../../assets/img/logo.png" class="logo" />
      <h2 v-if="!isOpenAL" class="logo-title">软件协会</h2>
    </div>
    <el-menu
      :default-active="index"
      background-color="white"
      text-color="#222222"
      active-text-color="rgb(63,171,235)"
      router
      :collapse="isOpenAL"
      style="overflow: auto;"
      :style="{'height':maxH-200+'px'}"
      ref="menu"
      unique-opened="true"
    >
      <el-submenu
        v-for="item in sort"
        :key="item.menuId"
        :index="'/Backstage/'+item.url"
        :style="{'text-align':align}"
      >
        <template slot="title">
          <i v-html="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item
          v-for="children in item.menuNodeList"
          :key="children.menuId"
          :index="'/backstage/'+children.url"
        >
          <span v-html="children.icon" style="position:relative;top:-3px;margin:0 2px;"></span>&nbsp;
          <span>{{children.name}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      sort: [],
      accountName: "",
      index: "",
      isCollapse: true
    };
  },
  props: {
    isOpenAL: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: "left"
    },
    isShowLogo: {
      type: Boolean,
      default: true
    },
    maxH:{
      type: Number,
      default: 500
    }
  },
  created() {
    this.setIndex();
    this.allSort();
  },
  methods: {
    setMenuText() {
      console.log(this.isOpenAL);
      if (this.isOpenAL) {
        this.align = "center";
      } else {
        this.align = "left";
      }
    },
    async allSort() {
      try {
        let res = await this.$axios.get("sys/menu/nav");
        if (res.status === 200) {
          this.sort = res.data.data;
        } else {
          this.$message.error({
            message: "请求错误"
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    setIndex() {
      this.index = this.$route.fullPath;
    }
  },
  watch: {
    "$route.fullPath": function() {
      this.setIndex();
    }
  }
};
</script>

<style scoped>
.logo-box {
  padding: 10px;
  display: flex;
  align-items: center;
}
.menu-right {
  float: right;
}
.el-menu {
  font-weight: 500;
  text-align: left;
  border: none;
}
.el-menu-item {
  padding: auto 20px;
}
.el-menu-item:hover,
.el-submenu:hover {
  background-color: rgb(227, 239, 248) !important;
}
p {
  margin: 0;
}
</style>
<style>
.el-menu-item:focus svg path,
.el-menu-item:hover svg path {
  fill: rgb(64, 171, 234);
}
.el-menu-item:focus p span,
.el-menu-item:hover p span {
  color: rgb(64, 171, 234);
}
.el-submenu__title {
  padding: 0 10px !important;
}
</style>
