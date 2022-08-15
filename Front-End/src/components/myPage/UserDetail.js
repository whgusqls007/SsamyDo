import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import styles from "../../../app.module.css";
import axios from "axios";
import drf from "../../api/drf";

export default function UserDetail() {
  // 함께 첨부할 토큰
  const token = useSelector((state) => {
    return state.Account[2];
  });
  const dispatch = useDispatch();
  //기본 정보
  const user = useSelector((state) => {
    return state.Account[0];
  });

  const [showTrackBtn, setshowTrackBtn] = useState(false);
  // 기수, 캠퍼스, 트랙 명 변수
  const campusName = ["광주", "구미", "대전", "서울", "부울경"];
  const trackName = [
    "파이썬",
    "자바\n(비전공)",
    "자바\n(전공)",
    "임베디드",
    "모바일",
  ];
  const inputTrackName = ["Python", "Javab", "Java", "Embeded", "Mobile"];
  // 트랙만 변경
  const [track, setTrack] = useState(user.track);

  return (
    <View style={UserDetailStyle.back}>
      <Text>MyPage</Text>
      <View style={UserDetailStyle.container}>
        <View>
          {/* 사용자명 */}
          <View style={UserDetailStyle.inputContainer}>
            <Text style={UserDetailStyle.inputLabel}>{user.name}</Text>
          </View>
          {/* 기수 */}
          <View style={UserDetailStyle.inputContainer}>
            <Text style={UserDetailStyle.inputLabel}>
              {`${user.studentNo[1]}기`}{" "}
            </Text>
          </View>
          {/* 캠퍼스*/}
          <View style={UserDetailStyle.inputContainer}>
            <Text style={UserDetailStyle.inputLabel}>
              {campusName[user.studentNo[2]]} 소속
            </Text>
          </View>
          {/* 이메일 */}
          <View style={UserDetailStyle.inputContainer}>
            <Text style={UserDetailStyle.inputLabel}>{user.email}</Text>
          </View>
          {/* 트랙 선택 */}
          <View style={{ flexDirection: "row", padding: 5 }}>
            <Text>소속 트랙 </Text>
            {!showTrackBtn && <Text>{trackName[track]} </Text>}
          </View>
          {showTrackBtn && (
            <View style={{ flexDirection: "row" }}>
              {trackName.map((tra, idx) => {
                return (
                  <TouchableOpacity
                    key={`tra-${idx}`}
                    style={[
                      UserDetailStyle.btn,
                      idx === track ? { backgroundColor: "pink" } : {},
                    ]}
                    onPress={() => setTrack(idx)}
                  >
                    <Text style={{ textAlign: "center" }}>{tra}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
        {/* 수정 활성화 버튼 */}
        {!showTrackBtn && (
          <TouchableOpacity
            style={{ marginLeft: 300, flexDirection: "row" }}
            onPress={() => {
              setshowTrackBtn(!showTrackBtn);
            }}
          >
            <FontAwesome name="pencil-square-o" size={24} color="black" />
            <Text>트랙 변경</Text>
          </TouchableOpacity>
        )}
        {/* 수정 버튼과 취소버튼 */}
        {showTrackBtn && (
          <View style={{ marginLeft: 250, flexDirection: "row" }}>
            {/* 수정버튼 */}
            <TouchableOpacity
              style={[styles.button, { margin: 3 }]}
              onPress={() => {
                const credentials = {
                  gi: Number(user.studentNo[1]),
                  trackName: inputTrackName[track],
                };
                console.log(credentials);
                console.log(drf.user.track());
                console.log(token);
                axios({
                  method: "post",
                  url: drf.user.track(),
                  body: credentials,
                  headers: token,
                  // 요청이 성공 한다면
                })
                  .then((res) => {
                    console.log(res);
                    dispatch({
                      type: "Account/update",
                      payload: { track: track },
                    });
                    dispatch({ type: "Account/save" });
                    setshowTrackBtn(!showTrackBtn);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              <Text>변경</Text>
            </TouchableOpacity>
            {/* 취소버튼 */}
            <TouchableOpacity
              style={[styles.button, { margin: 3 }]}
              onPress={() => {
                setshowTrackBtn(!showTrackBtn);
                // 기존 입력 값들을 원래대로 취소 후 다시 할 때 미입력분이 이전것으로 입력되는 것 방지
                setTrack(user.track);
              }}
            >
              <Text>취소</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const UserDetailStyle = StyleSheet.create({
  back: {
    alignContent: "center",
    margin: 10,
    backgroundColor: "#A8D1FF",
    width: "95%",
    height: "26%",
    borderRadius: 2,
  },
  container: {
    alignContent: "center",
    borderRadius: 2,
    height: "100%",
    backgroundColor: "#E5F3F6",
  },

  content: {
    height: "auto",
    backgroundColor: "#E5F3F6",
    flexDirection: "row",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputLabel: {
    flex: 2,
    margin: 5,
  },

  input: { flexDirection: "row", margin: 5, height: 35, flex: 6 },

  btn: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    marginHorizontal: 5,
    backgroundColor: "#EDEDED",
    borderRadius: 5,
    height: "auto",
    width: "auto",
    flex: 1,
    justifyContent: "center",
  },
});
