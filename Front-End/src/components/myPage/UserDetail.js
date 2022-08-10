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
    return state.Setting[0];
  });
  const [showBtn, setShowBtn] = useState(false);
  // 기수, 캠퍼스, 트랙 명 변수
  const numberName = ["1기", "2기", "3기", "4기", "5기", "6기", "7기", "8기"];
  const campusName = ["부울경", "서울", "대전", "구미", "광주"];
  const trackName = [
    "파이썬",
    "자바(비전공)",
    "자바(전공)",
    "임베디드",
    "모바일",
  ];

  // input에 넣어질 값들
  const [name, setName] = useState(user.name);
  const [number, setNumber] = useState(user.number);
  const [campus, setCampus] = useState(user.campus);
  const [track, setTrack] = useState(user.track);

  return (
    <View>
      <Text>{user.name}님의 페이지</Text>
      <View
        style={[styles.border, { height: 250, backgroundColor: "#E5F3F6" }]}
      >
        <View>
          <View style={{ flexDirection: "row", padding: 5 }}>
            <Text>유저명: </Text>
            {!showBtn && <Text>{user.name}</Text>}
            {showBtn && (
              <TextInput
                placeholder={user.name}
                onChangeText={(text) => {
                  setName(text);
                }}
              />
            )}
          </View>
          <View style={{ flexDirection: "row", padding: 5 }}>
            <Text>기수: </Text>
            {!showBtn && <Text>{user.number} </Text>}
            {showBtn && (
              <View style={{ flexDirection: "row" }}>
                {numberName.map((num, idx) => {
                  return (
                    <TouchableOpacity
                      key={`num-${idx}`}
                      style={[
                        styles.button,
                        { margin: 1 },
                        num === number ? { backgroundColor: "pink" } : {},
                      ]}
                      onPress={() => setNumber(num)}
                    >
                      <Text>{num}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
          {/* 캠퍼스 선택 */}
          <View style={{ flexDirection: "row", padding: 5 }}>
            <Text>소속 캠퍼스: </Text>
            {!showBtn && <Text>{user.campus} </Text>}
            {showBtn && (
              <View style={{ flexDirection: "row" }}>
                {campusName.map((cam, idx) => {
                  return (
                    <TouchableOpacity
                      key={`cam-${idx}`}
                      style={[
                        styles.button,
                        { margin: 1 },
                        cam === campus ? { backgroundColor: "pink" } : {},
                      ]}
                      onPress={() => setCampus(cam)}
                    >
                      <Text>{cam}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
          {/* 트랙 선택 */}
          <View style={{ flexDirection: "row", padding: 5 }}>
            <Text>소속 트랙: </Text>
            {!showBtn && <Text>{user.track} </Text>}
            {showBtn && (
              <View style={{ flexDirection: "row" }}>
                {trackName.map((tra, idx) => {
                  return (
                    <TouchableOpacity
                      key={`tra-${idx}`}
                      style={[
                        styles.button,
                        { margin: 1 },
                        tra === track ? { backgroundColor: "pink" } : {},
                      ]}
                      onPress={() => setTrack(tra)}
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
            style={{ marginLeft: 300 }}
            onPress={() => {
              setShowBtn(!showBtn);
            }}
          >
            <FontAwesome name="pencil-square-o" size={24} color="black" />
            <Text>수정</Text>
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
                  type: "Setting/update",
                  payload: {
                    name: name,
                    number: number,
                    campus: campus,
                    track: track,
                  },
                });
                setShowBtn(!showBtn);
              }}
            >
              <Text>수정</Text>
            </TouchableOpacity>
            {/* 취소버튼 */}
            <TouchableOpacity
              style={[styles.button, { margin: 3 }]}
              onPress={() => {
                setShowBtn(!showBtn);
                // 기존 입력 값들을 원래대로 취소 후 다시 할 때 미입력분이 이전것으로 입력되는 것 방지
                setName(user.name);
                setNumber(user.number);
                setCampus(user.campus);
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
