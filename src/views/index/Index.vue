<template>
<el-container id="container">
  <el-header>
    <el-row id="row" type="flex" justify="start" align="middle" :gutter="18">
      <el-col :span="16">
        <el-input placeholder="2020高考结束" />
      </el-col>
      <el-col :span="2">
        <el-button icon="el-icon-search" circle />
      </el-col>
      <el-col :span="2">
        <el-button  @click="doIndex">首页</el-button>
      </el-col>
      <template v-if="userName != '未登录'">
      <el-col :span="2">
        {{ username }}
      </el-col>
      </template>
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
        <el-col :span="2">
          <el-button
                  size="medium"
                  @click="toLogin"
                  v-show="!online">登录
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button
                  size="medium"
                  @click="doRegister"
                  v-show="!online">注册
          </el-button>
        </el-col>
    </el-row>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <ul id="go">
        <li><a href="url" id="1" @click.prevent="changData(1)" class="selected">旅游</a></li>
        <li><a href="url" id="2" @click.prevent="changData(2)">美食</a></li>
        <li><a href="url" id="3" @click.prevent="changData(3)">娱乐</a></li>
        <li><a href="url" id="4" @click.prevent="changData(4)">音乐</a></li>
        <li><a href="url" id="5" @click.prevent="changData(5)" >影视</a></li>
        <li><a href="url" id="6" @click.prevent="changData(6)" >搞笑</a></li>
        <li><a href="url" id="7" @click.prevent="changData(7)" >舞蹈</a></li>
        <li><a href="url" id="8" @click.prevent="changData(8)" >美妆</a></li>
        <li><a href="url" id="9" @click.prevent="changData(9)" >动漫</a></li>
        <li><a href="url" id="10" @click.prevent="changData(10)" >体育</a></li>
      </ul>
    </el-aside>
    <el-main> 
      <div>
          <div v-for="post in postList" v-bind:key="post" class="postDiv" @click="doGetPost(post.id,post.imgUrl)">
            <img style="width: 320px;height: 220px;" :src="post.imgUrl" >
            <p style="width: 100%;height: 45px;padding: 0;margin: 0;">{{post.title}}</p>
            <div style="width: 100%;height: 40px;">
              <img style="width: 40px;height: 40px;margin-left: 5px;float: left;" :src="post.avatar" >
              <div style="float: left;">
                <ul class="ugo">
                  <li style="display:block;">{{post.username}}</li>
                  <li style="margin-left: 10px;">{{post.createTime}}</li>
                </ul>
              </div>
            </div>
          </div>
      </div>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
  import axios from "axios";
export default {
  name: "Index",
  data() {
    return {
      postList : [{
        id:'',
        imgUrl:'',
        title:'',
        avatar:'',
        username:'',
        createTime:''
      }],
      kindList:[{
        id:'',
        name:''
      }],
      userName:"未登录"
    };
  },
  mounted() {
    //获取用户名
    let key = sessionStorage.getItem("username");
    if (key !== null) {
      this.username = "用户名: " + key;
      this.online = true;
    }
    //加载种类
    this.fetchKindList();
    //加载帖子
    this.fetchPostList(1);
  },
  methods: {
    //获取帖子
    fetchPostList(key) {
      let temp = this;
      axios.defaults.headers.common["token"] = sessionStorage.getItem("token");
      axios
              .get("/api/protal/index/"+ key, {})
              .then(function(response) {
                if (response.data.code === 200) {
                  temp.postList = response.data.data;
                } else {
                  temp.$message.error(response.data.msg);
                }
              })
              .catch(function(error) {
                console.log(error);
              });
    },
    //获取种类
    fetchKindList() {
      let temp = this;
      axios.defaults.headers.common["token"] = sessionStorage.getItem("token");
      axios
              .get("/api/protal/kindList", {})
              .then(function(response) {
                if (response.data.code === 200) {
                  temp.kindList = response.data.data;
                } else {
                  temp.$message.error(response.data.msg);
                }
              })
              .catch(function(error) {
                console.log(error);
              });
    },
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
    //注册
    doRegister() {
      this.$router.push({ path: "/register" });
    },
    //切换
    changData(e) {
      console.log(e);
      this.fetchPostList(e);
      document.getElementsByClassName('selected')[0].classList.remove('selected');
      document.getElementById(e).classList.add('selected');
    },
    //查看详情
    doGetPost(id,imgUrl) {
      this.$router.push({ path: "/postInfo", query: { id: id ,imgUrl: imgUrl} });
    }
  }
};
</script>

<style lang="scss">
#container {
  margin: auto;
  width: 60%;
}

#go{
  float: right;
  list-style-type:none;
  margin-right:40px;
  padding:0;
}

.ugo{
  list-style-type:none;
  margin:0;
  padding:0;
  font-size: 12px;
}

a{
  display:block;
  font-size: 22px;
  background-color:white;
  color:black;
  width:80px;
  text-align:center;
  padding:10px;
  text-decoration:none;
}

a:hover,a:active{
  background-color:deepskyblue;
}

.postDiv{
  float: left;
  width:320px;
  height: 320px;
  margin: 10px;
}

.el-header {
  /*background-color: #b3c0d1;*/
  /*color: #333;*/
}

.el-main {
  text-align: center;
  height: 80vh;
}

.el-aside{
}

#row {
  margin-top: 10px;
}
  .selected{
    background-color:deepskyblue;
  }
</style>
