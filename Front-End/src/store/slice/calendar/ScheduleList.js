import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ScheduleList = createSlice({
  name: "ScheduleList",
  // 0 : 전체 Schedule리스트, 1: LastId, 2: ssafy(0번) 리스트, 3: 1번 타입 리스트, 4: 2번 분류 리스트
  // 5: 현재 보여줄 리스트[전체, ssafy, type1, type2], 6: 달력에 표시 변수
  initialState: [[], 0, {}],
  reducers: {
    // local 정보 읽기  + 추가필요(ssafy 공지의 경우 local에 저장하지 않으므로 따로 사용)
    import: (state, action) => {
      // 입력값들 전체 Schedule리스트, LastId, 1번 타입 리스트, 2번 타입 리스트에 입력
      state[0] = action.payload.ScheduleList;
      state[1] = action.payload.lastId;
    },
    // local에 현재 데이터 저장
    save: (state) => {
      AsyncStorage.setItem(
        "ScheduleList",
        JSON.stringify({ ScheduleList: state[0], lastId: state[1] })
      );
    },
    // ScheduleList에 추가
    add: (state, action) => {
      // 전체 리스트에 추가 후 속성에 맞는 리스트에 추가
      state[0].push(action.payload);
      // 마지막 ID 값 +1
      state[1] += 1;
    },
    // 특정 Schedule 수정
    update: (state, action) => {
      // 1. 순회하며 ScheduleList 내에서 해당 id를 가진 Schedule의 인덱스값 찾기
      const index = state[0].map((Schedule) => {
        if (Schedule.id === action.payload.id) {
          return state[0].indexOf(Schedule);
        }
      });
      // 해당 인덱스 번호를 가진 Schedule를 입력값으로 변경
      state[0][index] = action.payload;
    },
    // 특정 Schedule 삭제
    delete: (state, action) => {
      // 1. 전체 ScheduleList에서 해당 Schedule 삭제
      const index = state[0].map((Schedule) => {
        if (Schedule.id === action.payload.id) {
          state[0].indexOf(Schedule);
        }
      });
      state[0].splice(index, 1);
    },

    // 현재보여줄 Schedule 목록
    // filter: (state, action) => {
    //   console.log("filter");
    //   // 목록 초기화
    //   state[4] = [];
    //   // 날짜 필터링
    //   state[4] = state[0].filter((Schedule) => {
    //     console.log(Schedule);
    //     return Schedule.end === action.select;
    //   });
    //   console.log(state[4]);
    // },

    // 버튼을 눌러서 Schedule의 Type 변경시 보여줄 캘린더 속성 제작
    mark: (state, action) => {
      // 스타일 초기화
      state[5] = {};
      // zero는 아무 의미 없는 역할
      const zero = {};
      const ssafy = { key: "ssafy", color: "blue" };
      const typeOne = { key: "typeOne", color: "red" };
      const typeTwo = { key: "typeTwo", color: "green" };
      // 1. 전체보기의 경우
      if (action.select === "all") {
        state[0].map((Schedule) => {
          // 1-1. 타입 0(ssafy)인 경우
          if (Schedule.type === 0) {
            // 1-1-1. 이미 해당 일의 일정이 있는 경우
            if (state[5][`${Schedule.end}`]) {
              // 해당 속성에 ssafy타입이 없는 경우
              if (state[5][`${Schedule.end}`].dots[0] === zero) {
                state[5][`${Schedule.end}`].dots[0] = ssafy;
              }
              // 1-1-2. 해당 일의 기존 일정이 없는 경우
            } else {
              state[5][`${Schedule.end}`] = {
                dots: [ssafy, zero, zero],
              };
            }
          }
          // 1-2. 타입 1인 경우
          else if (Schedule.type === 1) {
            // 1-2-1. 이미 해당 일의 일정이 있는 경우
            if (state[5][`${Schedule.end}`]) {
              // 해당 속성에 타입 1이 없는 경우
              if (state[5][`${Schedule.end}`].dots[1] === zero) {
                state[5][`${Schedule.end}`].dots[1] = typeOne;
              } // 1-2-2. 해당 일의 기존 일정이 없는 경우
            } else {
              state[5][`${Schedule.end}`] = {
                dots: [zero, typeOne, zero],
              };
            }
          }
          // 1-3. 타입 2인 경우
          else {
            // 1-3-1. 이미 해당 일의 일정이 있는 경우
            if (state[5][`${Schedule.end}`]) {
              // 해당 속성에 타입 1이 없는 경우
              if (state[5][`${Schedule.end}`].dots[2] === zero) {
                state[5][`${Schedule.end}`].dots[2] = typeTwo;
              } // 1-3-2. 해당 일의 기존 일정이 없는 경우
            } else {
              state[5][`${Schedule.end}`] = {
                dots: [zero, zero, typeTwo],
              };
            }
          }
        });
        // 2. 타입 1만 보기의 경우
      } else if (action.select === 1 && action.payload) {
        action.payload.map((Schedule) => {
          // 2-1.해당일에 기존 일정이 없는 경우 스타일 추가
          if (!state[5][`${Schedule.end}`]) {
            state[5][`${Schedule.end}`] = {
              dots: [typeOne],
            };
          }
        });
        // 3. 타입 2만 보기의 경우
      } else if (action.select === 2 && action.payload) {
        action.payload.map((Schedule) => {
          // 3-1. 해당일에 기존 일정이 없는 경우 스타일 추가
          if (!state[5][`${Schedule.end}`]) {
            state[5][`${Schedule.end}`] = {
              dots: [typeTwo],
            };
          }
        });
      }
      // ssafy(0)만 선택한 경우 추가 필요
      else {
        if (action.payload) {
          action.payload.map((Schedule) => {
            if (!state[5][`${Schedule.end}`]) {
              state[5][`${Schedule.end}`] = {
                dots: [ssafy],
              };
            }
          });
        }
      }
    },
  },
});
export default ScheduleList;
