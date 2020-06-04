<template>
  <div class="main">
    <div style="margin:23px">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="width:150px">
        <el-breadcrumb-item style="font-size:18px;">书刊目录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="category">
      <el-dialog
        title="新增顶级分类"
        width="30%"
        class="add-event-dialog"
        :visible.sync="addTopVisible"
        size="tiny"
      >
        <el-form ref="addTopForm" :model="addTopForm">
          <el-form-item label="分类名称" prop="bookCategoryName">
            <el-input v-model="addTopForm.bookCategoryName"></el-input>
          </el-form-item>
          <el-form-item label="分类号" prop="id">
            <el-input v-model="addTopForm.id"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="addTopForm.remark"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addTopFormCancleBtn('addTopForm')">取 消</el-button>
          <el-button type="primary" @click="addTopFormSubmitBtn('addTopForm')">确 定</el-button>
        </span>
      </el-dialog>
      <el-tree
        ref="eventCategoryTree"
        :data="eventCategoryTree"
        :props="defaultProps"
        node-key="id"
        :load="loadNode"
        lazy
        highlight-current
        :render-content="renderContent"
        :expand-on-click-node="true"
      ></el-tree>
      <div
        style="text-align:left;margin:20px 0;display: flex;align-items: center;width:150px"
        @click="addTopNode()"
      >
        <svg
          t="1590303308927"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="13268"
          width="18"
          height="18"
        >
          <path
            d="M512 0c282.752 0 512 229.248 512 512s-229.248 512-512 512S0 794.752 0 512 229.248 0 512 0z m0 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667S747.648 85.333333 512 85.333333z m-0.042667 170.666667a42.666667 42.666667 0 0 1 42.666667 42.666667v170.666666h170.666667a42.666667 42.666667 0 0 1 0 85.333334h-170.666667v170.666666a42.666667 42.666667 0 0 1-85.333333 0v-170.666666h-170.666667a42.666667 42.666667 0 0 1 0-85.333334h170.666667V298.666667a42.666667 42.666667 0 0 1 42.666666-42.666667z"
            fill="#008df0"
            p-id="13269"
          />
        </svg>
        <span style="color:#008df0;font-size:15px;padding:0 8px;">添加顶级分类</span>
      </div>
      <el-dialog
        title="新增书籍分类"
        width="30%"
        class="add-event-dialog"
        :visible.sync="addEventdialogVisible"
        size="tiny"
      >
        <el-form ref="addEventForm" :model="addEventForm">
          <el-form-item label="分类名称" prop="bookCategoryName">
            <el-input v-model="addEventForm.bookCategoryName"></el-input>
          </el-form-item>
          <el-form-item label="分类号" prop="id">
            <el-input v-model="addEventForm.id"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="addEventForm.remark"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addEventFormCancleBtn('addEventForm')">取 消</el-button>
          <el-button type="primary" @click="addEventFormSubmitBtn('addEventForm')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import TreeRender from "../../../components/backstage/book/tree_render";
