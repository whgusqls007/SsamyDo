import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../../app.module.css";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function Aggrement({ navigation }) {
  // 약관 동의 및 다음 버튼 활성화 변수
  const [aggrement, setAggrement] = useState(false);
  // 에러메시지
  const [inputError, setInputError] = useState(false);
  return (
    <View>
      <Text>개인정보 이용 동의서</Text>
      {/* 개인정보 이용동의서 내용 */}
      <View
        style={{ width: 400, height: 500, backgroundColor: "#E5F3F6" }}
      ></View>
      <View>
        {/* 약관 동의 */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: 5,
          }}
          onPress={() => {
            setAggrement(!aggrement);
            setInputError();
          }}
        >
          {!aggrement && <FontAwesome name="square-o" size={24} color="blue" />}
          {aggrement && (
            <FontAwesome name="check-square-o" size={24} color="blue" />
          )}
          <Text> 상기 이용 동의서의 내용을 이해했으며동의합니다.</Text>
        </TouchableOpacity>
      </View>
      {/* 다음(MM, EduSSAFY 인증 단계) 버튼 */}
      {inputError && (
        <View style={{ flexDirection: "row", margin: 4 }}>
          <Ionicons name="warning" size={19} color="red" />
          <Text style={{ fontWeight: "bold", color: "red" }}>{inputError}</Text>
        </View>
      )}
      <TouchableOpacity
        style={[styles.button, { width: 50, marginLeft: 350 }]}
        onPress={() => {
          if (aggrement) {
            navigation.navigate("Verification");
          } else {
            // alert 형식 변경 필요할듯
            setInputError("계정 인증을 위해선 약관 확인 후 동의가 필요합니다.");
          }
        }}
      >
        <Text>다음</Text>
      </TouchableOpacity>
    </View>
  );
}
