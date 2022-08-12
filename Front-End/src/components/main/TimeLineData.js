import React from "react";
import { View } from "react-native";
import axios from "axios";

export default function TimeLineData() {
  // axios를 통해서 이번 주 스케쥴 받아오기
  const baseURL = "http://i7e204.p.ssafy.io:8080/api/plan/weekly/period/";

  axios({
    method: "get",
    url: `${baseURL}${ymdFormat(findMonday())}`,
  })
    .then((response) => {
      console.log("Weekly Axios 요청 성공!");
      return response.data.data;
    })
    .catch((error) => {
      console.log(error.response);
    });
}
