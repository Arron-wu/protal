// vue.config.js
module.exports = {
  devServer: {
    open: false, //浏览器自动打开页面
    host: "0.0.0.0", //如果是真机测试，就使用这个IP
    port: 9091,
    https: false,
    hotOnly: false, //热更新（webpack已实现了，这里false即可）
    proxy: {
      //配置跨域
      "/api": {
        target: "http://127.0.0.1:8080/api",
        ws: true,
        changOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
