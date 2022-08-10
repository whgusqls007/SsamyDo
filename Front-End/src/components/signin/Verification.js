import axios from "axios";
import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styles from "../../../app.module.css";
import drf from "../../api/drf";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

export default function Verification({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [eduPassword, setEduPassword] = useState("");
  const [MMPassword, setMMPassword] = useState("");
  const [inputError, setInputError] = useState(false);
  return (
    <View>
      <Text>SSAFY 교육생 인증</Text>
      <View style={{ margin: 10, borderWidth: 1 }}>
        {/* 이메일 입력 */}
        <View style={{ flexDirection: "row", margin: 5, height: 35 }}>
          <Text>이메일: </Text>
          <TextInput
            style={{ borderWidth: 1 }}
            placeholder=" edu ssafy와 MattaMost의 ID를 입력해 주세요"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        {/* edussafy 비밀번호 입력 */}
        <View style={{ flexDirection: "row", margin: 5, height: 35 }}>
          <Text>edussafy 비밀번호 : </Text>
          <TextInput
            style={{ borderWidth: 1, width: 245 }}
            secureTextEntry={true}
            placeholder=" edu ssafy 패스워드를 입력해 주세요"
            onChangeText={(text) => setEduPassword(text)}
          />
        </View>
        {/* MattaMost 비밀번호 */}
        <View style={{ flexDirection: "row", margin: 5, height: 35 }}>
          <Text>MattaMost 비밀번호 : </Text>
          <TextInput
            style={{ borderWidth: 1, width: 237 }}
            secureTextEntry={true}
            placeholder="MattaMost의 패스워드를 입력해 주세요"
            onChangeText={(text) => setMMPassword(text)}
          />
        </View>
        {/* 에러 메시지(누락된 부분이 있는 경우) */}
        {inputError && (
          <View style={{ flexDirection: "row", margin: 4 }}>
            <Ionicons name="warning" size={19} color="red" />
            <Text style={{ fontWeight: "bold", color: "red" }}>
              {inputError}
            </Text>
          </View>
        )}
        {/* 인증버튼(모두 입력된 경우 보냄) */}
        <TouchableOpacity
          style={[
            styles.button,
            { width: 50, marginLeft: 150, marginVertical: 20 },
          ]}
          onPress={() => {
            // 누락분이 있는 경우 error 텍스트
            if (!email) {
              setInputError("ID를 입력해주세요");
            } else if (!eduPassword) {
              setInputError("Edu SSAFY 비밀번호를 입력해주세요");
            } else if (!MMPassword) {
              setInputError("Matta Most 비밀번호를 입력해주세요");
            } else {
              axios({
                url: drf.login(),
                method: "POST",
                credentials: {
                  username: email,
                  password: MMPassword,
                  eduPw: eduPassword,
                },
              }) // 요청 성공 = 토큰 + id, 비밀번호 저장
                .then((res) => {
                  console.log(res);
                  dispatch({
                    type: "Account/import",
                    payload: {
                      id: res.data.username,
                      eduPassword: res.data.eduPw,
                      MMpassword: res.data.password,
                      Tokken: res.data.Tokken,
                    },
                  });
                  dispatch({ type: "Account/save" });
                })
                // 토큰 및 유저 정보 저장 후 Main 화면으로 이동
                .then(() => navigation.navigate("MyTabs"))
                // 요청이 실패한 경우 에러 정보 저장
                .catch((err) => {
                  setInputError(err);
                });
            }
          }}
        >
          <Text>인증</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
