import axios from "axios";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import styles from "../../../app.module.css";
import drf from "../../api/drf";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

export default function Verification({ navigation }) {
  const dispatch = useDispatch();
  // 비밀번호 변경 등으로 다시 온 경우가 있으므로 유저 정보들 받기
  useEffect(() => {
    if (btnName !== "인증") {
      setMMPassword("");
      setEduPassword("");
    }
  }, []);
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
    "자바\n(비전공)",
    "자바\n(전공)",
    "임베디드",
    "모바일",
  ];
  // 각각 siginin에 입력형식, campus 이름 내용(실제 input 제출용)
  const inputTrackName = ["Python", "Javab", "Java", "Embedded", "Mobile"];
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
        // 재인증 모드로 변경
        dispatch({ type: "Account/mode", mode: "재인증" });
      })
      .catch((err) => {
        console.log(err);
        console.log("로그인 실패");
        setInputError("입력 내용을 다시 확인해주세요");
      });

  return (
    <View style={VerificationStyles.back}>
      <TouchableOpacity style={VerificationStyles.ssamy}>
        <Text>마크?</Text>
      </TouchableOpacity>
      <View style={VerificationStyles.container}>
        <View style={VerificationStyles.inputContainer}>
          <Text style={VerificationStyles.inputLabel}>학번</Text>
          {/* 학번 입력 */}
          {btnName === "인증" ? (
            <TextInput
              style={[VerificationStyles.input]}
              keyboardType="numeric"
              maxLength={7}
              value={studentNo}
              placeholder="SSAFY 학번을 입력하세요"
              placeholderTextColor="#6986A8"
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
            <Text style={VerificationStyles.input}>{studentNo}</Text>
          )}
        </View>
        <View style={VerificationStyles.inputContainer}>
          <Text style={VerificationStyles.inputLabel}>이름 </Text>
          {/* 이름 이름 */}
          {btnName === "인증" ? (
            <TextInput
              style={VerificationStyles.input}
              placeholder="이름을 입력하세요"
              placeholderTextColor="#6986A8"
              onChangeText={(text) => {
                setName(text);
              }}
            />
          ) : (
            <Text style={VerificationStyles.input}>{name}</Text>
          )}
        </View>
        {/* 이메일 입력 */}
        <View style={VerificationStyles.inputContainer}>
          <Text style={VerificationStyles.inputLabel}>
            EduSSAFY{"\n"}이메일
          </Text>
          {btnName === "인증" ? (
            <TextInput
              style={VerificationStyles.input}
              placeholder="EduSSAFY와 MattaMost의 ID를 입력하세요"
              placeholderTextColor="#6986A8"
              onChangeText={(text) => {
                setEmail(text);
                emailValid(text);
              }}
            />
          ) : (
            <Text style={VerificationStyles.input}>{email}</Text>
          )}
        </View>
        {/* edussafy 비밀번호 입력 */}
        <View style={VerificationStyles.inputContainer}>
          <Text style={VerificationStyles.inputLabel}>
            EduSSAFY {"\n"}비밀번호
          </Text>
          <TextInput
            style={VerificationStyles.input}
            secureTextEntry={true}
            value={eduPassword}
            placeholder="EduSSAFY 패스워드를 입력하세요"
            placeholderTextColor="#6986A8"
            onChangeText={(text) => setEduPassword(text)}
          />
        </View>
        {/* MattaMost 비밀번호 */}
        <View style={VerificationStyles.inputContainer}>
          <Text style={VerificationStyles.inputLabel}>
            MattaMost{"\n"}비밀번호
          </Text>
          <TextInput
            style={VerificationStyles.input}
            secureTextEntry={true}
            value={MMPassword}
            placeholder="MattaMost의 패스워드를 입력하세요"
            placeholderTextColor="#6986A8"
            onChangeText={(text) => setMMPassword(text)}
          />
        </View>
        {/* 트랙 선택 */}
        <View style={VerificationStyles.inputContainer}>
          {btnName !== "인증" && (
            <Text style={VerificationStyles.inputLabel}>소속 트랙</Text>
          )}
          <View style={{ flexDirection: "row" }}>
            {btnName === "인증" ? (
              trackName.map((tra, idx) => {
                return (
                  <TouchableOpacity
                    key={`tra-${idx}`}
                    style={[
                      VerificationStyles.btn,
                      idx + 1 === track ? { backgroundColor: "#a8d1ff" } : {},
                    ]}
                    onPress={() => setTrack(idx + 1)}
                  >
                    <Text style={{ textAlign: "center" }}>{tra}</Text>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text style={VerificationStyles.input}>
                {trackName[track - 1].replace("\n", "")}
              </Text>
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {btnName === "탈퇴" && (
            <TouchableOpacity
              style={VerificationStyles.submitBtn}
              onPress={() => {
                navigation.goBack();
                dispatch({ type: "Account/mode", mode: "재인증" });
              }}
            >
              <Text style={VerificationStyles.submitText}>취소</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={VerificationStyles.submitBtn}
            onPress={() => {
              if (!eduPassword) {
                setInputError("Edu SSAFY 비밀번호를 입력해주세요");
              } else if (!MMPassword) {
                setInputError("MattaMost 비밀번호를 입력해주세요");
              } else {
                if (btnName === "재인증") {
                  const credentials = {
                    username: email,
                    password: MMPassword,
                    eduPw: eduPassword,
                  };
                  login(credentials);
                } else if (btnName === "탈퇴") {
                  const credentials = {
                    username: email,
                    password: MMPassword,
                    eduPw: eduPassword,
                  };
                  // 탈퇴로 보낼 url 필요
                } else {
                  // 누락분이 있는 경우 error 텍스트
                  if (!valid) {
                    setInputError("Edu SSAFY ID를 확인하세요");
                  } else if (!name) {
                    setInputError("이름을 입력해주세요");
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
                    let credentials = {
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
                          res.data.authorityDtoSet[0].authorityName ===
                          "ROLE_USER"
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
                        console.log(err);
                        console.log(`가입실패`);
                        setInputError("입력 내용을 다시 확인해주세요");
                      });
                  }
                }
              }
            }}
          >
            <Text style={VerificationStyles.submitText}>{btnName}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const VerificationStyles = StyleSheet.create({
  // 전체 화면 스타일
  back: {
    backgroundColor: "#EDEDED",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  ssamy: {
    marginTop: 50,
    height: 180,
    borderWidth: 1,
    width: "50%",
    backgroundColor: "#E5F3F6",
  },
  container: {
    margin: 10,
    borderRadius: 10,
    width: "95%",
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#ededed",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputLabel: {
    flex: 2,
    margin: 8,
    color: "#5ba8ff",
    textAlign: "center",
  },

  input: {
    flexDirection: "row",
    margin: 5,
    height: 35,
    flex: 8,
    borderBottomWidth: 1.5,
    borderBottomColor: "#a8d1ff",
    borderRadius: 7,
  },
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

  submitBtn: {
    alignItems: "center",
    backgroundColor: "#5ba8ff",
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },

  submitText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
