<template>
  <div class="role within">
    <div style="margin:23px;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="width:150px">
        <el-breadcrumb-item style="font-size:18px;">角色权限</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row :gutter="24">
        <el-col :span="24" style="padding:0">
          <roleManage ref="roleManage"  @setAllRole="setAllRole"></roleManage>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="24" style="padding:0">
         <roleAllocation ref="roleAllocation"></roleAllocation>
        </el-col>
      </el-row>
    </div>
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
      allRoleJur: [],
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
          this.allRole = res.data.records;
          this.$refs.roleManage.allRole = this.allRole;
          this.$refs.roleAllocation.allRole = this.allRole;
          console.log(this.allRole);
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
    },
    aa(){
      alert(11);
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