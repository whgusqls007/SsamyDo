import axios from "axios";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  BackHandler,
} from "react-native";
import drf from "../../api/drf";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

async function getTheToken() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return null;
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  await Notifications.getPermissionsAsync();
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}

export default function Verification({ navigation }) {
  const [fcmToken, setFcmToken] = useState("");
  const dispatch = useDispatch();
  // 비밀번호 변경 등으로 다시 온 경우가 있으므로 유저 정보들 받기
  useEffect(() => {
    setMMPassword("");
    setEduPassword("");
    getTheToken()
      .then((e) => setFcmToken(e))
      .catch((err) => {
        console.log(err);
      });
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
        // 비밀번호들 초기화
        setMMPassword("");
        setEduPassword("");
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

  // 토큰
  const token = useSelector((state) => {
    return state.Account[2];
  });

  return (
    <View style={VerificationStyles.container}>
      <View style={VerificationStyles.header}>
        {/* 뒤로 가기 */}
        <TouchableOpacity
          style={VerificationStyles.headerBack}
          onPress={() => {
            // 인증(새로가입 하는 경우는 뒤로가기 = Aggrements)
            if (btnName === "인증") {
              navigation.goBack();
              // 재인증 or 탈퇴의 경우(메인 화면으로 이동)
            } else {
              navigation.navigate("TabNav");
            }
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" margin="0" />
        </TouchableOpacity>
        <Text style={VerificationStyles.headerText}>Verification</Text>
      </View>
      <View style={VerificationStyles.verifiContainer}>
        <View style={VerificationStyles.inputBox}>
          {/* 학번 입력 */}
          {btnName === "인증" ? (
            <TextInput
              style={{ width: "100%" }}
              keyboardType="numeric"
              maxLength={7}
              value={studentNo}
              placeholder="SSAFY 학번"
              placeholderTextColor="#888888"
              onChangeText={(text) => {
                setStudentNo(text);
                setInputError("");
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
        <View style={VerificationStyles.inputBox}>
          {/* 이름 */}
          {btnName === "인증" ? (
            <TextInput
              style={{ width: "100%" }}
              placeholder="교육생 이름"
              autocapitalize={false}
              placeholderTextColor="#888888"
              onChangeText={(text) => {
                setName(text);
                setInputError("");
              }}
            />
          ) : (
            <Text style={VerificationStyles.input}>{name}</Text>
          )}
        </View>
        {/* 이메일 입력 */}
        <View style={VerificationStyles.inputBox}>
          {btnName === "인증" ? (
            <TextInput
              style={{ width: "100%" }}
              placeholder="EduSSAFY ID"
              placeholderTextColor="#888888"
              onChangeText={(text) => {
                setEmail(text);
                emailValid(text);
                setInputError("");
              }}
              autoCapitalize="none"
            />
          ) : (
            <Text style={VerificationStyles.input}>{email}</Text>
          )}
        </View>
        {/* edussafy 비밀번호 입력 */}
        <View style={VerificationStyles.inputBox}>
          <TextInput
            style={{ width: "100%" }}
            secureTextEntry={true}
            value={eduPassword}
            placeholder="EduSSAFY 패스워드"
            placeholderTextColor="#888888"
            onChangeText={(text) => {
              setInputError("");
              setEduPassword(text);
            }}
            autoCapitalize="none"
          />
        </View>
        {/* MatterMost 비밀번호 */}
        <View style={VerificationStyles.inputBox}>
          <TextInput
            style={{ width: "100%" }}
            secureTextEntry={true}
            value={MMPassword}
            placeholder="MatterMost 패스워드"
            placeholderTextColor="#888888"
            onChangeText={(text) => {
              setInputError("");
              setMMPassword(text);
            }}
            autoCapitalize="none"
          />
        </View>
        {/* 트랙 선택 */}
        <View
          style={
            btnName === "인증"
              ? VerificationStyles.trackContainer
              : VerificationStyles.inputBox
          }
        >
          <View style={{ flexDirection: "row" }}>
            {btnName === "인증" ? (
              trackName.map((tra, idx) => {
                return (
                  <TouchableOpacity
                    key={`tra-${idx}`}
                    style={[
                      VerificationStyles.trackBtn,
                      idx === track ? { backgroundColor: "#a8d1ff" } : {},
                    ]}
                    onPress={() => {
                      setTrack(idx);
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>{tra}</Text>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text style={VerificationStyles.input}>
                {trackName[track].replace("\n", "")}
              </Text>
            )}
          </View>
        </View>
        {/* 에러 메시지(누락된 부분이 있는 경우) */}
        {inputError ? (
          <View style={{ flexDirection: "row", margin: 4 }}>
            <Ionicons name="warning" size={19} color="#C22D37" />
            <Text style={{ fontWeight: "bold", color: "#C22D37" }}>
              {inputError}
            </Text>
          </View>
        ) : (
          <View style={{ height: "5%", width: "100%" }}></View>
        )}
        <View style={VerificationStyles.submitContainer}>
          {/* 인증버튼(모두 입력된 경우 보냄) */}
          <TouchableOpacity
            style={[
              VerificationStyles.submitBtn,
              btnName === "탈퇴" && {
                height: "20%",
                backgroundColor: "#C22D37",
              },
            ]}
            onPress={() => {
              if (!eduPassword) {
                setInputError("Edu SSAFY 비밀번호를 입력해주세요");
              } else if (!MMPassword) {
                setInputError("MatterMost 비밀번호를 입력해주세요");
              } else {
                if (btnName === "재인증") {
                  const credentials = {
                    username: email,
                    password: MMPassword,
                    eduPw: eduPassword,
                  };
                  login(credentials);
                } else if (btnName === "탈퇴") {
                  axios({
                    method: "POST",
                    url: drf.user.delete(),
                    headers: token,
                  })
                    .then((res) => {
                      // 로컬 삭제
                      AsyncStorage.clear();
                      // 계정정보 Redux 제거
                      setStudentNo("");
                      dispatch({ type: "Account/reset" });
                      // 화면 시작화면에서 시작
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 1,
                          routes: [{ name: "Start" }],
                        })
                      );
                      BackHandler.exitApp();
                    })
                    .catch((err) => {
                      console.log(err);
                    });
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
                      trackName: inputTrackName[track],
                      fcmToken: fcmToken,
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
                          setInputError("");
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
          {btnName === "탈퇴" && (
            <TouchableOpacity
              style={[
                VerificationStyles.submitBtn,
                { backgroundColor: "#5ba8ff", height: "20%" },
              ]}
              onPress={() => {
                navigation.navigate("TabNav", { screen: "MyPage" });
                dispatch({ type: "Account/mode", mode: "재인증" });
              }}
            >
              <Text style={VerificationStyles.submitText}>취소</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const VerificationStyles = StyleSheet.create({
  // 전체 화면 스타일
  container: {
    flex: 1,
    backgroundColor: "#5ba8ff",
  },
  header: {
    flex: 0.2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  headerBack: {
    width: "100%",
    marginLeft: 30,
  },
  headerText: {
    color: "#ffffff",
    fontSize: 40,
    textAlign: "right",
  },
  verifiContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    borderTopEndRadius: 50,
    backgroundColor: "#ffffff",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 7,
    paddingLeft: 15,
    marginHorizontal: 7,
    marginVertical: 10,
    borderRadius: 7,
    shadowColor: "#111111",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
  },
  trackContainer: {
    marginTop: 15,
    marginHorizontal: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  inputData: {
    color: "#111111",
  },
  trackBtn: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    marginHorizontal: 2,
    backgroundColor: "#EDEDED",
    borderRadius: 5,
    height: "auto",
    width: "auto",
    flex: 1,
    justifyContent: "center",
  },
  submitContainer: {
    direction: "relative",
    marginTop: 50,
  },
  submitBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5ba8ff",
    padding: 10,
    margin: 10,
    borderRadius: 8,
    width: "95%",
    height: "27%",
  },
  submitText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
