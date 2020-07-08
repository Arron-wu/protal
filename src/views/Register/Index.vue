<template>
  <el-form id="main" ref="form" :model="form" :rules="rules" label-width="80px">
    <el-form-item label="用户名" prop="username">
      <el-col :span="8">
        <el-input v-model="form.username" />
      </el-col>
    </el-form-item>
    <el-form-item label="账号" prop="account">
      <el-col :span="8">
        <el-input v-model="form.account" />
      </el-col>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-col :span="8">
        <el-input v-model="form.password" type="password" />
      </el-col>
    </el-form-item>
    <el-form-item label="性别">
      <el-col :span="8">
        <el-select v-model="form.sex">
          <el-option label="男" value="1" />
          <el-option label="女" value="2" />
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="电子邮箱">
      <el-col :span="8">
        <el-input v-model="form.email" />
      </el-col>
    </el-form-item>
    <el-form-item label="手机号码">
      <el-col :span="8">
        <el-input v-model="form.phone" />
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">注册</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";

export default {
  name: "Index",
  data() {
    return {
      form: {
        username: "",
        account: "",
        password: "",
        sex: "",
        email: "",
        phone: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        account: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let temp = this;
          axios
            .post("/api/base/user", {
              username: this.form.username,
              account: this.form.account,
              password: this.form.password,
              sex: this.form.sex,
              email: this.form.email,
              phone: this.form.phone
            })
            .then(function(response) {
              if (response.data.code === 200) {
                temp.$message({
                  message: "注册成功，跳转登陆页面",
                  type: "success"
                });
                temp.$router.push({ path: "/login" });
              } else {
                temp.$message.error(response.data.msg);
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
#main {
  margin: 50px 650px;
  width: 50%;
}
</style>
