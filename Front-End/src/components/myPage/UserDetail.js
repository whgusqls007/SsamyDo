import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  FontAwesome,
  Fontisto,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
// import styles from "../../../app.module.css";
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

  // console.log(user.studentNo[2])
  // console.log(campusName[Number(user.studentNo[2])-1])
  return (
    <View style={styles.userContainer}>

      <View style={styles.back}>
        {/* 이름 */}
        <View style={styles.nameContainer}>
          <Text style={styles.nametext}>
            {user.name}  👩🏻‍💻 
          </Text>
        </View>
        {/* 인적사항 */}
        <View style={styles.detailContainer}>
          <View style={styles.detailimg}>
            {/* 이미지파일 */}
            <Image
              style={styles.img}
              source={require("../../images/ssamy.png")}
            />
          </View>

          {/* 인적사항 */}
          <View style={styles.detail}>
            {/* 학번 */}
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                style={styles.detailText}
                name="school"
                size={20}
              />
              <Text style={styles.detailText}>{user.studentNo}</Text>
            </View>
            {/* 이메일 */}
            <View style={{ flexDirection: "row" }}>
              <Fontisto
                style={styles.detailText}
                name="email"
                size={20}
              />
              <Text style={styles.detailText}>{user.email}</Text>
            </View>
            {/* 기수 */}
            <View style={{ flexDirection: "row" }}>
              <FontAwesome
                style={styles.detailText}
                name="flag"
                size={20}
              />
              <Text style={styles.detailText}>
                {`SSAFY ${user.studentNo[1]}기`}
              </Text>
            </View>
            {/* 캠퍼스*/}
            <View style={{ flexDirection: "row" }}>
              <FontAwesome5
                style={styles.detailText}
                name="building"
                size={20}
              />
              <Text style={styles.detailText}>
                {campusName[Number(user.studentNo[2])-1]} 캠퍼스 소속
              </Text>
            </View>
            {/* 트랙 선택 */}
            <View style={{ flexDirection: "row" }}>
              <FontAwesome5
                style={styles.detailText}
                name="road"
                size={20}
              />
              <Text style={styles.detailText}>
                {trackName[user.track]}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    width: "95%",
    height: "60%",
    alignItems: "stretch",
  },
  back: {
    alignItems: "center",
    // borderWidth: 1,
    // marginBottom: "5%",
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#ededed"

  },
  nameContainer: {
    // marginTop: "1%",
    marginTop: 1,
    justifyContent: "center",
    // borderBottomWidth: 5,
    // borderWidth: 5,
    // borderBottomEndRadius: 100,
    borderColor: "#A8D1FF",
    marginBottom: "3%",
  },
  nametext: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 2,
    marginVertical: 10,
    color: "#000000"
    // marginBottom: 10,
  },
  detailContainer: {
    // flexShrink:1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // width: "100%",
    // height: "90%",
    flexWrap : "wrap"
  },
  detailimg:{
    // flexShrink: 5,
    width: "40%",
    height: "60%",
    // flexWrap: "wrap",
    // flexGrow: 1,
  },
  img: {
    position: "relative",
    width: '100%',
    height: '100%',
    overflow: 'visible',
    alignItems: 'center',
    // width: '100%',
    // height: undefined,
    // aspectRatio: 1,
  },
  detail: {
    // width: "50%",
    // height: "80%",
    marginLeft: "5%",
    flexDirection: "column",
    // marginBottom: "5%"

  },
  detailText: {
    marginVertical: "3%",
    marginHorizontal: "2%",
    color: "#555555"
  },
});
