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
        <li><a href="url" @click.prevent="changData(1)" class="selected">旅游</a></li>
        <li><a href="url" @click.prevent="changData(2)">美食</a></li>
        <li><a href="url" @click.prevent="changData(3)">娱乐</a></li>
        <li><a href="url" @click.prevent="changData(4)">音乐</a></li>
        <li><a href="url" @click.prevent="changData(5)" >影视</a></li>
        <li><a href="url" @click.prevent="changData(6)" >搞笑</a></li>
        <li><a href="url" @click.prevent="changData(7)" >舞蹈</a></li>
        <li><a href="url" @click.prevent="changData(8)" >美妆</a></li>
        <li><a href="url" @click.prevent="changData(9)" >动漫</a></li>
        <li><a href="url" @click.prevent="changData(10)" >体育</a></li>
      </ul>
    </el-aside>
    <el-main> 
      <div>
        <div class="postDiv" @click="doGetPost(1)">
        <img style="width: 320px;height: 220px;" src="https://wx4.sinaimg.cn/thumb180/a6a3f863gy1ggjooco9tjj20u00u0qv6.jpg" >
        <p style="width: 100%;height: 45px;padding: 0;margin: 0;">报错说备课大师VB科技的SVN尽可能的数据库那几款发发发发发发发哥哥</p>
        <div style="width: 100%;height: 40px;">
          <img style="width: 40px;height: 40px;margin-left: 5px;float: left;" src="https://wx4.sinaimg.cn/thumb180/a6a3f863gy1ggjooco9tjj20u00u0qv6.jpg" >
          <div style="float: left;">
            <ul class="ugo">
              <li style="display:block;">Arron</li>
              <li style="margin-left: 10px;">今天 14:20</li>
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
        imgUrl:'',
        title:'',
        avatar:'',
        userName:'',
        time:''
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
    //获取参数
    let id = this.$route.query.key;
    //加载种类
    this.fetchKindList();
    //加载帖子
    this.fetchPostList(id);
    if (id != null){
      document.getElementsByClassName ('selected')[0].classList.remove('selected');
      document.getElementById(id).classList.add('selected');
    }
  },
  methods: {
    //获取帖子
    fetchPostList(key) {
      axios
              .get("/api/protal/index"+ key, {})
              .then(function(response) {
                if (response.data.code === 200) {
                  this.postList = response.data.data;
                } else {
                  this.$message.error(response.data.msg);
                }
              })
              .catch(function(error) {
                console.log(error);
              });
    },
    //获取种类
    fetchKindList() {
      axios
              .get("/api/protal/kindList", {})
              .then(function(response) {
                if (response.data.code === 200) {
                  this.kindList = response.data.data;
                } else {
                  this.$message.error(response.data.msg);
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
      alert(e)
      this.$router.push({ path: "/index", query: { key: e } });
    },
    //查看详情
    doGetPost(id) {
      this.$router.push({ path: "/postInfo", query: { id: id } });
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
