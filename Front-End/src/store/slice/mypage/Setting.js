import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Setting = createSlice({
  name: "Setting",
  // 0. 개인 인적 사항{이름, 기수}  1. 일정 분류명
  initialState: [
    {
      name: "김싸피",
      number: 7,
      campus: "부울경",
      track: "파이썬",
    },
    ["싸피", "스터디", "개인일정"],
  ],
  reducers: {
    // 기존값 경신
    update(state, action) {
      state[0] = action.payload;
    },
    // Schedule의 타입명 변경
    changeType(state, action) {
      state[1][action.type] = action.text;
    },
    // 로컬에 저장
    save(state) {
      AsyncStorage.setItem(
        "Setting",
        JSON.stringify({ userDetail: state[0], typeName: state[1] })
      );
    },
    // 값 불러오기
    import(state, action) {
      state[0] = action.payload.userDetail;
      state[1] = action.payload.typeName;
    },
  },
});

export default Setting;
