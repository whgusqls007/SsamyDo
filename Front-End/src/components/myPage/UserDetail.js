import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  FontAwesome,
  Fontisto,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import styles from "../../../app.module.css";
import axios from "axios";
import drf from "../../api/drf";

export default function UserDetail() {
  //기본 정보
  const user = useSelector((state) => {
    return state.Account[0];
  });

  // 기수, 캠퍼스, 트랙 명 변수
  const campusName = ["광주", "구미", "대전", "서울", "부울경"];
  const trackName = [
    "파이썬",
    "자바(비전공)",
    "자바(전공)",
    "임베디드",
    "모바일",
  ];
  return (
    <View style={UserDetailStyle.back}>
      {/* 이름 */}
      <View style={UserDetailStyle.nameContainer}>
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {user.name}
        </Text>
      </View>
      {/* 인적사항 */}
      <View style={UserDetailStyle.detailContainer}>
        {/* 이미지파일 */}
        <Image
          style={UserDetailStyle.img}
          source={require("../../images/그림1.png")}
        />
        {/* 인적사항 */}
        <View style={UserDetailStyle.detail}>
          {/* 학번 */}
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              style={UserDetailStyle.detailText}
              name="school"
              size={20}
            />
            <Text style={UserDetailStyle.detailText}>{user.studentNo}</Text>
          </View>
          {/* 이메일 */}
          <View style={{ flexDirection: "row" }}>
            <Fontisto
              style={UserDetailStyle.detailText}
              name="email"
              size={20}
            />
            <Text style={UserDetailStyle.detailText}>{user.email}</Text>
          </View>
          {/* 기수 */}
          <View style={{ flexDirection: "row" }}>
            <FontAwesome
              style={UserDetailStyle.detailText}
              name="flag"
              size={20}
            />
            <Text style={UserDetailStyle.detailText}>
              {`SSAFY ${user.studentNo[1]}기`}
            </Text>
          </View>
          {/* 캠퍼스*/}
          <View style={{ flexDirection: "row" }}>
            <FontAwesome5
              style={UserDetailStyle.detailText}
              name="building"
              size={20}
            />
            <Text style={UserDetailStyle.detailText}>
              {campusName[user.studentNo[2]]} 캠퍼스 소속
            </Text>
          </View>
          {/* 트랙 선택 */}
          <View style={{ flexDirection: "row" }}>
            <FontAwesome5
              style={UserDetailStyle.detailText}
              name="road"
              size={20}
            />
            <Text style={UserDetailStyle.detailText}>
              {trackName[user.track]}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const UserDetailStyle = StyleSheet.create({
  back: {
    width: "95%",
    height: "40%",
    borderWidth: 1,
    marginBottom: "5%",
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
    borderTopEndRadius: 5,
  },
  nameContainer: {
    marginTop: "3%",
    justifyContent: "center",
    borderBottomWidth: 5,
    borderBottomEndRadius: 100,
    borderColor: "#A8D1FF",
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "90%",
  },
  img: {
    width: "40%",
    height: "80%",
    marginLeft: "5%",
  },
  detail: {
    width: "50%",
    height: "80%",
    marginLeft: "5%",
  },
  detailText: {
    marginVertical: "3%",
    marginHorizontal: "2%",
  },
});
