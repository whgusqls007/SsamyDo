import { React, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import axios from "axios";

export default function LunchMenu() {
  const [lunchData, setLunchData] = useState();
  function ymdFormat(oriDate) {
    let result =
      oriDate.getFullYear().toString() +
      (oriDate.getMonth() + 1).toString().padStart(2, "0") +
      oriDate.getDate().toString().padStart(2, "0");
    return result;
  }
  // axios를 통해서 이번 주 점심 받아오기
  const baseURL = "http://i7e204.p.ssafy.io:8080/api/lunch/date/";
  useEffect(() => {
    async function fetchData() {
      const lunchData = await axios.get(`${baseURL}20220816`);
      // const lunchData = await axios.get(`${baseURL}${ymdFormat(new Date())}`);
      return lunchData.data;
    }
    fetchData().then((res) => {
      console.log("Lunch Axios 요청 성공!");
      setLunchData(res);
    });
    fetchData().catch((err) => {
      console.log(err.response);
    });
  }, []);

  return (
    <View>
      {lunchData && (
        <View>
          {lunchData.data.map((item) => (
            <View key={item.id}>
              <Image source={{ uri: `"${item.img}"` }} />
              <View>
                <Text>{item.store}</Text>
                <Text>{item.main}</Text>
                <Text>{item.detail}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
