import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Setting = createSlice({
  name: "Setting",
  // 0. 개인 인적 사항{이름, 기수}  1. 일정 분류명
  initialState: [["싸피", "스터디", "개인일정"]],
  reducers: {
    // Schedule의 타입명 변경
    changeType(state, action) {
      state[1][action.type] = action.text;
    },
    // 로컬에 저장
    save(state) {
      AsyncStorage.setItem("Setting", JSON.stringify({ typeName: state[0] }));
    },
    // 값 불러오기
    import(state, action) {
      state[0] = action.payload.typeName;
    },
  },
});

export default Setting;
