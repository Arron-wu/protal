<template>
  <!--flex弹性盒子模型，justify-content：主抽 -->
  <div style="display: flex;justify-content: center;margin-top: 200px">
    <el-card style="width: 400px">
      <div slot="header" class="clearfix">
        <span>登录</span>
      </div>
      <table>
        <tr>
          <td>登陆账户</td>
          <td>
            <el-input v-model="user.account" placeholder="请输入账户" />
          </td>
        </tr>
        <tr>
          <td>密码</td>
          <td>
            <el-input
              type="password"
              v-model="user.password"
              placeholder="请输入密码"
              @keydown.enter.native="doLogin"
            />
            <!-- @keydown.enter.native="doLogin"当按下enter键的时候也会执行doLogin方法-->
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <!-- 点击事件的两种不同的写法v-on:click和 @click-->
            <!--<el-button style="width: 300px" type="primary" v-on:click="doLogin">登录</el-button>-->
            <el-button class="button" type="primary" @click="doLogin"
              >登录</el-button
            >
            <el-button class="button" type="info" @click="doRegister"
              >注册</el-button
            >
          </td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      user: {
        account: "admin",
        password: "123"
        //为了登录方便，可以直接在这里写好用户名和密码的值
      }
    };
  },
  methods: {
    doLogin() {
      let temp = this;
      if (this.user.account.trim() === "" || this.user.password.trim() === "") {
        temp.$message.error("账户密码不可以为空");
        return;
      }
      axios
        .post("/api/base/login", {
          account: this.user.account,
          password: this.user.password
        })
        .then(function(response) {
          if (response.data.code === 200) {
            temp.$message.success("登陆成功");
            temp.$router.push({ path: "/index" });
            sessionStorage.clear();
            let map = response.data.data;
            sessionStorage.setItem("token", map.token);
            sessionStorage.setItem("user_id", map.user_id);
            sessionStorage.setItem("username", map.username);
          } else {
            temp.$message.error(response.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    doRegister() {
      this.$router.push({ path: "/register" });
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  width: 150px;
}
</style>
