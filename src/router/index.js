import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/index",
    name: "Index",
    component: function() {
      return import("../views/index/Index.vue");
    }
  },
  {
    path: "/postInfo",
    name: "Info",
    component: function() {
      return import("../views/Post/info.vue");
    }
  },
  {
    path: "/login",
    name: "Login",
    component: function() {
      return import("../views/Login/Index.vue");
    }
  },
  {
    path: "/register",
    name: "Register",
    component: function() {
      return import("../views/Register/Index.vue");
    }
  },
  {
    path: "/post",
    name: "Post",
    component: function() {
      return import("../views/Post/Index.vue");
    }
  },
  {
    path: "/Console",
    name: "Console",
    component: function() {
      return import("../layout/Index.vue");
    },
    children: [
      {
        path: "/Console",
        name: "Console",
        component: function() {
          return import("../views/Console/Index.vue");
        }
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: "history" //去除#号
});

export default router;
