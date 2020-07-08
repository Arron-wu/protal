<template>
  <el-container id="main">
    <el-header>
      <el-row id="row" type="flex" justify="start" align="middle" :gutter="5">
        <el-col :span="6">
          <el-input placeholder="Java学习之路" />
        </el-col>
        <el-col :span="2">
          <el-button icon="el-icon-search" circle />
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-plus" @click="addForum"
            >发帖
          </el-button>
        </el-col>
        <el-col :span="2" :offset="8">
          {{ username }}
        </el-col>
        <el-col :span="2">
          <el-button
            type="primary"
            size="medium"
            @click="toLogin"
            v-show="!online"
          >
            登录
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button
            type="primary"
            size="medium"
            @click="toLayout"
            v-show="online"
          >
            退出
          </el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" :index="indexMethod" />
        <el-table-column
          prop="id"
          label="帖子编号"
          width="180"
          v-show="false"
        />
        <el-table-column prop="username" label="发帖人" width="180" />
        <el-table-column prop="title" label="标题" width="180" />
        <el-table-column prop="createTime" label="发布时间" />
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form">
        <el-row>
          <el-col :span="16">
            <el-form-item label="标题">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="内容">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="form.article"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-button
              type="primary"
              size="medium"
              @click="submitForum"
              :disabled="disabled"
              >保存
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-drawer>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Index",
  data() {
    return {
      username: "未登录",
      online: false,
      drawer: false,
      disabled: false,
      form: {
        title: "",
        article: ""
      },
      tableData: []
    };
  },
  mounted() {
    let key = sessionStorage.getItem("username");
    if (key !== null) {
      this.username = "用户名:" + key;
      this.online = true;
    }
    this.selectPost();
  },
  methods: {
    //登陆
    toLogin() {
      this.$router.push({ path: "/login" });
    },
    //注销
    toLayout() {
      this.$message.success("退出成功");
      sessionStorage.clear();
      this.$router.push({ path: "/login" });
    },
    addForum() {
      this.form.title = "";
      this.form.article = "";
      this.drawer = true;
    },
    handleClose(done) {
      this.$confirm("确定要关闭嘛?", "提示", {
        /*  confirmButtonText: "确定",
                                cancelButtonText: "取消",*/
        type: "warning"
      })
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    submitForum() {
      let temp = this;
      axios.defaults.headers.common["token"] = sessionStorage.getItem("token");
      axios
        .post("/api/post", {
          title: this.form.title,
          article: this.form.article,
          userId: sessionStorage.getItem("user_id")
        })
        .then(function(response) {
          if (response.data.code === 200) {
            temp.$message.success("发帖成功");
            temp.disabled = true;
          } else {
            temp.$message.error(response.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    indexMethod(index) {
      index++;
      return index;
    },
    selectPost() {
      let temp = this;
      axios
        .get("/api/base/post", {})
        .then(function(response) {
          if (response.data.code === 200) {
            temp.tableData = response.data.data;
          } else {
            temp.$message.error(response.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleClick(row) {
      this.$router.push({ path: "/post", query: { key: row.id } });
    }
  }
};
</script>

<style lang="scss">
#main {
  margin: auto;
  width: 70%;
}

.el-header {
  /*background-color: #b3c0d1;*/
  /*color: #333;*/
}

.el-main {
  text-align: center;
  height: 80vh;
}

#row {
  margin-top: 10px;
}
</style>
