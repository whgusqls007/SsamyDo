import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../../app.module.css";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

export default function Aggrement({ navigation }) {
  // 약관 동의 및 다음 버튼 활성화 변수
  const [aggrement, setAggrement] = useState(false);
  return (
    <View>
      <Text>개인정보 이용 동의서</Text>
      {/* 개인정보 이용동의서 내용 */}
      <View
        style={{ width: 400, height: 500, backgroundColor: "#E5F3F6" }}
      ></View>
      <View>
        {/* 약관 동의 */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: 5,
          }}
        >
          {!aggrement && (
            <FontAwesome
              name="square-o"
              size={24}
              color="blue"
              onPress={() => {
                setAggrement(!aggrement);
              }}
            />
          )}
          {aggrement && (
            <FontAwesome
              name="check-square-o"
              size={24}
              color="blue"
              onPress={() => {
                setAggrement(!aggrement);
              }}
            />
          )}
          <Text> 상기 이용 동의서의 내용을 이해했으며동의합니다.</Text>
        </View>
      </View>
      {/* 다음(MM, EduSSAFY 인증 단계) 버튼 */}
      <TouchableOpacity
        style={[styles.button, { width: 50, marginLeft: 350 }]}
        onPress={() => {
          if (aggrement) {
            navigation.navigate("Verification");
          } else {
            // alert 형식 변경 필요할듯
            alert("약관 동의 ㄱㄱ");
          }
        }}
      >
        <Text>다음</Text>
      </TouchableOpacity>
    </View>
  );
}
