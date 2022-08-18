import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default Account = createSlice({
  name: "Account",
  // [0] : 이메일과 토큰, [1] : Verification에서 사용할 상태
  // [2] : 다른 요청들에 token을 함께 보내야하므로 추후 추가
  // [3] : ScheduleType에 넣을 값
  initialState: [
    {
      email: "",
      token: "",
      studentNo: "",
      name: "",
      track: "",
    },
    "인증",
    // 토큰 인증시 활용할 형태로 만들기
    {},
    ["싸피", "스터디", "개인일정"],
  ],
  reducers: {
    // 시작시 값들 불러오기 + 값이 있으므로 이제는 재인증으로만 Verifiaction을 가게 변경
    import(state, action) {
      state[0] = action.payload;
      state[2] = { Authorization: `Bearer ${action.payload.token}` };
    },
    // 유저 정보 저장 사용해서 추가
    save(state) {
      AsyncStorage.setItem("Account", JSON.stringify(state[0]));
    },
    // user 트랙 업데이트
    update(state, action) {
      state[0].track = action.track;
    },
    // 탈퇴, 재인증, 인증 상태 변경
    mode(state, action) {
      state[1] = action.mode;
    },

    changeType(state, action) {
      state[3][1] = action.payload[0];
      state[3][2] = action.payload[1];
    },
    // 로컬에 저장
    saveType(state) {
      AsyncStorage.setItem("Setting", JSON.stringify({ typeName: state[3] }));
    },
    // 값 불러오기
    importType(state, action) {
      state[3] = action.payload.typeName;
    },

    reset(state) {
      state[0] = {
        email: "",
        token: "",
        studentNo: "",
        name: "",
        track: "",
      };
      state[1] = "인증";
      state[2] = {};
      state[3] = ["싸피", "스터디", "개인일정"];
    },
  },
});
