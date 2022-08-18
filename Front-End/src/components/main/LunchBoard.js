import { React, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
// axios 요청을 위한 drf
import drf from "../../api/drf";

export default function LunchBoard({ navigation }) {
  const [lunchData, setLunchData] = useState();
  // 토큰
  const token = useSelector((state) => {
    return state.Account[2];
  });

  function ymdFormat(oriDate) {
    let result =
      oriDate.getFullYear().toString() +
      (oriDate.getMonth() + 1).toString().padStart(2, "0") +
      oriDate.getDate().toString().padStart(2, "0");
    return result;
  }
  // axios를 통해서 이번 주 점심 받아오기
  useEffect(() => {
    async function fetchData() {
      const response = await axios({
        method: "get",
        url: drf.lunch.date(ymdFormat(new Date())),
        headers: token,
      }).catch(() => {
        navigation.navigete("Verification");
      });
      return response.data.data;
    }
    fetchData().then((res) => {
      setLunchData(res);
    });
    fetchData().catch((err) => {
      console.log("Lunch Axios 실패");
    });
  }, []);

  return (
    <ScrollView>
      {lunchData &&
        lunchData.map((item) => (
          <View key={item.id} style={lunchStyles.menuContainer}>
            <View style={lunchStyles.menuHeader}>
              <Image source={{ uri: item.img }} style={lunchStyles.menuImg} />
              <View style={lunchStyles.menuTitle}>
                <TouchableOpacity style={lunchStyles.storeBox}>
                  <Text style={lunchStyles.storeText}>{item.store}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={lunchStyles.menuText}>
                    {item.main.replace("&", "\n& ")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={lunchStyles.detailBox}>
              <Text>{item.detail}</Text>
            </View>
          </View>
        ))}
    </ScrollView>
  );
}

const lunchStyles = StyleSheet.create({
  // 각 메뉴별 컨테이너
  menuContainer: {
    flex: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ededed",
    shadowColor: "#888888",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
    backgroundColor: "#ffffff",
  },
  // 메뉴 헤더: 이미지 + 식당명 + 메뉴명
  menuHeader: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: 100,
    marginBottom: "2%",
  },
  menuImg: {
    flex: 1,
    borderRadius: 5,
    height: 100,
  },
  menuTitle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  menuText: {
    padding: "2%",
    margin: "5%",
    textAlign: "center",
    fontWeight: "bold",
  },
  storeBox: {
    padding: "2%",
    marginLeft: "5%",
    borderRadius: 5,
    width: 65,
    backgroundColor: "#ededed",
  },
  storeText: {
    textAlign: "center",
  },
});
