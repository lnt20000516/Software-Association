<template>
  <div class="resource-secretKey">
    <div style="margin:23px 0;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="width:150px">
        <el-breadcrumb-item style="font-size:18px;">密钥管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <p class="intro">
      用于后端访问七牛云使用的密钥（可以设置多对密钥(Access/Secret Key)，但只能运行一个密钥；出于安全考虑，建议周期性地更换密钥。
      您可以查看更多）
      <el-link type="primary" href="https://developer.qiniu.com/af/kb/1334">安全使用密钥建议</el-link>。
    </p>
    <el-table :data="keys" style="width: 100%">
      <el-table-column prop="configValue.bucketName" label="bucketName" width="110"></el-table-column>
      <el-table-column label="AccessKey/SecretKey">
        <template slot-scope="scope">
          <div style="display: flex;align-items: center;width:100%;">
            <div style="height:100px;width:100%;">
              <label for="ak" style="margin:0 5px;">AK:</label>
              <el-input
                id="ak"
                v-model="scope.row.configValue.accessKey"
                style="width:95%;"
                readonly
              ></el-input>
              <label for="sk" style="margin:0 5px;">SK:</label>
              <el-input
                id="sk"
                v-model="scope.row.configValue.securityKey"
                style="width:95%;"
                ref="pwd"
                :type="skStatus"
                readonly
              ></el-input>
              <el-button
                type="info"
                size="mini"
                class="pwd-show"
                @click="skStatus='text'"
                v-if="skStatus==='password'"
              >显示</el-button>
              <el-button
                type="info"
                size="mini"
                class="pwd-show"
                @click="skStatus='password'"
                v-else
              >隐藏</el-button>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <span :class="scope.row.state.style" v-html="scope.row.state.title"></span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <div v-if="scope.row.configStatus">
            <el-button size="mini" type="danger" @click="blockUp(scope.$index, scope.row)">停用</el-button>
          </div>
          <div v-else>
            <el-button
              size="mini"
              type="warning"
              plain
              @click="startUsing(scope.$index, scope.row)"
            >启用</el-button>
            <el-button
              size="mini"
              type="danger"
              plain
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-button size="small" type="primary" ref="addKeys" style="float:right;margin:5px 0;">创建密钥</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keys: [],
      skStatus: "password"
    };
  },
  created() {
    this.setKeys();
  },
  methods: {
    async setKeys() {
      try {
        let res = await this.$axios.get("/config/qiniu/list");
        console.log(res);
        if (res.status === 200) {
          console.log(res.data);
          this.keys = res.data.data;
          this.keys.forEach(item => {
            if (item.configStatus) {
              item.state = {
                title: "使用中",
                style: "run"
              };
            } else {
              item.state = {
                title: "已停用",
                style: "over"
              };
            }
          });
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
    blockUp(index, row) {
      this.updateStatus(row.id, row.configStatus);
    },
    startUsing(index, row) {
      this.updateStatus(row.id, row.configStatus);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    async updateStatus(id, status) {
      try {
        let res = await this.$axios.put(`config/qiniu/${id}/info?status=${status}`,);
        console.log(res);
        
        if (res.status === 200) {
          if (res.data.code === 200) {
            this.$message.success({
              message: status ? "已启用" : "已停用",
              customClass: "update-status"
            });
            this.setKeys();
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
    }
  }
};
</script>
<style scoped>
.el-input {
  margin: 5px 0;
}
.el-input.is-active .el-input__inner,
.el-input__inner:focus {
  border-color: #c0c4cc !important;
  outline: 0;
}
.pwd-show {
  float: right;
  position: relative;
  top: -39px;
  left: -8px;
}
.run {
  color: #67c23a;
}
.over {
  color: #ff7373;
}
.update-status {
  background-color: white;
}
</style>
<style>
.intro {
  color: #666f80;
  width: 70%;
  text-align: left;
  font-size: 14px;
  margin: 50px 0;
}
</style>