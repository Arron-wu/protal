<template>
  <el-container id="main">
    <el-main>
      <div style="width: 100%;float: left;margin-bottom: 20px;">
        <div style="height:200px;float: left;width:11%;">
          <img style="width: 70px;height: 50px;" :src="post.avatar" >
        </div>
        <div style="float: left;width: 80%;">
          <ul class="ugo">
            <li style="display:block;font-size: 18px;padding-left: 10px;"><strong>{{post.username}}</strong></li>
            <li style="margin-left: 10px;font-size: 16px;padding-top:2px;color: slategray;">{{post.createTime}} 来自iphoneX最新版 已编辑</li>
            <li style="margin-left: 10px;font-size: 16px;padding-top:2px;">{{post.article}}</li>
            <li style="margin-left: 10px;font-size: 16px;padding-top:10px;">
              <img style="width: 100%;height: 200px;" :src="imgUrl" >
            </li>
          </ul>
        </div>
      </div>
      <div style="width: 100%;clear: both;">
        <el-divider></el-divider>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-input v-model="remark"  placeholder="你的评价"></el-input>
          </el-col>
          <el-col :span="8">
            <el-button
                    size="medium"
                    @click="remarkPost">评价
            </el-button>
          </el-col>
        </el-row>
      </div>
      <div style="width: 100%;clear: both;">
        <el-divider></el-divider>
        <div style="width: 100%;clear: both;margin-bottom: 20px;" v-for="r in remarkList" v-bind:key="r">
            <div style="height:70px;float: left;width:5%;">
              <img style="width: 30px;height: 30px;padding-left: 6px;" :src="r.avatar" >
            </div>
            <div style="float: left;width: 95%;">
              <ul class="ugo">
                <li style="display:block;font-size: 12px;padding-left: 10px;"><strong>{{r.username}}</strong></li>
                <li style="margin-left: 10px;font-size: 12px;padding-top:2px;color: slategray;">{{r.createTime}} 来自iphoneX最新版 已编辑</li>
                <li style="margin-left: 10px;font-size: 16px;padding-top:2px;">{{r.content}}</li>
              </ul>
            </div>
         </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import axios from "axios";

  export default {
    name: "Info",
    data() {
      return {
        post : {
          id:'',
          title:'',
          avatar:'',
          username:'',
          createTime:'',
          article:''
        },
        remarkList:[{
          id:'',
          avatar:'',
          username:'',
          createTime:'',
          content:''
        }],
        remark:'',
        imgUrl:'',
      };
    },
    mounted() {
      let id = this.$route.query.id;
      this.imgUrl = this.$route.query.imgUrl;
      this.post.id = id;
      this.index(id);
    },
    methods: {
      index(id) {
        let temp = this;
        axios
                .get("/api/protal/selectPostById/" + id, {})
                .then(function(response) {
                  if (response.data.code === 200) {
                    let data = response.data.data;
                    temp.post = data.post;
                    temp.remarkList = data.remarkList;
                  } else {
                    temp.$message.error(response.data.msg);
                  }
                })
                .catch(function(error) {
                  console.log(error);
                });
      },
      remarkPost() {
        //获取用户名
        let temp = this;
        let name = sessionStorage.getItem("username");
        if (name == null) {
          this.$router.push({ path: "/login" });
        };
        axios.defaults.headers.common["token"] = sessionStorage.getItem("token");
        axios
                .post("/api/comment", {
                  postId: this.post.id,
                  content: this.remark,
                  userId: sessionStorage.getItem("user_id")
                })
                .then(function(response) {
                  if (response.data.code === 200) {
                    temp.$message.success("评论成功");
                    temp.index(this.post.id);
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
    width: 30%;
  }
  .el-main {
    margin-top: 40px;
    text-align: center;
    height: 80vh;
  }

  .ugo{
    list-style-type:none;
    margin:0;
    padding: 0;
    text-align: left;
  }
</style>
