import { createSlice } from "@reduxjs/toolkit";

const Schedule = createSlice({
  name: "Schedule",
  // 1. Schedule에 등록할 리스트  2. 캘린더에 mark 속성을 담을 obeject
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
    // 유형 선택(클릭 한 값을 바로 유형으로)
    select: (state, action) => {
      state[0].type = action.select;
    },

    // 제목 변경(입력 값을 제목으로)
    title: (state, action) => {
      state[0].title = action.title;
    },

    // 내용 변경(입력 값을 내용으로)
    content: (state, action) => {
      state[0].content = action.content;
    },

    // 시작일 변경 및 캘린더 시작일 마크 변경
    start: (state, action) => {
      state[0].start = action.start;
      // 속성 초기화
      state[1] = {};
      // 새로운 시작값을 선택한 경우 속성 추가
      if (action.start !== "") {
        state[1][`${action.start}`] = { selected: true, selectedColor: "red" };
      }
    },

    // 종료일 변경 및 캘린더 종료일 마크 변경
    end: (state, action) => {
      // 종료일 값 변경
      state[0].end = action.end;
      // 1. 종류일이 변경된 경우
      if (action.end !== "") {
        // 1-1. 기존 종료일이 있는 경우(속성의 길이가 2이상)
        if (Object.keys(state[1]).length > 1) {
          // 속성 초기화
          state[1] = {};
          // Object에 시작값 속성과 종료일 속성을 추가하기
          state[1][`${state[0].start}`] = {
            selected: true,
            selectedColor: "red",
          };
          state[1][`${action.end}`] = {
            selected: true,
          };
          // 1-2. 종료일이 아직 선택되지 않은 경우
        } else {
          // 종료일 속성 추가
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
    timeType(state, action) {
      state[0].time[0] = action.select;
    },

    // 마감시간 시간 선택
    timeHour(state, action) {
      state[0].time[1] = action.hour;
    },
    // 마감시간 분 선택
    timeMin(state, action) {
      state[0].time[2] = action.min;
    },
  },
});
export default Schedule;
