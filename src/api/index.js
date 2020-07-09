/*
 *    Copyright (c) 2018-2025, Arron All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the pig4cloud.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: lengleng (wangiegie@gmail.com)
 */

import axios from "axios";

export function fetchPostList(query) {
  axios
      .request({
        url: "/protal/index",
        method: "get",
        params: query
      })
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
}

export function fetchKindList() {
  axios
      .request({
        url: '/protal/kindList',
        method: "get",
      })
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
}
