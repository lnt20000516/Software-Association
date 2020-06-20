<template>
  <div class="menu-role">
    <div style="margin:23px 0;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="width:150px">
        <el-breadcrumb-item style="font-size:18px;">角色权限</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="24">
      <el-col :span="24" style="padding:0">
        <role-manage ref="roleManage" @setAllRole="setAllRole"></role-manage>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" style="padding:0">
        <role-allocation ref="roleAllocation" @setAllRole="setAllRole"></role-allocation>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import roleManage from "@/components/backstage/menu/role/manage.vue";
import roleAllocation from "@/components/backstage/menu/role/allocation.vue";
export default {
  name: "role",
  data() {
    return {
      allRole: [],
      allRoleJur: []
    };
  },
  created() {
    this.setAllRole();
    this.setAllRoleJur();
  },
  methods: {
    async setAllRole() {
      try {
        let res = await this.$axios.get("sys/role/page", {
          params: {
            limit: 1000
          }
        });
        if (res.status === 200) {
          if (res.data.code === 200) {
          this.allRole = res.data.data.records;
          this.$refs.roleManage.allRole = this.allRole;
          this.$refs.roleAllocation.allRole = this.allRole;
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
    async setAllRoleJur() {
      try {
      } catch (err) {
        this.$message.error({
          message: err
        });
      }
    }
  },
  components: {
    roleManage,
    roleAllocation
  }
};
</script>
<style>
</style>