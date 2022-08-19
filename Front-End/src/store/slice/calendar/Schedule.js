import { createSlice } from "@reduxjs/toolkit";

const Schedule = createSlice({
  name: "Schedule",
  // 1. Schedule에 등록할 리스트  2. MakeScedule 버튼 이름
  initialState: [
    {
      type: 3,
      title: "",
      day: "",
      time: [new Date().getHours(), new Date().getMinutes()],
    },
    "생성",
  ],
  reducers: {
    // 유형 선택(클릭 한 값을 바로 유형으로)
    update(state, action) {
      state[0] = { ...state[0], ...action.payload };
    },
    clear(state) {
      state[0] = {
        type: 3,
        title: "",
        content: "",
        day: "",
        time: [new Date().getHours(), new Date().getMinutes()],
      };
    },
    btn(state, action) {
      state[1] = action.name;
    },
  },
});
export default Schedule;
