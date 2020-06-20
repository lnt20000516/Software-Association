<template>
  <div class="header">
    <el-menu
      :default-active="index"
      class="el-menu-demo"
      mode="horizontal"
      text-color="#999999"
      router
    >
      <el-menu-item>
        <div class="logo-box">
          <img src="../../assets/img/logo.png" alt class="logo" />
          <h4 class="logo-title">软件协会</h4>
        </div>
      </el-menu-item>
      <el-menu-item index="/homePage">首页</el-menu-item>
      <el-menu-item index="/joinIn">申请入会</el-menu-item>
      <el-menu-item index="/notice">协会公告</el-menu-item>
      <el-menu-item index="/dataDownload">资料下载</el-menu-item>
      <el-menu-item style="float:right;" v-if="loginShow">
        <el-button type="primary" @click="open()" plain round>登录</el-button>
        <login ref="login"></login>
      </el-menu-item>
      <el-menu-item style="float:right;" v-else>
        <account ref="account" :accountName="accountName" @isLogin="isLogin()"></account>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import login from "@/components/siae/header/login.vue";
import account from "@/components/siae/header/account.vue";
export default {
  name: "Header",
  data() {
    return {
      loginShow: true,
      accountName: "",
      index: ""
    };
  },
  created() {
    this.isLogin();
    this.index = this.$router.currentRoute.path;
  },
  watch: {
    "$route.fullPath": function(newVal, oldVal) {
      this.index = newVal;
    }
  },
  methods: {
    isLogin() {
      let activeUser = this.$cookies.get("activeUser");
      if (activeUser) {
        this.loginShow = false;
        this.accountName = activeUser.split("&")[1];
      } else {
        this.loginShow = true;
        this.$cookies.remove("activeUser");
      }
    },
    open() {
      this.$refs.login.dialog = true;
    }
  },
  components: {
    login,
    account
  }
};
</script>

<style scoped>
.header {
  min-width: 700px;
}
.logo-box {
 
}
.logo {
  height: 40px;
  margin: 10px 0;
}

.logo-title {
  color: white;
  display: inline;
  font-size: 18px;
  font-weight: 500;
}

.menu-right {
  float: right;
}
.el-menu,
.el-menu-item {
  background: none;
  color: white;
  border: none;
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
</style>
