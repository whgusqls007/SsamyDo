import { createSlice } from "@reduxjs/toolkit";
import MakeSchedule from "../../../components/calendar/MakeSchedule";

const Todo = createSlice({
  name: "Todo",
  initialState: [
    {
      type: 0,
      title: "",
      content: "",
      start: "",
      end: "",
      time: ["오전", "", ""],
    },
    {},
  ],
  reducers: {
    // 유형 선택
    select: (state, action) => {
      state[0].type = action.select;
    },

    // 제목 변경
    title: (state, action) => {
      state[0].title = action.title;
    },

    // 내용 변경
    content: (state, action) => {
      state[0].content = action.content;
    },

    // 시작일 변경 및 캘린더 시작일 마크 변경
    start: (state, action) => {
      state[0].start = action.start;
      state[1] = {};
      if (action.start === "") {
        state[1] = {};
      } else {
        state[1][`${action.start}`] = { selected: true, selectedColor: "red" };
      }
    },

    // 종료일 변경 및 캘린더 종료일 마크 변경
    end: (state, action) => {
      state[0].end = action.end;
      if (action.end !== "") {
        if (Object.keys(state[1]).length > 1) {
          state[1] = {};
          state[1][`${state[0].start}`] = {
            selected: true,
            selectedColor: "red",
          };
          state[1][`${action.end}`] = {
            selected: true,
          };
        } else {
          state[1][`${action.end}`] = {
            selected: true,
          };
        }
      }
    },

    // 내용 정리
    clear(state) {
      state[0] = {
        type: "",
        title: "",
        content: "",
        start: "",
        end: "",
        // time: ["0", "", ""],
      };
      state[1] = {};
    },

    // // 마감 시간 오전/ 오후 선택
    // timeType(state, action) {
    //   state[0].time[0] = action.select;
    // },

    // // 마감시간 시간 선택
    // timeHour(state, action) {
    //   state[0].time[1] = action.hour;
    // },
    // // 마감시간 분 선택
    // timeMin(state, action) {
    //   state[0].time[2] = action.min;
    // },
  },
});
export default Todo;
