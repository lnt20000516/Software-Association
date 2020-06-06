<template>
  <div class="Aside">
    <div style="padding:20px;display: flex;align-items: center;">
      <img src="../../assets/img/logo.png" alt class="logo" />
      <h2 class="logo-title">软件协会</h2>
    </div>
    <el-menu
      :default-active="index"
      class="el-menu-demo"
      background-color="white"
      text-color="#222222"
      active-text-color="rgb(63,171,235)"
      router
    >
      <el-submenu v-for="item in sort" :key="item.menuId" :index="'/Backstage/'+item.url">
        <template slot="title">
          <p style="display: flex;align-items: center;">
            <span v-html="item.icon" style="position:relative;top:-3px; margin:0 2px;"></span>&nbsp;
            <span>{{item.name}}</span>
          </p>
        </template>
        <el-menu-item
          v-for="children in item.menuNodeList"
          :key="children.menuId"
          :index="'/backstage/'+children.url"
        >
          <p style="display: flex;align-items: center;">
            <span v-html="children.icon" style="position:relative;top:-3px;margin:0 2px;"></span>&nbsp;
            <span>{{children.name}}</span>
          </p>
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
      index: ""
    };
  },
  created() {
    this.setIndex();
    this.allSort();
  },
  methods: {
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
        this.$message.error({
          message: err
        });
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
.logo {
  display: inline;
  height: 30px;
}

.logo-title {
  color: rgb(64, 171, 234);
  display: inline;
  font-weight: 400;
}

.menu-right {
  float: right;
}
.el-menu {
  font-weight: 500;
  text-align: left;
}
.el-menu-item {
  padding: auto 20px;
}
.el-menu-item:hover,
.el-submenu:hover {
  background-color: rgb(227, 239, 248) !important;
}
</style>
