<template>
  <div class="Menu within">
    <div style="margin:23px;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="width:150px">
        <el-breadcrumb-item style="font-size:18px;">导航栏管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table
      :data="allMenu"
      style="width: 100%"
      row-key="menuId"
      lazy
      :load="load"
      :tree-props="{children: 'childList', hasChildren: 'hasChildren'}"
      ref="menuTable"
    >
      <el-table-column width="50"></el-table-column>
      <el-table-column label="#" width="50">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <svg
              t="1590291279068"
              class="icon"
              @click="deleteMenu(scope.$index, scope.row)"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4606"
              width="18"
              height="18"
            >
              <path d="M672 480v64h-320v-64z" p-id="4607" fill="#d81e06" />
              <path
                d="M512 128a384 384 0 1 1-384 384 384 384 0 0 1 384-384m0-64a448 448 0 1 0 448 448 448 448 0 0 0-448-448z"
                p-id="4608"
                fill="#d81e06"
              />
            </svg>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="菜单名称"></el-table-column>
      <el-table-column prop="menuId" label="菜单ID"></el-table-column>
      <el-table-column prop="url" label="菜单路由"></el-table-column>
      <el-table-column label="菜单图标">
        <template slot-scope="scope">
          <p v-html="scope.row.icon"></p>
        </template>
      </el-table-column>
      <el-table-column label="是否可用">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" disabled></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="openUpdateMenu(scope.$index, scope.row)">修改</el-button>
          <el-button
            size="mini"
            @click="openAddSubmenu(scope.row)"
            v-if="scope.row.parentId===0"
          >添加子菜单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div
      style="text-align:left;margin:20px 0;display: flex;align-items: center;width:150px"
      @click="isAddMenu = true"
    >
      <svg
        t="1590303308927"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="13268"
        width="25"
        height="25"
      >
        <path
          d="M512 0c282.752 0 512 229.248 512 512s-229.248 512-512 512S0 794.752 0 512 229.248 0 512 0z m0 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667S747.648 85.333333 512 85.333333z m-0.042667 170.666667a42.666667 42.666667 0 0 1 42.666667 42.666667v170.666666h170.666667a42.666667 42.666667 0 0 1 0 85.333334h-170.666667v170.666666a42.666667 42.666667 0 0 1-85.333333 0v-170.666666h-170.666667a42.666667 42.666667 0 0 1 0-85.333334h170.666667V298.666667a42.666667 42.666667 0 0 1 42.666666-42.666667z"
          fill="#008df0"
          p-id="13269"
        />
      </svg>
      <span style="color:#008df0;font-size:18px;padding:0 8px;">添加菜单</span>
    </div>
    <el-dialog title="添加菜单" :visible.sync="isAddMenu" width="450px" @close="cancel()">
      <el-form :model="menu">
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="menu.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单路由" :label-width="formLabelWidth">
          <el-input v-model="menu.url" autocomplete="off" placeholder="路由地址不包括/Backstage"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="menu.icon"
            autocomplete="off"
            maxlength="3000"
            show-word-limit
            resize="none"
            rows="8"
            placeholder="贴入表示图标的代码(建议宽高18px)"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否可用" :label-width="formLabelWidth" style="width:150px">
          <el-switch v-model="menu.status"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="addMenu(0,0)">添 加</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加子菜单" :visible.sync="isAddSubmenu" width="450px" @close="cancel()">
      <el-form :model="menu" status-icon>
        <el-form-item label="父级菜单" :label-width="formLabelWidth">
          <el-input v-model="menu.parentName" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="menu.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单路由" :label-width="formLabelWidth">
          <el-input v-model="menu.url" autocomplete="off" placeholder="路由地址不包括/Backstage"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="menu.icon"
            maxlength="3000"
            show-word-limit
            autocomplete="off"
            resize="none"
            rows="8"
            placeholder="贴入表示图标的代码(建议宽高18px)"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否可用" :label-width="formLabelWidth" style="width:150px">
          <el-switch v-model="menu.status"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="addMenu(menu.parentId,1)">添 加</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改菜单" :visible.sync="isUpdateMenu" width="450px" @close="cancel()">
      <el-form :model="menu" status-icon>
        <el-form-item label="父级菜单" :label-width="formLabelWidth" v-if="menu.parentId">
          <el-select v-model="menu.parentId" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in allMenu"
              :key="item.menuId"
              :label="item.name"
              :value="item.menuId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="menu.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单路由" :label-width="formLabelWidth">
          <el-input v-model="menu.url" autocomplete="off" placeholder="路由地址不包括/Backstage"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="menu.icon"
            autocomplete="off"
            maxlength="3000"
            show-word-limit
            resize="none"
            rows="8"
            placeholder="贴入表示图标的代码(建议宽高18px)"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否可用" :label-width="formLabelWidth" style="width:150px">
          <el-switch v-model="menu.status"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="updateMenu()">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allMenu: [],
      isAddMenu: false,
      isAddSubmenu: false,
      isUpdateMenu: false,
      menu: {},
      formLabelWidth: "80px"
    };
  },
  created() {
    this.setAllMenu();
  },
  methods: {
    setAllMenu() {
      this.$axios("sys/menu/nav", {
        method: "get",
        params: {
          currPage: 1,
          limit: 10
        }
      }).then(res => {
        this.allMenu = {};
        this.allMenu = res.data.data;
        this.allMenu.forEach(item => {
          if (item.childList) {
            item.hasChildren = true;
          }
        });
        console.log(this.allMenu);
      });
    },
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve(tree.childList);
      }, 300);
    },
    openAddSubmenu(row) {
      this.isAddSubmenu = true;
      this.menu.parentName = row.name;
      this.menu.parentId = row.menuId;
    },
    addMenu(parentId, type) {
      let orderNum = this.allMenu.length;
      if (parentId != 0) {
        this.allMenu.forEach(item => {
          console.log(item);
          if (item.menuId === parentId) {
            orderNum = item.childList.length;
          }
        });
      }
      let menu = {
        icon: this.menu.icon,
        name: this.menu.name,
        orderNum: orderNum,
        parentId: parentId,
        perms: "",
        status: this.menu.status,
        type: type,
        url: this.menu.url
      };
      this.$axios("sys/menu/", {
        method: "post",
        data: menu
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.isAddMenu = false;
          this.isAddSubmenu = false;
          this.$message.success({
            message: "添加成功"
          });
          this.menu = {};
          window.location.reload();
        } else {
          this.$message.error({
            message: res.data.message
          });
        }
      });
    },
    openUpdateMenu(index, row) {
      this.isUpdateMenu = true;
      this.menu = row;
      console.log(index, row);
    },
    updateMenu() {
      let menu = {
        icon: this.menu.icon,
        name: this.menu.name,
        orderNum: this.allMenu.length,
        parentId: this.menu.parentId,
        perms: "",
        status: this.menu.status,
        type: this.menu.type,
        url: this.menu.url
      };
      console.log(this.menu);
      this.$axios("sys/menu/" + this.menu.menuId, {
        method: "put",
        data: menu
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success({
            message: "修改成功"
          });
          this.isUpdateMenu = false;
          this.menu = {};
          window.location.reload();
        } else {
          this.$message.error({
            message: res.data.message
          });
        }
      });
    },
    deleteMenu(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除该导航栏, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$axios("sys/menu/" + row.menuId, {
          method: "delete"
        }).then(res => {
          if (res.data.code === 200) {
            this.$message.success({
              message: "删除成功!"
            });
            window.location.reload();
          } else {
            this.$message.error({
              message: res.data.message
            });
          }
        });
      });
    },
    cancel() {
      this.isAddMenu = false;
      this.isAddSubmenu = false;
      this.isUpdateMenu = false;
      this.menu = {};
    }
  }
};
</script>
<style scoped>
.el-dialog {
  z-index: 99999 !important;
}
</style>