import axios from "axios";
import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styles from "../../../app.module.css";
import drf from "../../api/drf";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

export default function Verification({ navigation }) {
  const dispatch = useDispatch();
  // 회원가입 + 로그인 모두에 필요한 값들
  const [studentNo, setStudentNo] = useState("");
  const [email, setEmail] = useState("");
  const [eduPassword, setEduPassword] = useState("");
  const [MMPassword, setMMPassword] = useState("");
  // 회원가입에 필요한 값들
  const numberName = ["1기", "2기", "3기", "4기", "5기", "6기", "7기", "8기"];
  const trackName = [
    "파이썬",
    "자바(비전공)",
    "자바(전공)",
    "임베디드",
    "모바일",
  ];
  const [number, setNumber] = useState();
  const [track, setTrack] = useState();
  // 에러메시지
  const [inputError, setInputError] = useState(false);
  // axios 요청 함수
  // const login = await axios({
  //   url: drf.user.login(),
  //   method: "POST",
  //   data: credentials,
  // }).then((res) => {
  //   console.log(res);
  // });

  return (
    <View>
      <Text>SSAFY 교육생 인증</Text>
      <View style={{ margin: 10, borderWidth: 1 }}>
        {/* 학번 입력 */}
        <View style={{ flexDirection: "row", margin: 5, height: 35 }}>
          <Text>학번: </Text>
          <TextInput
            keyboardType="numeric"
            maxLength={7}
            style={{ borderWidth: 1 }}
            placeholder=" edu ssafy와 MattaMost의 ID를 입력해 주세요"
            onChangeText={(text) => setStudentNo(text)}
          />
        </View>
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
        {/* 기수 선택 */}
        <View style={{ flexDirection: "row", padding: 5 }}>
          <Text>기수: </Text>
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
        </View>
        {/* 트랙 선택 */}
        <View style={{ flexDirection: "row", padding: 5 }}>
          <Text>소속 트랙: </Text>
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
            } else if (!studentNo) {
              setInputError("학번을 입력해주세요");
            } else if (!number) {
              setInputError("기수를 선택해주세요");
            } else if (!track) {
              setInputError("트랙을 선택해주세요");
            } else {
              let credentials = {
                id: studentNo,
                username: email,
                password: MMPassword,
                eduPw: eduPassword,
                gi: number,
                trackName: track,
              };
              axios({
                url: drf.user.signup(),
                method: "POST",
                data: credentials,
              }) // 요청 성공 = 토큰만 저장(앱), id, 비밀번호는 로컬에 저장하고 사용
                .then((res) => {
                  // if (res.data.authorityName === "ROLE_USER") {
                  //   credentials = {
                  //     username: email,
                  //     password: MMPassword,
                  //     eduPw: eduPassword,
                  //   };
                  //   await axios({
                  //     url: drf.user.login(),
                  //     method: "POST",
                  //     data: credentials,
                  //   }).then((res) => {
                  //     console.log(res);
                  //   });
                  // }
                  console.log(res);
                  // dispatch({
                  //   type: "Account/import",
                  //   payload: {
                  //     id: res.data.username,
                  //     eduPassword: res.data.eduPw,
                  //     MMpassword: res.data.password,
                  //     Tokken: res.data.Tokken,
                  //   },
                  // });
                  // dispatch({ type: "Account/save" });
                })
                // 토큰 및 유저 정보 저장 후 Main 화면으로 이동
                // .then(() => navigation.navigate("MyTabs"))
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
