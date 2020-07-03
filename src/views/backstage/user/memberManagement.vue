<template>
  <div class="main">
    <div style="margin:23px">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="width:150px">
        <el-breadcrumb-item style="font-size:18px;">协会成员管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="table">
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="30"></el-table-column>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand" label-width="100px">
                <el-form-item label="姓名:" class="item">
                  <span>{{ props.row.memberName }}</span>
                </el-form-item>
                <el-form-item label="学号:">
                  <span>{{ props.row.stu_num }}</span>
                </el-form-item>
                <el-form-item label="性别:">
                  <span>{{ props.row.gender }}</span>
                </el-form-item>
                <el-form-item label="电话号码:">
                  <span>{{ props.row.phoneNum }}</span>
                </el-form-item>
                <el-form-item label="电子邮箱:">
                  <span>{{ props.row.email }}</span>
                </el-form-item>
                <el-form-item label="QQ:">
                  <span>{{ props.row.qq }}</span>
                </el-form-item>
                <el-form-item label="国家:">
                  <span>{{ props.row.nation }}</span>
                </el-form-item>
                <el-form-item label="籍贯:">
                  <span>{{ props.row.nativePlace}}</span>
                </el-form-item>
                <el-form-item label="家庭住址:">
                  <span>{{ props.row.address}}</span>
                </el-form-item>
                <el-form-item label="政治面貌：">
                  <span>{{ props.row.politicalOutlook}}</span>
                </el-form-item>
                <el-form-item label="学历：">
                  <span>{{ props.row.education}}</span>
                </el-form-item>
                <el-form-item label="身份证号：">
                  <span>{{ props.row.cardID}}</span>
                </el-form-item>
                <el-form-item label="描述：">
                  <span>{{ props.row.description}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="编码" width="100"></el-table-column>
          <el-table-column prop="memberName" label="姓名" width="100"></el-table-column>
          <el-table-column prop="institute.institute_name" label="学院"></el-table-column>
          <el-table-column prop="specialty.specialty_name" label="专业"></el-table-column>
          <el-table-column prop="iclass.class_name" label="班级"></el-table-column>
          <el-table-column prop="position.positionName" label="职位"></el-table-column>
          <el-table-column width="260">
            <template slot="header">
              <div
                style="text-align:left;margin:20px 0;display: flex;align-items: center;width:125px"
                @click="BulkDelete()"
              >
                <svg
                  t="1591641718272"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="5281"
                  width="23"
                  height="23"
                >
                  <path
                    d="M512 0c283.136 0 512 228.864 512 512s-228.864 512-512 512-512-228.864-512-512 228.864-512 512-512z"
                    fill="#E64545"
                    p-id="5282"
                  />
                  <path
                    d="M307.2 477.696h409.6c20.48 0 34.304 13.824 34.304 34.304s-13.824 34.304-34.304 34.304h-409.6c-20.48 0-34.304-13.824-34.304-34.304s13.824-34.304 34.304-34.304z"
                    fill="#FFFFFF"
                    p-id="5283"
                  />
                </svg>
                <span style="color:#E64545;padding:0 8px;font-size: 16px;">批量删除({{this.checkeds}})</span>
              </div>
            </template>
            <template slot-scope="scope">
              <svg
                t="1591640844935"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2862"
                width="20"
                height="20"
                @click="openeditDialog(scope.row.id,scope.row)"
              >
                <path
                  d="M954.99983 11.841362a40.415319 40.415319 0 1 1 57.158808 57.158808L440.55966 640.610043a40.415319 40.415319 0 1 1-57.169703-57.169703L954.99983 11.841362z m-11.841362 419.317106a40.415319 40.415319 0 0 1 80.830638 0v444.633872C1024 957.646979 957.657872 1024 875.803234 1024h-727.584681C66.353021 1024 0 957.646979 0 875.79234v-727.58468C0 66.353021 66.353021 0 148.20766 0h431.169361a40.415319 40.415319 0 0 1 0 80.841532h-431.169361a67.366128 67.366128 0 0 0-67.366128 67.366128v727.58468a67.366128 67.366128 0 0 0 67.366128 67.366128h727.58468a67.366128 67.366128 0 0 0 67.366128-67.366128V431.158468z"
                  p-id="2863"
                  fill="#cdcdcd"
                />
              </svg>
              <svg
                style="margin-left:10px"
                t="1591641075595"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3797"
                width="20"
                height="20"
                @click="deleteRow(scope.row.id,scope.$index,tableData)"
              >
                <path
                  d="M923.733 187.733H716.8C714.667 83.2 629.333 0 524.8 0s-189.867 83.2-192 187.733H106.667c-27.734 0-49.067 21.334-49.067 49.067s21.333 49.067 49.067 49.067h81.066v550.4c0 102.4 0 187.733 136.534 187.733h381.866c136.534 0 136.534-83.2 136.534-187.733v-550.4h81.066c27.734 0 49.067-21.334 49.067-49.067s-23.467-49.067-49.067-49.067z m-401.066-96c53.333 0 98.133 40.534 100.266 93.867H422.4c4.267-51.2 46.933-93.867 100.267-93.867z m179.2 840.534H328.533c-51.2 0-53.333-38.4-53.333-96v-550.4h480v550.4c0 57.6 4.267 96-53.333 96z"
                  p-id="3798"
                  fill="#cdcdcd"
                />
                <path
                  d="M430.933 422.4c-23.466 0-40.533 23.467-40.533 51.2v290.133c0 27.734 17.067 51.2 40.533 51.2 23.467 0 40.534-23.466 40.534-51.2V473.6c0-27.733-19.2-51.2-40.534-51.2z m168.534 0c-23.467 0-40.534 23.467-40.534 51.2v290.133c0 27.734 19.2 51.2 40.534 51.2 23.466 0 40.533-23.466 40.533-51.2V473.6c2.133-27.733-17.067-51.2-40.533-51.2z"
                  p-id="3799"
                  fill="#cdcdcd"
                />
              </svg>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[10,15,20,25,30]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
        <el-dialog title="修改成员信息" :visible.sync="AddDialogFormVisible" width="60%">
          <el-form
            inline
            ref="AddMemberForm"
            label-width="100px"
            :model="AddMemberForm"
            :label-position="left"
          >
            <el-form-item label="姓名" prop="memberName">
              <el-input v-model="AddMemberForm.memberName"></el-input>
            </el-form-item>
            <el-form-item label="学号" prop="stu_num">
              <el-input v-model="AddMemberForm.stu_num"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-select placeholder="请选择" v-model="AddMemberForm.gender">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="电话号码" prop="phoneNum">
              <el-input v-model="AddMemberForm.phoneNum"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
              <el-input v-model="AddMemberForm.email"></el-input>
            </el-form-item>
            <el-form-item label="QQ" prop="qq">
              <el-input v-model="AddMemberForm.qq"></el-input>
            </el-form-item>
            <el-form-item label="民族" prop="nation">
              <el-select placeholder="请选择" v-model="AddMemberForm.nation" filterable>
                <el-option
                  v-for="item in nations"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="籍贯" prop="nativePlace">
              <el-input v-model="AddMemberForm.nativePlace"></el-input>
            </el-form-item>
            <el-form-item label="家庭住址" prop="address">
              <el-input v-model="AddMemberForm.address"></el-input>
            </el-form-item>
            <el-form-item label="政治面貌" prop="politicalOutlook">
              <el-select placeholder="请选择" v-model="AddMemberForm.politicalOutlook">
                <el-option
                  v-for="item in politicalOutlooks"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学历" prop="education">
              <el-select placeholder="请选择" v-model="AddMemberForm.education">
                <el-option
                  v-for="item in educations"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="身份证号" prop="cardID">
              <el-input v-model="AddMemberForm.cardID"></el-input>
            </el-form-item>
            <el-form-item label="职位" prop="positionID">
              <el-input v-model="AddMemberForm.positionID"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cansol('form')">取 消</el-button>
            <el-button type="primary" @click="confirm('form')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      pagenum: 1,
      pagesize: 10,
      total: 10,
      checkeds: 0,
      AddDialogFormVisible: false,
      AddMemberForm: {
        address: "",
        cardID: "",
        classID: "",
        description: "",
        education: "",
        email: "",
        flag: 0,
        gender: "",
        memberName: "",
        nation: "",
        nativePlace: "",
        phoneNum: "",
        politicalOutlook: "",
        positionID: "",
        qq: "",
        stu_num: ""
      },
      selected: [],
      nations: [
        {
          lable: "汉族",
          value: "汉族"
        },
        {
          lable: "蒙古族",
          value: "蒙古族"
        },
        {
          lable: "回族",
          value: "回族"
        },
        {
          lable: "藏族",
          value: "藏族"
        },
        {
          lable: "维吾尔族",
          value: "维吾尔族"
        },
        {
          lable: "苗族",
          value: "苗族"
        },
        {
          lable: "彝族",
          value: "彝族"
        },
        {
          lable: "壮族",
          value: "壮族"
        },
        {
          lable: "布依族",
          value: "布依族"
        },
        {
          lable: "朝鲜族",
          value: "朝鲜族"
        },
        {
          lable: "满族",
          value: "满族"
        },
        {
          lable: "侗族",
          value: "侗族"
        },
        {
          lable: "瑶族",
          value: "瑶族"
        },
        {
          lable: "白族",
          value: "白族"
        },
        {
          lable: "土家族",
          value: "土家族"
        },
        {
          lable: "哈尼族",
          value: "哈尼族"
        },
        {
          lable: "哈萨克族",
          value: "哈萨克族"
        },
        {
          lable: "傣族",
          value: "傣族"
        },
        {
          lable: "黎族",
          value: "黎族"
        },
        {
          lable: "傈僳族",
          value: "傈僳族"
        },
        {
          lable: "佤族",
          value: "佤族"
        },
        {
          lable: "畲族",
          value: "畲族"
        },
        {
          lable: "高山族",
          value: "高山族"
        },
        {
          lable: "拉祜族",
          value: "拉祜族"
        },
        {
          lable: "水族",
          value: "水族"
        },
        {
          lable: "东乡族",
          value: "东乡族"
        },
        {
          lable: "纳西族",
          value: "纳西族"
        },
        {
          lable: "景颇族",
          value: "景颇族"
        },
        {
          lable: "柯尔克孜族",
          value: "柯尔克孜族"
        },
        {
          lable: "土族",
          value: "土族"
        },
        {
          lable: "达斡尔族",
          value: "达斡尔族"
        },
        {
          lable: "仫佬族",
          value: "仫佬族"
        },
        {
          lable: "羌族",
          value: "羌族"
        },
        {
          lable: "布朗族",
          value: "布朗族"
        },
        {
          lable: "撒拉族",
          value: "撒拉族"
        },
        {
          lable: "毛南族",
          value: "毛南族"
        },
        {
          lable: "仡佬族",
          value: "仡佬族"
        },
        {
          lable: "锡伯族",
          value: "锡伯族"
        },
        {
          lable: "阿昌族",
          value: "阿昌族"
        },
        {
          lable: "普米族",
          value: "普米族"
        },
        {
          lable: "塔吉克族",
          value: "塔吉克族"
        },
        {
          lable: "怒族",
          value: "怒族"
        },
        {
          lable: "乌孜别克族",
          value: "乌孜别克族"
        },
        {
          lable: "俄罗斯族",
          value: "俄罗斯族"
        },
        {
          lable: "鄂温克族",
          value: "鄂温克族"
        },
        {
          lable: "德昂族",
          value: "德昂族"
        },
        {
          lable: "保安族",
          value: "保安族"
        },
        {
          lable: "裕固族",
          value: "裕固族"
        },
        {
          lable: "京族",
          value: "京族"
        },
        {
          lable: "塔塔尔族",
          value: "塔塔尔族"
        },
        {
          lable: "独龙族",
          value: "独龙族"
        },
        {
          lable: "鄂伦春族",
          value: "鄂伦春族"
        },
        {
          lable: "赫哲族",
          value: "赫哲族"
        },
        {
          lable: "门巴族",
          value: "门巴族"
        },
        {
          lable: "珞巴族",
          value: "珞巴族"
        },
        {
          lable: "基诺族",
          value: "基诺族"
        }
      ],
      politicalOutlooks: [
        {
          lable: "共青团员",
          value: "共青团员"
        },
        {
          lable: "中共预备党员",
          value: "中共预备党员"
        },
        {
          lable: "中共党员",
          value: "中共党员"
        },
        {
          lable: "群众",
          value: "群众"
        }
      ],
      educations: [
        {
          lable: "高中以下",
          value: "高中以下"
        },
        {
          lable: "高中",
          value: "高中"
        },
        {
          lable: "中专/技校",
          value: "中专/技校"
        },
        {
          lable: "大专",
          value: "大专"
        },
        {
          lable: "本科",
          value: "本科"
        },
        {
          lable: "硕士",
          value: "硕士"
        },
        {
          lable: "博士",
          value: "博士"
        }
      ]
    };
  },
  created() {
    this.initTable();
  },
  methods: {
    async initTable() {
      const { data: res } = await this.$http.get("member/search", {
        praams: {
          flag: 0
        }
      });
      if (res.code != 200) {
        this.$message.error(res.message);
      } else {
        this.tableData = res.data.records;
        this.pagenum = res.data.current;
        this.total = res.data.total;
        this.pagesize = res.data.size;
      }
    },
    async handleSizeChange(val) {
      const { data: res } = await this.$http.get("member/search", {
        params: { size: val }
      });
      this.pagesize = res.data.size;
    },
    async handleCurrentChange(val) {
      const { data: res } = await this.$http.get("member/search", {
        params: { pageNum: val }
      });
      this.tableData = res.data.records;
      this.pagenum = res.data.current;
    },
    openeditDialog() {
      this.AddDialogFormVisible = true;
    },
    async deleteRow(id, index, table) {
      let resData = [id];
      const confirmresult = await this.$confirm(
        "此操作将永久删除该成员, 是否继续?",
        "删除",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      if (confirmresult == "confirm") {
        console.log(resData);

        const { data: res } = await this.$http.delete("member/", {
          data: resData
        });
        if (res.code != 200) {
          this.$message.error("删除失败!");
        } else {
          this.$message.success("删除成功!");
          table.splice(index, 1);
        }
      } else {
        this.$message.info("已取消删除");
      }
    },
    handleSelectionChange(val) {
      this.checkeds = val.length;
      val.forEach(item => {
        this.selected.push(item.id);
      });
    },
    async BulkDelete() {
      console.log(this.selected);
      if (this.selected.length == 0) {
        this.$message.warning("请先选择成员!");
        return;
      }
      const confirmresult = await this.$confirm(
        "此操作将永久删除该成员, 是否继续?",
        "删除",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      if (confirmresult == "confirm") {
        console.log(this.selected);

        const { data: res } = await this.$http.delete("member/", {
          data: this.selected
        });
        if (res.code != 200) {
          this.$message.error("删除失败!");
        } else {
          this.$message.success("删除成功!");
          this.initTable();
        }
      } else {
        this.$message.info("已取消删除");
      }
    }
  }
};
</script>
<style scoped>
.main {
  padding: 40px 80px;
}
.table {
  margin-top: 40px;
}
.el-form-item {
  width: 30%;
}
.el-pagination {
  margin-top: 15px;
}
.el-dialog .el-form-item {
  width: 40%;
}
.el-select {
  width: 205px;
}
</style>