<template>
  <div class="allocation role-allocation">
    <el-divider content-position="left">权限分配</el-divider>
    <div class="powerTable" ref="powerTable">
      <el-table :data="allRole">
        <el-table-column type="expand">
          <template slot-scope="props">
            <p style="color: #909399;">可访问菜单</p>
            <el-tree
              :data="props.row.menuNodeList"
              :default-expand-all="true"
              :props="menuProps"
              empty-text="尚未分配权限"
            ></el-tree>
          </template>
        </el-table-column>
        <el-table-column label="ID" prop="roleId" width="50"></el-table-column>
        <el-table-column label="角色名称" prop="roleName" width="150"></el-table-column>
        <el-table-column label="创建者" prop="createName" width="150"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="描述" prop="remark"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-link
              style="display: flex;align-items: center;"
              :underline="false"
              type="primary"
              size="mini"
              @click="openDistribution(scope.$index, scope.row)"
            >
              <svg
                t="1591345426753"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="11145"
                width="20"
                height="20"
                style="position:relative;top:5px"
              >
                <path
                  d="M513 101.4c-228 0-413.5 185.5-413.5 413.5 0 23.8 2.6 48.1 6.5 70.8 0 0.1 0.2 0.1 0.3 0.2 1.6 5.8 6.7 10.1 13 10.1 7.6 0 13.8-6.2 13.8-13.8 0-0.5-0.2-0.9-0.3-1.3l0.2-0.1c-3.7-21.4-6-43.3-6-65.8 0.1-213.3 172.9-386 386-386s385.9 172.8 385.9 385.9S726.1 900.8 513 900.8c-142.4 0-266.5-77.4-333.4-192.2 0-0.1-0.1-0.1-0.1-0.2l-0.6-0.9c-2.3-4.3-6.7-7.4-12-7.4-7.6 0-13.8 6.2-13.8 13.8 0 3 1.2 5.6 2.8 7.8l-0.2 0.1C227.3 845.2 360.5 928.4 513 928.4c228 0 413.5-185.5 413.5-413.5S741 101.4 513 101.4z"
                  fill="#409EFF"
                  p-id="11146"
                />
                <path
                  d="M411 305.9l-81.7 83.3c-10.5 10.8-10.5 28 0.1 38.7l81.6 82.4 0.1-0.1c2.5 2.8 6.1 4.7 10.2 4.7 7.6 0 13.8-6.2 13.8-13.8 0-4-1.8-7.6-4.5-10.1l0.1-0.1-67.9-68.6H691c7.6 0 13.8-6.2 13.8-13.8s-6.2-13.8-13.8-13.8H362.4l68.2-69.6-0.1-0.1c2.7-2.5 4.5-6.1 4.5-10.1 0-7.6-6.2-13.8-13.8-13.8-4.1 0.1-7.7 1.9-10.2 4.8zM615 519.6l81.7 83.3c10.5 10.8 10.5 28-0.1 38.7L615 724l-0.1-0.1c-2.5 2.8-6.1 4.7-10.2 4.7-7.6 0-13.8-6.2-13.8-13.8 0-4 1.8-7.6 4.5-10.1l-0.1-0.1 67.9-68.6h-328c-7.6 0-13.8-6.2-13.8-13.8 0-7.6 6.2-13.8 13.8-13.8h328.4l-68.2-69.6 0.1-0.1c-2.7-2.5-4.5-6.1-4.5-10.1 0-7.6 6.2-13.8 13.8-13.8 4.1 0.1 7.7 2 10.2 4.8z"
                  fill="#409EFF"
                  p-id="11147"
                />
              </svg>
              <span>分配权限</span>
            </el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="提示"
      v-if="isOpenDistri"
      :visible.sync="isOpenDistri"
      width="30%"
      @opened="$refs.power.setCheckedKeys(power.checked)"
    >
      <el-form :model="power">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="power.roleName" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="分配权限" :label-width="formLabelWidth">
          <el-tree
            ref="power"
            :data="menuTree"
            show-checkbox
            node-key="menuId"
            :highlight-current="true"
            :props="menuProps"
          ></el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isOpenDistri = false">取 消</el-button>
        <el-button type="primary" @click="Distribution">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allRole: [],
      menuTree: [],
      menuProps: {
        children: "menuNodeList",
        label: "name"
      },
      isOpenDistri: false,
      power: {},
      form: {},
      formLabelWidth: "120px"
    };
  },
  created() {
    this.setMenuTree();
  },
  watch: {
    allRole: function(newVal) {
      setTimeout(() => {
        this.$refs.powerTable.style.opacity = 1;
      }, 500);
    }
  },
  methods: {
    async setMenuTree() {
      try {
        let res = await this.$axios.get("/sys/menu/tree/list");
        if (res.status === 200) {
          console.log(res);
          this.menuTree = res.data.data;
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
    getChecked(arr) {
      if (arr.menuNodeList && arr.menuNodeList.length != 0) {
        arr.menuNodeList.forEach(item => {
          console.log(this.power);
          this.power.checked.push(item.menuId);
          this.getChecked(item);
        });
      }
    },
    openDistribution(index, row) {
      this.isOpenDistri = true;
      this.power.roleId = row.roleId;
      this.power.roleName = row.roleName;
      this.power.checked = [];
      this.getChecked(row);
    },
    async Distribution() {
      let checked = this.$refs.power.getCheckedKeys();
      try {
        let res = await this.$axios.put(
          `/sys/role/${this.power.roleId}/menu`,
          checked
        );
        if (res.status === 200) {
          if (res.data.code === 200) {
            this.$message.success({
              message: "分配成功"
            });
            this.isOpenDistri = false;
            this.$emit("setAllRole");
            this.power = {};
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
    }
  }
};
</script>
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.powerTable {
  transition: all 1s;
  opacity: 0;
}
</style>