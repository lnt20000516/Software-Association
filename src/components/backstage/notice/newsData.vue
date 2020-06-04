<template>
  <div class="newsData" ref="newsData">
    <el-table
      :data="noticeData"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="isShowDels" fill="#fbc4c4" type="selection" width="55"></el-table-column>
      <el-table-column label="标题" align="left">
        <template slot-scope="scope">
          <span
            v-if="scope.row.isTop"
            class="badge"
            :class="scope.row.topBadge.type"
          >{{scope.row.topBadge.label}}</span>
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类别" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.newsCategory.newsCategoryName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="标签" width="300" align="center">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag
              size="medium"
              style="margin:0 3px;"
              v-for="tag in scope.row.newsLabel"
              :key="tag.id"
              :type="tag.type"
            >{{ tag.name }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="发布日期" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.deplDate}}</span>
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
          <i
            class="el-icon-edit"
            style="font-size:20px;"
            @click="reEditNotice(scope.$index, scope.row)"
          ></i>

          <span style="color:#999999;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <i
            class="el-icon-delete"
            style="font-size:20px;color:#F56C6C;"
            @click="deleteNotice(scope.row.id)"
          ></i>
        </template>
      </el-table-column>
    </el-table>
    <paging style="float:right;" ref="paging" :paging="paging"></paging>
  </div>
</template>

<script>
import paging from "@/components/backstage/notice/paging.vue";
export default {
  data() {
    return {
      noticeData: [],
      loading: true,
      newsFlag: 0,
      paging: {
        pageSize: 10,
        pageNo: 1,
        totalPage: 0,
        totalCount: 0
      },
      title: "",
      isShowDels: false,
      dels: [],
      isCheckedAll: false
    };
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
    setNotice() {
      let _this = this;
      // this.pno = pno
      this.$axios("news/", {
        //得到所有newsFlag通知数据
        method: "get",
        credentials: "include",
        params: {
          newsFlag: _this.newsFlag,
          pageNo: _this.paging.pageNo,
          title: _this.title
        }
      }).then(res => {
        this.noticeData = res.data.records;
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
            item.newsLabel = l;
          }
        });
        this.paging = {
          pageSize: res.data.pageSize,
          pageNo: res.data.pageNo,
          totalPage: res.data.totalPage,
          totalCount: res.data.totalCount
        };
        _this.loading = false; //加载动画
        this.$refs.newsData.style.opacity = 1;
      });
    },
    reEditNotice(index, row) {
      this.$router.push({
        path: "/Backstage/notice/edit",
        query: {
          id: row.id
        }
      });
    },
    deleteNotice(dels) {
      let _this = this;
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
          this.$axios("news/", {
            method: "delete",
            credentials: "include",
            data: ids
          })
            .then(res => {
              let type = "";
              if (res.data.code == 200) {
                type = "success";
                if (!Array.isArray(dels)) {
                  //解决批量删除时选中已被删除项
                  let index = this.dels.indexOf(dels);
                  if (index != -1) {
                    this.dels.splice(index, 1);
                  }
                }
                _this.setNotice();
                this.$parent.setDraftBadge();
              } else {
                type = "error";
              }
              this.$message({
                type: type,
                message: res.data.message
              });
            })
            .catch(err => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSelectionChange(val) {
      this.dels = val;
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
  opacity: 0;
  transition: all 1s;
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
