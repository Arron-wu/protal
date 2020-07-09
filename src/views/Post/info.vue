<template>
  <el-container id="main">
    <el-main>
      <div style="width: 100%;float: left;margin-bottom: 20px;">
        <div style="height:200px;float: left;width:11%;">
          <img style="width: 70px;height: 50px;" src="https://wx4.sinaimg.cn/thumb180/a6a3f863gy1ggjooco9tjj20u00u0qv6.jpg" >
        </div>
        <div style="float: left;width: 80%;">
          <ul class="ugo">
            <li style="display:block;font-size: 18px;padding-left: 10px;"><strong>Arron</strong></li>
            <li style="margin-left: 10px;font-size: 16px;padding-top:2px;color: slategray;">今天 14:20 来自iphoneX最新版 已编辑</li>
            <li style="margin-left: 10px;font-size: 16px;padding-top:2px;">可申报卡不卡不擦接口生成把库就考呗上传框架撒不吃亏，才AV救护车是爸爸，才按计划从是哈是差阔睡虫把数据库</li>
            <li style="margin-left: 10px;font-size: 16px;padding-top:10px;">
              <img style="width: 100%;height: 200px;" src="https://wx4.sinaimg.cn/thumb180/a6a3f863gy1ggjooco9tjj20u00u0qv6.jpg" >
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
        <div style="width: 100%;clear: both;margin-bottom: 20px;">
            <div style="height:70px;float: left;width:5%;">
              <img style="width: 30px;height: 30px;padding-left: 6px;" src="https://wx4.sinaimg.cn/thumb180/a6a3f863gy1ggjooco9tjj20u00u0qv6.jpg" >
            </div>
            <div style="float: left;width: 95%;">
              <ul class="ugo">
                <li style="display:block;font-size: 12px;padding-left: 10px;"><strong>Arron</strong></li>
                <li style="margin-left: 10px;font-size: 12px;padding-top:2px;color: slategray;">今天 14:20 来自iphoneX最新版 已编辑</li>
                <li style="margin-left: 10px;font-size: 16px;padding-top:2px;">非常的好，很nice！本版块发开发变身卡浪费包括包括拉风备尝艰苦深V垃圾吧</li>
              </ul>
            </div>
         </div>
        <div style="width: 100%;clear: both;margin-bottom: 20px;">
          <div style="height:70px;float: left;width:5%;">
            <img style="width: 30px;height: 30px;padding-left: 6px;" src="https://wx4.sinaimg.cn/thumb180/a6a3f863gy1ggjooco9tjj20u00u0qv6.jpg" >
          </div>
          <div style="float: left;width: 80%;">
            <ul class="ugo">
              <li style="display:block;font-size: 12px;padding-left: 10px;"><strong>Arron</strong></li>
              <li style="margin-left: 10px;font-size: 12px;padding-top:2px;color: slategray;">今天 14:20 来自iphoneX最新版 已编辑</li>
              <li style="margin-left: 10px;font-size: 16px;padding-top:2px;">非常的好，很nice！</li>
            </ul>
          </div>
        </div>
        <div style="width: 100%;clear: both;margin-bottom: 20px;">
          <div style="height:70px;float: left;width:5%;">
            <img style="width: 30px;height: 30px;padding-left: 6px;" src="https://wx4.sinaimg.cn/thumb180/a6a3f863gy1ggjooco9tjj20u00u0qv6.jpg" >
          </div>
          <div style="float: left;width: 80%;">
            <ul class="ugo">
              <li style="display:block;font-size: 12px;padding-left: 10px;"><strong>Arron</strong></li>
              <li style="margin-left: 10px;font-size: 12px;padding-top:2px;color: slategray;">今天 14:20 来自iphoneX最新版 已编辑</li>
              <li style="margin-left: 10px;font-size: 16px;padding-top:2px;">非常的好，很nice！</li>
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
          imgUrl:'',
          title:'',
          avatar:'',
          userName:'',
          time:'',
          article:''
        },
        remarkList:[{
          id:'',
          avatar:'',
          userName:'',
          time:'',
          content:''
        }],
        remark:''
      };
    },
    mounted() {
      let id = this.$route.query.id;
      this.post.id = id;
      this.index(id);
    },
    methods: {
      index(id) {
        let temp = this;
        axios
                .get("/api/post/selectPostById/" + id, {})
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
        let name = sessionStorage.getItem("username");
        if (name == null) {
          this.$router.push({ path: "/login" });
        };
        axios
                .post("/api/comment", {
                  postId: this.post.id,
                  content: this.remark
                })
                .then(function(response) {
                  if (response.data.code === 200) {
                    this.$message.success("评论成功");
                    this.index(this.post.id)
                  } else {
                    this.$message.error(response.data.msg);
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
