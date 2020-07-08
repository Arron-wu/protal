<template>
  <el-container id="main">
    <el-header>
      <el-row type="flex" justify="space-around" align="middle">
        <el-col :span="8">{{ username }}</el-col>
        <el-col :span="16">{{ title }}</el-col>
      </el-row>
      <el-row>
        <el-input type="textarea" :rows="3" v-model="article" disabled />
      </el-row>
    </el-header>
    <el-main>
      <el-row type="flex" justify="start" align="middle">
        <el-col :span="2">
          <el-button type="primary" @click="addComment">评论 </el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" :index="indexMethod" />
        <el-table-column prop="username" label="评论人" width="180" />
        <el-table-column prop="content" label="内容" width="180" />
        <el-table-column prop="createTime" label="评论时间" />
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
            <el-form-item label="内容">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="form.content"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-button
              type="primary"
              size="medium"
              @click="submitComment"
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
      article: "",
      postId: "",
      kind: "",
      title: "",
      userId: "",
      username: "",
      tableData: [],
      drawer: false,
      disabled: false,
      form: {
        content: ""
      }
    };
  },
  mounted() {
    let key = this.$route.query.key;
    this.index(key);
  },
  methods: {
    index(key) {
      let temp = this;
      axios
        .get("/api/base/post/" + key, {})
        .then(function(response) {
          if (response.data.code === 200) {
            let data = response.data.data;
            temp.article = data.article;
            temp.postId = data.id;
            temp.kind = data.kind;
            temp.title = "标题: " + data.title;
            temp.username = "作者: " + data.username;
            temp.userId = data.userId;
            temp.selectComment();
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
    addComment() {
      this.form.content = "";
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
    submitComment() {
      let temp = this;
      axios.defaults.headers.common["token"] = sessionStorage.getItem("token");
      axios
        .post("/api/comment", {
          postId: temp.postId,
          userId: temp.userId,
          content: temp.form.content
        })
        .then(function(response) {
          if (response.data.code === 200) {
            temp.$message.success("评论成功");
            temp.disabled = true;
            temp.selectComment();
          } else {
            temp.$message.error(response.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    selectComment() {
      let temp = this;
      axios
        .get("/api/base/comment", {
          params: {
            postId: temp.postId
          }
        })
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
    }
  }
};
</script>

<style scoped>
#main {
  margin: auto;
  width: 70%;
}

.el-header {
  margin-top: 20px;
}

.el-main {
  margin-top: 40px;
  text-align: center;
  height: 80vh;
}
</style>
