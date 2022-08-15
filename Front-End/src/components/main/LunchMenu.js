import { React, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";

export default function LunchMenu() {
  function ymdFormat(oriDate) {
    let result =
      oriDate.getFullYear().toString() +
      (oriDate.getMonth() + 1).toString().padStart(2, "0") +
      oriDate.getDate().toString().padStart(2, "0");
    return result;
  }
  // axios를 통해서 이번 주 점심 받아오기
  const baseURL = "http://i7e204.p.ssafy.io:8080/api/plan/weekly/period/";

  // axios({
  //   method: "get",
  //   url: `${baseURL}${ymdFormat(new Date())}`,
  // })
  //   .then((response) => {
  //     console.log("Weekly Axios 요청 성공!");
  //     return response.data.data;
  //   })
  //   .catch((error) => {
  //     console.log(error.response);
  //   });

  //

  return (
    <View>
      <Text>오늘 점심이 궁금해?!</Text>
    </View>
  );
}
