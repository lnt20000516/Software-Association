<template>
  <div class="manage-admin">
    <div style="margin:23px 0;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="width:150px">
        <el-breadcrumb-item style="font-size:18px;">后台管理员</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allAdmin: [],
      allMember: []
    };
  },
  created() {
    this.setAllAdmin();
    this.setAllMember();
  },
  methods: {
    async setAllAdmin() {
      try {
        let res = await this.$axios.get("admin/page", {
          params: {
            limit: 100
          }
        });
        if (res.status === 200) {
          if (res.data.code === 200) {
            console.log(res.data.records);
            this.allAdmin = res.data.records;
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
        this.$message.error({
          message: err
        });
      }
    },
    async setAllMember() {
      try {
        let res = await this.$axios.get("member/search", {
          params: {
            id: new Date().getFullYear() - 1
          }
        });
        if (res.status === 200) {
          console.log(res.data.data.records);

          //   this.allMember=res
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
    }
  }
};
</script>