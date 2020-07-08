/*请求验证码*/
/*登录*/
import axios from "axios";

function login() {
  axios
    .request({
      url: "/student",
      method: "post",
      data: {
        name: "albert"
      }
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
}
