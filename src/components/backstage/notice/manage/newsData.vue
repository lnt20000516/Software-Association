<template>
  <div class="newsData" ref="newsData">
    <el-table
      :data="noticeData"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.8)"
    >
      <el-table-column v-if="isShowDels" fill="#fbc4c4" type="selection" width="55"></el-table-column>
      <el-table-column label="标题" :show-overflow-tooltip="true" align="left">
        <template slot-scope="scope">
          <span
            v-if="scope.row.isTop"
            class="badge"
            :class="scope.row.topBadge.type"
          >{{scope.row.topBadge.label}}</span>
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类别" width="80" align="center" v-if="!isSmall">
        <template slot-scope="scope">
          <span>{{ scope.row.newsCategory.newsCategoryName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="标签" width="300" align="center" v-if="!isMedium&&!isSmall">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag
              size="medium"
              style="margin:0 3px;"
              v-for="tag in scope.row.Label"
              :key="tag.id"
              :type="tag.type"
            >{{ tag.name }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="发布日期" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.topTime|timeFormat(scope.row.isTiming)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-button
            type="danger"
            size="mini"
            round
            plain
            v-if="!isShowDels"
            @click="isShowDels=true"
          >
            <i class="el-icon-delete"></i>
            批量删除
          </el-button>
          <div v-if="isShowDels">
            <el-button type="danger" size="mini" round plain @click="deleteNotice(dels)">确认</el-button>
            <el-button type size="mini" round plain @click="isShowDels=false">取消</el-button>
          </div>
        </template>
        <template slot-scope="scope">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="putOutNotice(scope.row)" v-if="scope.row.isTiming">
                <i class="el-icon-s-promotion" style="font-size:20px;"></i>立即发布
              </el-dropdown-item>
              <el-dropdown-item @click.native="reEditNotice(scope.row.id)">
                <i class="el-icon-edit" style="font-size:20px;"></i>重新编辑
              </el-dropdown-item>
              <el-dropdown-item @click.native="deleteNotice(scope.row.id)">
                <i class="el-icon-delete" style="font-size:20px;"></i>删除
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <paging style="float:right;" ref="paging" :paging="paging"></paging>
  </div>
</template>

<script>
import paging from "@/components/backstage/notice/manage/paging.vue";
export default {
  data() {
    return {
      noticeData: [],
      loading: true,
      paging: {
        pageSize: 10,
        pageNo: 1,
        totalPage: 0,
        totalCount: 0
      },
      newsFlag: 0,
      title: "",
      timingFlag: 0,
      isShowDels: false,
      dels: [],
      isCheckedAll: false
    };
  },
  props: {
    isMedium: {
      type: Boolean,
      default: false
    },
    isSmall: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.setNotice();
  },
  watch: {
    isCheckedAll: function(newVal) {
      if (newVal) {
        this.noticeData.forEach(item => {
          this.dels.push(item.id);
        });
      } else {
        this.dels = [];
      }
    }
  },
  methods: {
    checkedAll() {
      this.isCheckedAll = !this.isCheckedAll;
    },
    async setNotice() {
      this.loading = true;
      try {
        let res = await this.$axios.get("news/", {
          //得到所有newsFlag通知数据
          credentials: "include",
          params: {
            newsFlag: this.newsFlag,
            currPage: this.paging.pageNo,
            timingFlag: this.timingFlag,
            title: this.title
          }
        });
        if (res.status === 200) {
          if (res.data.code === 200) {
            setTimeout(() => {
              this.noticeData = res.data.data.records;
              if (this.noticeData && this.noticeData.length != 0) {
                let _this = this;
                this.noticeData.forEach(function(item) {
                  if (item.top != 0) {
                    item.isTop = true;
                    if (item.top === 2) {
                      item.topBadge = {
                        type: "badge-danger",
                        label: "高级置顶"
                      };
                    } else {
                      item.topBadge = {
                        type: "badge-primary",
                        label: "置顶"
                      };
                    }
                  } else item.isTop = false;
                  if (item.newsLabel) {
                    let l = item.newsLabel.split(",");
                    for (let i = 0; i < l.length; i++) {
                      let m = l[i];
                      let p = {
                        id: i,
                        name: m,
                        type: ""
                      };
                      l[i] = p;
                    }
                    item.Label = l;
                  }
                  if (_this.timingFlag === 1) {
                    item.isTiming = true;
                  } else item.isTiming = false;
                });
              }

              this.paging = {
                pageSize: res.data.data.size,
                pageNo: res.data.data.current,
                totalPage: res.data.data.pages,
                totalCount: res.data.data.total
              };
              this.loading = false; //加载动画
            }, 800);
          }
        } else {
          this.$message.error({
            message: "请求错误"
          });
        }
      } catch (err) {
        this.message.error({
          message: err
        });
      }
    },
    reEditNotice(id) {
      this.$router.push({
        path: "/Backstage/notice/edit",
        query: {
          id: id
        }
      });
    },
    deleteNotice(dels) {
      let ids = [];
      if (Array.isArray(dels)) {
        ids = dels;
      } else {
        ids.push(dels);
      }
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
          this.del();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async del() {
      try {
        let res = await this.$axios.delete("news/", {
          method: "delete",
          credentials: "include",
          data: ids
        });
        if (res.status === 200) {
          if (res.data.code == 200) {
            if (!Array.isArray(dels)) {
              //解决批量删除时选中已被删除项
              let index = this.dels.indexOf(dels);
              if (index != -1) {
                this.dels.splice(index, 1);
              }
              this.$message.success({
                message: "删除成功"
              });
            }
            this.setNotice();
            this.$parent.setDraftBadge();
          } else {
            this.$message.error({
              message: res.data.message
            });
          }
        } else {
          this.message.error({
            message: "请求错误"
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async putOutNotice(row) {
      try {
        let res = await this.$axios.put("news/", {
          newsId: row.id,
          topTime: (new Date() - 0) / 1000
        });
        if (res.status === 200) {
          if (res.data.code === 200) {
            this.$message.success({
              message: "发布成功"
            });
            this.setNotice();
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
        console.log(res);
      }
    },
    handleSelectionChange(val) {
      this.dels = val;
    }
  },
  filters: {
    timeFormat(val, isTiming) {
      if (isTiming) {
        return `预计${val}发送`;
      } else return val;
    }
  },
  components: {
    paging
  }
};
</script>
<style>
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #f56c6c;
  border-color: #f56c6c;
}
.newsData {
  margin:0 10px;
  transition: all 0.5s;
}
.badge {
  border-radius: 5px;
  padding: 3px;
  font-size: 12px;
}
.badge-primary {
  background-color: #409eff;
  color: white;
}
.badge-danger {
  background-color: #f56c6c;
  color: white;
}
</style>
