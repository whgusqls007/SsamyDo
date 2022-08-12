import axios from "axios";
import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styles from "../../../app.module.css";
import drf from "../../api/drf";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

export default function Verification({ navigation }) {
  const dispatch = useDispatch();
  // 비밀번호 변경 등으로 다시 온 경우가 있으므로 유저 정보들 받기
  const user = useSelector((state) => state.Account[0]);
  const btnName = useSelector((state) => state.Account[1]);
  // 회원가입 + 로그인 모두에 필요한 값들
  const [email, setEmail] = useState(user.email);
  const [eduPassword, setEduPassword] = useState("");
  const [MMPassword, setMMPassword] = useState("");
  // 회원가입에 필요한 값들(모바일 화면용)
  const [name, setName] = useState(user.name);
  const [studentNo, setStudentNo] = useState(user.studentNo);
  const trackName = [
    "파이썬",
    "자바(비전공)",
    "자바(전공)",
    "임베디드",
    "모바일",
  ];
  // 각각 siginin에 입력형식, campus 이름 내용(실제 input 제출용)
  const inputTrackName = ["Python", "Javab", "Java", "Embeded", "Mobile"];
  const [number, setNumber] = useState(user.number);
  const [track, setTrack] = useState(user.track);

  // email 검증
  const [valid, setValid] = useState(false);
  // email 여부를 검증하는 함수
  function emailValid(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setValid(true);
    } else {
      setValid(false);
    }
  }
  // 에러메시지
  const [inputError, setInputError] = useState(false);

  //로그인 함수(인증과 재인증 두 경우 모두 사용해야 하므로 정의해서 사용)
  const login = (credentials) =>
    axios({
      method: "post",
      url: drf.user.login(),
      data: credentials,
    })
      .then((res) => {
        // 유저  정보 저장
        dispatch({
          type: "Account/import",
          payload: {
            email: email,
            token: res.data.token,
            studentNo: studentNo,
            name: name,
            // 변경을 해야하므로 그냥 번호로 기억
            track: track,
          },
        });
        // 저장 내용들 로컬에 저장
        dispatch({ type: "Account/save" });
        // 메인화면으로 이동
        navigation.navigate("TabNav");
      })
      .catch((err) => {
        setInputError("입력 내용을 다시 확인해주세요");
      });

  return (
    <View>
      <Text>SSAFY 교육생 인증</Text>
      <View style={{ margin: 10, borderWidth: 1 }}>
        {/* 학번 입력 */}
        <View style={{ flexDirection: "row", margin: 5, height: 35 }}>
          <Text>학번: </Text>
          {btnName === "인증" ? (
            <TextInput
              keyboardType="numeric"
              maxLength={7}
              style={{ borderWidth: 1 }}
              value={studentNo}
              placeholder="SSAFY 학번을 입력해주세요"
              onChangeText={(text) => {
                setStudentNo(text);
                if (studentNo[1]) {
                  setNumber(Number(studentNo[1]));
                } else {
                  setNumber("");
                }
              }}
            />
          ) : (
            <Text>{studentNo}</Text>
          )}
        </View>
        {/* 이름 이름 */}
        <View style={{ flexDirection: "row", margin: 5, height: 35 }}>
          <Text>이름: </Text>
          {btnName === "인증" ? (
            <TextInput
              style={{ borderWidth: 1 }}
              placeholder="이름을 입력해주세요"
              onChangeText={(text) => {
                setName(text);
              }}
            />
          ) : (
            <Text>{name}</Text>
          )}
        </View>
        {/* 이메일 입력 */}
        <View style={{ flexDirection: "row", margin: 5, height: 35 }}>
          <Text>EduSSAFY ID: </Text>
          {btnName === "인증" ? (
            <TextInput
              style={{ borderWidth: 1 }}
              placeholder=" edu ssafy와 MattaMost의 ID를 입력해 주세요"
              onChangeText={(text) => {
                setEmail(text);
                emailValid(text);
              }}
            />
          ) : (
            <Text>{email}</Text>
          )}
        </View>
        {/* edussafy 비밀번호 입력 */}
        <View style={{ flexDirection: "row", margin: 5, height: 35 }}>
          <Text>EduSSAFY 비밀번호 : </Text>
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
        {/* 트랙 선택 */}
        <View style={{ flexDirection: "row", padding: 5 }}>
          <Text>소속 트랙: </Text>
          <View style={{ flexDirection: "row" }}>
            {btnName === "인증" ? (
              trackName.map((tra, idx) => {
                return (
                  <TouchableOpacity
                    key={`tra-${idx}`}
                    style={[
                      styles.button,
                      { margin: 1 },
                      idx + 1 === track ? { backgroundColor: "pink" } : {},
                    ]}
                    onPress={() => setTrack(idx + 1)}
                  >
                    <Text>{tra}</Text>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text>{trackName[track - 1]}</Text>
            )}
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
            if (!valid) {
              setInputError("Edu SSAFY ID를 확인하세요");
            } else if (!eduPassword) {
              setInputError("Edu SSAFY 비밀번호를 입력해주세요");
            } else if (!name) {
              setInputError("이름을 입력해주세요");
            } else if (!MMPassword) {
              setInputError("MattaMost 비밀번호를 입력해주세요");
              //학번이 없거나, 캠퍼스 번호가 5번보다 크거나 길이가 7이 아닌 경우
            } else if (
              !studentNo ||
              studentNo[2] > 5 ||
              studentNo.length !== 7
            ) {
              setInputError("학번을 확인해주세요");
              // track 은 인덱스 +1 시킴
            } else if (track === "") {
              setInputError("트랙을 선택해주세요");
            } else {
              if (btnName === "재인증") {
                credentials = {
                  username: email,
                  password: MMPassword,
                  eduPw: eduPassword,
                };
                login(credentials);
              } else {
                let credentials = {
                  id: studentNo,
                  username: email,
                  password: MMPassword,
                  eduPw: eduPassword,
                  gi: number,
                  trackName: inputTrackName[track - 1],
                };
                axios({
                  method: "post",
                  url: drf.user.signup(),
                  data: credentials,
                })
                  .then((res) => {
                    // 회원가입에 성공한 경우(토큰 저장 추가 필요)
                    if (
                      res.data.authorityDtoSet[0].authorityName === "ROLE_USER"
                    );
                    {
                      // 토큰및 유저 email 및 학번 저장
                      credentials = {
                        username: email,
                        password: MMPassword,
                        eduPw: eduPassword,
                      };
                      // 로그인함수
                      login(credentials);
                    }
                  })
                  .catch((err) => {
                    setInputError("입력 내용을 다시 확인해주세요");
                  });
              }
            }
          }}
        >
          <Text>{btnName}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