export default {
  data() {
    return {
      //树组件的数据
      eventCategoryTree: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      /*触发的当前的节点，放到全局，方便调用*/
      triggerCurrenNodeData: {},
      /*触发的当前节点*/
      triggerCurrenNode: {},
      /*新增事件弹窗的输入框数据*/
      addEventdialogVisible: false,
      addEventForm: {
        bookCategoryName: "",
        id: "",
        remark: ""
      },
      // 添加顶级节点弹窗
      addTopVisible: false,
      addTopForm: {
        bookCategoryName: "",
        id: "",
        remark: ""
      }
    };
  },
  methods: {
    /*渲染函数*/
    renderContent(h, { node, data, store }) {
      let that = this; //指向vue
      return h(TreeRender, {
        props: {
          NODE: node,
          DATA: data,
          STORE: store
        },
        on: {
          //新增
          Append: (s, d, n) => that.appendEvent(s, d, n),
          //删除节点
          Delete: (s, d, n) => that.removeEvent(s, d, n)
        }
      });
    },
    /*树形控件添加节点，添加弹窗出现*/
    appendEvent(s, d, n) {
      this.addEventdialogVisible = true;
      this.triggerCurrenNodeData = d;
      this.triggerCurrenNode = n;
      console.log(d.id);
    },
    /*树形控件删除节点*/
    removeEvent(s, d, n) {
      const parent = n.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(data => data.id === d.id);
      this.$confirm("确定要删除该节点吗？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { data: res } = await this.$http.delete(
            "book/category/" + d.id
          );
          if (res.code != 200) {
            this.$message.error("删除失败");
          } else {
            children.splice(index, 1);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    /*节点新增，提交按钮*/
    addEventFormSubmitBtn(formname) {
      this.$refs[formname].validate(async valid => {
        if (valid) {
          /*获取当前input上输入的文字*/
          let dataPost = {
            bookCategoryName: this.addEventForm.bookCategoryName,
            categoryID: this.triggerCurrenNodeData.id,
            id: this.addEventForm.id,
            remark: this.addEventForm.remark
          };
          const { data: res } = await this.$http.post(
            "book/category/",
            dataPost
          );
          if (res.code != 200) {
            console.log("请求失败");
          } else {
            let result = {
              id: this.addEventForm.id,
              bookCategoryName: this.addEventForm.bookCategoryName,
              categoryID: this.triggerCurrenNodeData.id
            };

            if (!this.triggerCurrenNodeData.children) {
              this.$set(this.triggerCurrenNodeData, "children", []);
            }
            //如果已有子节点，就把返回的数据push进去，插入到树形数据中
            this.triggerCurrenNodeData.children.push(result);
            /*关闭弹窗，重置输入框*/
            this.addEventdialogVisible = false;
            this.$refs[formname].resetFields();
            this.$message.success("添加书籍类型成功");
          }
        } else {
          console.log("验证未通过");
          return false;
        }
      });
    },
    /*取消节点新增 */
    addEventFormCancleBtn(formname) {
      this.addEventdialogVisible = false;
      this.$refs[formname].resetFields();
    },
    /*新增顶级节点 添加弹窗出现 */
    addTopNode() {
      this.addTopVisible = true;
    },
    /*顶级节点新增，提交按钮 */
    addTopFormSubmitBtn(formname) {
      this.$refs[formname].validate(async valid => {
        if (valid) {
          let dataPost = {
            bookCategoryName: this.addTopForm.bookCategoryName,
            categoryID: null,
            id: this.addTopForm.id,
            remark: this.addTopForm.remark
          };
          const { data: res } = await this.$http.post(
            "book/category/",
            dataPost
          );
          if (res.code != 200) {
            console.log("请求失败");
          } else {
            this.eventCategoryTree.push(dataPost);
            this.addTopVisible = false;
            this.$refs[formname].resetFields();
            this.$message.success("添加书籍类型成功");
          }
        } else {
          console.log("验证未通过");
          return false;
        }
      });
    },
    /*取消顶级节点新增 */
    addTopFormCancleBtn(formname) {
      this.addTopVisible = false;
      this.$refs[formname].resetFields();
    },
    /*初始化树 */
    async initTree() {
      const { data: res } = await this.$http.get("book/categorise", {
        params: {}
      });
      if (res.code != 200) {
        this.$message.error("获取书籍类型失败");
      } else {
        this.eventCategoryTree = res.data;
      }
    },
    /*懒加载子节点 */
    async loadNode(d, reslove) {
      if (d.level == 0) {
        this.initTree();
      } else {
        let id = d.data.id;
        const { data: res } = await this.$http.get("book/categorise", {
          params: { categoryId: id }
        });
        if (res.code != 200) {
          this.$message.error("点击获取书籍类型失败");
        } else {
          reslove(res.data);
        }
      }
    }
  }
};
</script>
<style scoped>
.main {
  padding: 40px 80px;
  text-align: left !important;
}
.category {
  margin-top: 2%;
  margin-left: 2%;
}
.el-tree {
  margin-top: 2%;
  width: 50%;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>