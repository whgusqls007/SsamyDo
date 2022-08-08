import { createSlice } from "@reduxjs/toolkit";

const Setting = createSlice({
  name: "Setting",
  // 0. 개인 인적 사항{이름, 기수}  1. edussafy 정보 2. 일정 분류명
  initialState: [
    {
      name: "",
      No: 0,
      campus: "",
      track: "",
    },
    { id: "", password: "" },
    ["싸피", "스터디", "개인일정"],
  ],
  reducers: {
    update(state, action) {
      state[0] = { ...state[0], ...action.payload };
    },
    changeType(state, action) {
      state[2][type] = action.text;
    },
  },
});

export default Setting;
