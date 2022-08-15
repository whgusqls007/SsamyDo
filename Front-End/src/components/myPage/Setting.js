import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import styles from "../../../app.module.css";
import { useState } from "react";

export default function Alarm() {
  const dispatch = useDispatch();
  const typeList = useSelector((state) => {
    return state.Setting[0];
  });
  const [showBtn, setShowBtn] = useState(false);
  const [typeOne, setTypeOne] = useState(typeList[1]);
  const [typeTwo, setTypeTwo] = useState(typeList[2]);

  return (
    <View style={[styles.border, { height: 200, backgroundColor: "#E5F3F6" }]}>
      <Text>Setting.js</Text>
      <View style={{ flexDirection: "row" }}>
        <Text>스케쥴 타입 : </Text>
        {!showBtn ? (
          <Text>
            {typeList[0]} / {typeList[1]} / {typeList[2]}
          </Text>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <Text>{typeList[0]} / </Text>
            <TextInput
              maxLength={15}
              style={{ borderWidth: 1, width: 100 }}
              autoCapitalize="none"
              value={typeOne}
              onChangeText={(text) => {
                setTypeOne(text);
              }}
            />
            <Text> / </Text>
            <TextInput
              maxLength={15}
              style={{ borderWidth: 1, width: 100 }}
              autoCapitalize="none"
              value={typeTwo}
              onChangeText={(text) => {
                setTypeTwo(text);
              }}
            />
          </View>
        )}
      </View>
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
                type: "Setting/changeType",
                payload: [typeList[0], typeOne, typeTwo],
              });
              dispatch({ type: "Setting/save" });
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
              setTypeOne(typeList[1]);
              setTypeTwo(typeList[2]);
            }}
          >
            <Text>취소</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
