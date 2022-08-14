import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default Account = createSlice({
  name: "Account",
  // [0] : 이메일과 토큰, [1] : Verification에서 사용할 상태
  // [2] : 다른 요청들에 token을 함께 보내야하므로 추후 추가
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
  ],
  reducers: {
    // 시작시 값들 불러오기 + 값이 있으므로 이제는 재인증으로만 Verifiaction을 가게 변경
    import(state, action) {
      state[0] = action.payload;
      state[1] = "재인증";
      state[2] = { Token: action.payload.token };
    },
    // 유저 정보 저장 사용해서 추가
    save(state) {
      AsyncStorage.setItem("Account", JSON.stringify(state[0]));
    },
    // userDetail 업데이트
    update(state, action) {
      state[0] = { ...state[0], ...action.payload };
    },
  },
});
