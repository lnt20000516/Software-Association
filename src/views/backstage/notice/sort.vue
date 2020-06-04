<template>
  <div class="sort within">
    <el-row :gutter="24">
      <el-row :gutter="24">
        <el-col :span="24">
          <div style="margin:23px;">
            <el-breadcrumb separator-class="el-icon-arrow-right" style="width:150px">
              <el-breadcrumb-item style="font-size:18px;">公告分类</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="24">
          <ul style="margin:0 16px;">
            <li style="width:95%;padding:0 20px;color: #606266;">
              <el-row :gutter="24">
                <el-col :span="3">
                  <p>
                    <el-checkbox
                      :indeterminate="isIndeterminate"
                      :checked="isCheckAll"
                      @change="checkAll"
                      style="font-weight: 600;font-size:23px"
                    >全选</el-checkbox>
                  </p>
                </el-col>
                <el-col :span="8">
                  <h4>分类名称</h4>
                </el-col>
                <el-col :span="12">
                  <h4>分类描述</h4>
                </el-col>
                <el-col :span="1">
                  <el-button
                    style="float:right;margin:10px 0;"
                    type="danger"
                    round
                    @click="delTip(dels)"
                  >批量删除({{dels.length}})</el-button>
                </el-col>
              </el-row>
            </li>
          </ul>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="24">
          <div id="sortArr">
            <transition-group
              name="sortArr"
              mode="out-in"
              tag="ul"
              v-bind:css="false"
              v-on:before-enter="beforeEnter"
              v-on:enter="enter"
              v-on:leave="leave"
            >
              <li
                class="sortArr"
                v-for="(item,index) in allSort.records"
                :key="item.id"
                :data-index="index"
              >
                <el-row :gutter="24" style="width:100%;text-align:center;">
                  <el-col :span="3">
                    <p>
                      <el-checkbox :label="item.id" v-model="dels"></el-checkbox>
                    </p>
                  </el-col>
                  <el-col :span="8">
                    <h4 style="margin:16px 0">{{item.newsCategoryName}}</h4>
                  </el-col>
                  <el-col :span="11">
                    <p style="text-overflow:ellipsis;">{{item.remark}}</p>
                  </el-col>
                  <el-col :span="2">
                    <p>
                      <span class="update-span">
                        <svg
                          id="update"
                          @click="openUpdate(index)"
                          t="1590979218982"
                          class="icon"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="2622"
                          width="20"
                          height="20"
                        >
                          <path
                            d="M799.5 927.3H156.3c-32.3 0-58.5-26.3-58.5-58.5V225.7c0-32.3 26.3-58.5 58.5-58.5h517.4c11.4 0 20.7 9.3 20.7 20.7s-9.3 20.7-20.7 20.7H156.3c-9.4 0-17.1 7.7-17.1 17.1v643.1c0 9.4 7.7 17.1 17.1 17.1h643.1c9.4 0 17.1-7.7 17.1-17.1v-493c0-11.4 9.3-20.7 20.7-20.7s20.7 9.3 20.7 20.7v493c0.1 32.3-26.1 58.5-58.4 58.5z"
                            class="update"
                            p-id="2623"
                          />
                          <path
                            d="M552 493.6c-5.3 0-10.6-2-14.6-6.1-8.1-8.1-8.1-21.2 0-29.3l355.3-355.3c8.1-8.1 21.2-8.1 29.3 0 8.1 8.1 8.1 21.2 0 29.3L566.6 487.5c-4.1 4.1-9.4 6.1-14.6 6.1z"
                            class="update"
                            p-id="2624"
                          />
                        </svg>
                      </span>
                      <span class="del-span">
                        <svg
                          @click="delTip(item.id)"
                          id="delSort"
                          t="1590980154671"
                          class="icon"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="3591"
                          width="20"
                          height="20"
                        >
                          <path
                            d="M925.184 230.4h-162.66752V137.45664A65.7408 65.7408 0 0 0 696.97024 71.68H320.77824a65.73568 65.73568 0 0 0-65.536 65.77664V230.4H93.696a27.2128 27.2128 0 0 0 0 54.4256h831.488a27.2128 27.2128 0 0 0 0-54.4256zM309.46304 230.4V137.45664a11.34592 11.34592 0 0 1 11.3152-11.35616h376.192a11.34592 11.34592 0 0 1 11.3152 11.35616V230.4H309.46304z m484.38784 132.65408a27.16672 27.16672 0 0 0-27.136 27.2128v501.376a11.34592 11.34592 0 0 1-11.31008 11.35616H255.81568a11.35104 11.35104 0 0 1-11.3152-11.35616V390.28224a27.136 27.136 0 1 0-54.23104 0v501.376A65.7408 65.7408 0 0 0 255.81568 957.44h499.6096a65.7408 65.7408 0 0 0 65.536-65.78176V390.28224a27.1616 27.1616 0 0 0-27.1104-27.2128z m-351.06816 374.3232v-347.136a27.136 27.136 0 1 0-54.23104 0v347.136a27.136 27.136 0 1 0 54.23104 0.01536z m190.65344 0v-347.136a27.136 27.136 0 1 0-54.23104 0v347.136a27.136 27.136 0 1 0 54.23104 0.01536z"
                            class="del"
                            p-id="3592"
                          />
                        </svg>
                      </span>
                    </p>
                  </el-col>
                </el-row>
              </li>
            </transition-group>

            <ul style="text-align:left;">
              <li style="padding:5px 25px;">
                <el-pagination
                  style="float:right;"
                  :hide-on-single-page="false"
                  @current-change="setAllSort"
                  :current-page.sync="allSort.pageNo"
                  :page-size="allSort.pageSize"
                  :total="allSort.totalCount"
                  layout="total, prev, pager, next"
                ></el-pagination>
              </li>
              <li style="padding:5px 25px;">
                <span style="font-size:14px;color:#999999;">添加分类</span>
              </li>
              <li class="sortArr" style="height: 1.6em;width:95%;border: 1px solid #e0e0e0;">
                <el-row :gutter="24" style="width:100%;text-align:center;">
                  <el-col :span="3">
                    <h4>#</h4>
                  </el-col>
                  <el-col :span="8">
                    <p>
                      <el-input placeholder="请输入分类名称" v-model="sort.newsCategoryName" clearable></el-input>
                    </p>
                  </el-col>
                  <el-col :span="12">
                    <p>
                      <el-input placeholder="请输入分类描述" v-model="sort.remark" clearable></el-input>
                    </p>
                  </el-col>
                  <el-col :span="1">
                    <p>
                      <el-button type="success" icon="el-icon-check" circle @click="addSort()"></el-button>
                    </p>
                  </el-col>
                </el-row>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </el-row>
    <el-dialog
      title="修改分类"
      :visible.sync="dialogVisible"
      width="25%"
      style="text-align:left;"
      :close-on-click-modal="false"
      :destroy-on-close="true"
    >
      <el-form :model="updateSort">
        <el-form-item label="分类ID">
          <el-input v-model="updateSort.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="updateSort.newsCategoryName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类描述">
          <el-input v-model="updateSort.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="update(updateSort.id)">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allSort: [],
      el: "#sortArr",
      sort: {},
      dels: [],
      isCheckAll: false,
      isIndeterminate: false,
      dialogVisible: false,
      updateSort: {}
    };
  },
  created() {
    this.setAllSort(1);
    // alert(2)
  },
  watch: {
    dels: function(newVal) {
      if (newVal.length) {
        let asLen = this.allSort.records.length;
        console.log(newVal);
        console.log(this.allSort.records);
        if (newVal.length === asLen) {
          this.isCheckAll = true;
          this.isIndeterminate = false;
        } else if (newVal.length === 0) {
          this.isCheckAll = false;
          this.isIndeterminate = false;
        } else if (newVal.length < asLen) {
          this.isIndeterminate = true;
        }
      }
    },
    isCheckAll: function(newVal) {
      if (newVal) {
        this.allSort.records.forEach(item => {
          if (this.dels.indexOf(item.id) == -1) this.dels.push(item.id);
        });
      } else {
        this.dels = [];
      }
    }
  },
  methods: {
    beforeEnter: function(el) {
      el.style.opacity = 0;
      el.style.height = "3em";
    },
    enter: function(el, done) {
      var delay = el.dataset.index * 100;
      setTimeout(function() {
        Velocity(el, { opacity: 1, height: "1.6em" }, { complete: done });
      }, delay);
    },
    leave: function(el, done) {
      var delay = el.dataset.index * 100;
      setTimeout(function() {
        Velocity(el, { opacity: 0, height: 0 }, { complete: done });
      }, delay);
    },
    async setAllSort(pageNo) {
      try {
        if (pageNo != this.allSort.pageNo) {
          this.dels = [];
        }
        let res = await this.$axios.get("newscategory/", {
          params: {
            currPage: pageNo
          }
        });
        if (res.status === 200) {
          this.allSort = res.data;
          this.dels = [];
          // this.isCheckAll=false
          // console.log(this.isCheckAll)
        } else {
          this.$message.error({
            message: "请求出错！"
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async addSort() {
      try {
        let res = await this.$axios.post("newscategory/", this.sort);

        if (res.status === 200) {
          let typ = "";
          if (res.data.code === 200) typ = "success";
          else typ = "error";
          this.$message({
            type: typ,
            message: res.data.message
          });
          this.sort = {};
          this.setAllSort(this.allSort.pageNo);
        } else {
          this.$message.error({
            message: "请求出错！"
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async delSort(ids) {
      try {
        let res = await this.$axios.delete("newscategory/", {
          data: ids
        });
        if (res.status === 200) {
          let typ = "";
          if (res.data.code === 200) typ = "success";
          else typ = "error";
          this.$message({
            type: typ,
            message: res.data.message
          });
          await this.setAllSort(this.allSort.pageNo);
          if (ids.length === 1) {
            let index = this.dels.indexOf(ids[0]);
            if (index != -1) this.dels.splice(index, 1);
            console.log(index);
          }
          console.log(this.dels);
        } else {
          this.$message.error({
            message: "请求出错！"
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    delTip(dels) {
      let ids = [];
      if (Array.isArray(dels)) {
        ids = dels;
      } else {
        ids.push(dels);
      }
      if (ids.length === 0) {
        this.$message({
          message: "您还没有选择删除项哦",
          center: true,
          customClass: "noChecked",
          iconClass: "el-icon-warning"
        });
      } else {
        this.$confirm(
          `此操作将永久删除这${ids.length}条公告, 是否继续?`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            this.delSort(ids);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    checkAll() {
      if (!this.isCheckAll) {
        this.isCheckAll = true;
        this.isIndeterminate = false;
      } else {
        this.isCheckAll = false;
        this.isIndeterminate = false;
      }
    },
    openUpdate(index) {
      this.updateSort = this.allSort.records[index];
      this.dialogVisible = true;
    },
    async update(id) {
      try {
        console.log(this.updateSort);
        let res = await this.$axios.put("newscategory/" + id,this.updateSort);
        console.log(res);
        if (res.status === 200) {
          let typ = "";
          if (res.data.code === 200) typ = "success";
          else typ = "error";
          this.$message({
            type: typ,
            message: res.data.message
          });
          this.setAllSort(this.allSort.pageNo);
          this.dialogVisible = false;
        } else {
          this.$message.error({
            message: "请求出错！"
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
<style>
ul {
  list-style: none;
}
.sortArr {
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin: 15px auto;
  padding: 30px 10px;
  transition: all 0.3s;
  width: 95%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.sortArr.active .sortArr,
.sortArr:hover,
.sortArr:visited {
  border: 1px solid rgb(63, 171, 235);
  color: rgb(63, 171, 235);
}
.update-span,
.del-span {
  padding: 0 5px;
}
.update {
  fill: #8a8a8a;
}
.update-span:hover .update {
  fill: rgb(63, 171, 235);
}

.del {
  fill: #8a8a8a;
}
.del-span:hover .del {
  fill: #f56c6c;
}
.el-input--suffix .el-input__inner {
  text-align: center;
}
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #f56c6c;
  border-color: #f56c6c;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #f56c6c;
}
.el-checkbox__inner:hover {
  border-color: #f56c6c;
}
.noChecked {
  background-color: white;
  color: #666666;
}
</style>