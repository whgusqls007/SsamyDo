import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import styles from "../../../app.module.css";
import { TextInput } from "react-native-gesture-handler";

export default function UserDetail() {
  const dispatch = useDispatch();
  //기본 정보
  const user = useSelector((state) => {
    return state.Account[0];
  });
  const [showBtn, setShowBtn] = useState(false);
  // 기수, 캠퍼스, 트랙 명 변수
  const campusName = ["광주", "구미", "대전", "서울", "부울경"];
  const trackName = [
    "파이썬",
    "자바(비전공)",
    "자바(전공)",
    "임베디드",
    "모바일",
  ];

  // 트랙만 변경
  const [track, setTrack] = useState(user.track);

  return (
    <View>
      <Text>{user.name}님의 페이지</Text>
      <View
        style={[styles.border, { height: 250, backgroundColor: "#E5F3F6" }]}
      >
        <View>
          <View style={{ flexDirection: "row", padding: 5 }}>
            <Text>이름: </Text>
            <Text>{user.name}</Text>
          </View>
          <View style={{ flexDirection: "row", padding: 5 }}>
            <Text>기수: </Text>
            <Text>{`${user.studentNo[1]}기`} </Text>
          </View>
          {/* 캠퍼스 선택 */}
          <View style={{ flexDirection: "row", padding: 5 }}>
            <Text>소속 캠퍼스: </Text>
            <Text>{campusName[user.studentNo[2]]}</Text>
          </View>
          {/* 트랙 선택 */}
          <View style={{ flexDirection: "row", padding: 5 }}>
            <Text>소속 트랙: </Text>
            {!showBtn && <Text>{trackName[track]} </Text>}
            {showBtn && (
              <View style={{ flexDirection: "row" }}>
                {trackName.map((tra, idx) => {
                  return (
                    <TouchableOpacity
                      key={`tra-${idx}`}
                      style={[
                        styles.button,
                        { margin: 1 },
                        idx === track ? { backgroundColor: "pink" } : {},
                      ]}
                      onPress={() => setTrack(idx)}
                    >
                      <Text>{tra}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        </View>
        {/* 수정 활성화 버튼 */}
        {!showBtn && (
          <TouchableOpacity
            style={{ marginLeft: 300, flexDirection: "row" }}
            onPress={() => {
              setShowBtn(!showBtn);
            }}
          >
            <FontAwesome name="pencil-square-o" size={24} color="black" />
            <Text>트랙 변경</Text>
          </TouchableOpacity>
        )}
        {/* 수정 버튼과 취소버튼 */}
        {showBtn && (
          <View style={{ marginLeft: 300, flexDirection: "row" }}>
            {/* 수정버튼 */}
            <TouchableOpacity
              style={[styles.button, { margin: 3 }]}
              onPress={() => {
                dispatch({
                  type: "Account/update",
                  payload: {
                    track: track,
                  },
                });
                setShowBtn(!showBtn);
              }}
            >
              <Text>변경</Text>
            </TouchableOpacity>
            {/* 취소버튼 */}
            <TouchableOpacity
              style={[styles.button, { margin: 3 }]}
              onPress={() => {
                setShowBtn(!showBtn);
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
