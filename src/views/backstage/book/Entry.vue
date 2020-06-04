<template>
  <div class="main">
    <div style="margin:23px ">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="width:150px">
        <el-breadcrumb-item style="font-size:18px;">录入书籍</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="form">
      <el-form ref="form" pxlabel-width="100px" :model="form" :rules="rules">
        <div class="form1">
          <div>
            <el-form-item label="书名" prop="bookName">
              <el-input v-model="form.bookName"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
              <el-input v-model="form.author"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
              <el-input v-model="form.price" oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" autocomplete="off"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="数量" prop="count">
              <el-input v-model.number="form.count" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="分类号" prop="bookCategoryID">
              <el-input v-model="form.bookCategoryID" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="ISBN" prop="isbn">
              <el-input v-model="form.isbn"></el-input>
            </el-form-item>
          </div>
          <div class="cover">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p>书籍封面</p>
          </div>
        </div>

        <el-form-item>
          <el-button type="primary" size="medium" @click=" onSubmit('form')">提交</el-button>
          <el-button size="medium" @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var checkNum = (rule, value, callback) => {
      if (value <= 0) {
        callback(new Error("必须大于0"));
      } else {
        callback();
      }
    };
    return {
      isImg: false,
      imageUrl: "",
      form: {
        bookName: "",
        author: "",
        isbn: "",
        price: 0,
        count: 0,
        bookCategoryID: "",
        remark: ""
      },
      rules: {
        bookName: [{ required: true, message: "书名不能为空" }],
        author: [{ required: true, message: "作者不能为空" }],
        isbn: [{ required: true, message: "ISBN号不能为空" }],
        price: [
          { required: true, message: "价格不能为空" },
          { validator: checkNum, trigger: "blur" }
        ],
        bookCategoryID: [{ required: true, message: "分类号不能为空" }],
        count: [
          { required: true, message: "数量不能为空" },
          { type: "number", message: "数量必须为数字值" },
          { validator: checkNum, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.isImg = true;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    onSubmit(formName) {
      // if (!this.isImg) {
      //   this.$message.error("请选择书籍封面");
      //   return;
      // }
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (this.form.remark == "") {
            this.form.remark = null;
          }
          console.log(this.form.remark);
          const { data: res } = await this.$http.post("book/", this.form);
          if (res.code != 200) {
            this.$message.error("提交失败");
          }
          this.$message.success("提交成功");
          this.$refs[formName].resetFields();
        } else {
          console.log("error submit!!");

          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
/* .form {
  margin-top: 50px;
  margin-left: 30px;
  
} */
.el-input {
  width: 350px;
  
}
.main {
  padding: 40px 80px;
}
.form1 {
  display: flex;
  justify-content: space-between;
}
.cover {
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #787878;
  margin-top: 50px;
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  height: auto;
  width: auto;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>