import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 1. 캘린더에서 특정 일을 클릭하면 mark(day를 인자로 보낸다.), filter는 all 타입이 아닌 경우 해당 리스트를 payload로 보낸다.
// 2. 캘린더 위 분류 타입에서 클릭을 하면(mark에 타입을 보내서 state[4]를 변화), filter로는 해당 리스트의 payload를 보낸다.
// 3. 수정과 삭제시 mark와 filter에 해당 타입의 리스트만 payload로 보낸다.

const ScheduleList = createSlice({
  name: "ScheduleList",
  // 0 : 전체 Schedule리스트, 1: LastId, 2: 달력에 표시 변수
  // 3: 화면의 Schedule 리스트, 4: 현재 분류타입
  initialState: [
    [],
    1,
    {},
    [],
    [
      "all",
      `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`,
    ],
  ],
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
      let index = 0;
      state[0].map((Schedule) => {
        if (Schedule.id === action.payload.id) {
          index = state[0].indexOf(Schedule);
        }
      });
      // 해당 인덱스 번호를 가진 Schedule를 입력값으로 변경
      state[0][index] = action.payload;
    },
    // 특정 Schedule 삭제
    delete: (state, action) => {
      // 1. 전체 ScheduleList에서 해당 Schedule 삭제
      let index = 0;
      state[0].map((Schedule) => {
        if (Schedule.id === action.id) {
          index = state[0].indexOf(Schedule);
        }
      });
      state[0].splice(index, 1);
      state[3] = [];
    },

    // 현재 보여줄 ScheduleList를 변화시키는 함수 action의 값은 3개 모두 선택적 입력
    // 1. 타입을 누를 경우 select와 payload(all에는 x), 2. 일자를 선택한 경우(day와 payload(all은x)), mark를 먼저 보내야함
    // action = {select : 타입 선택, day: 일자 선택, payload: 해당 선택 타입의 스케쥴 리스트}
    filter: (state, action) => {
      // day가 있으면 현재 선택일 교체(캘린더내 일자 클릭 시) => mark에서 처리함, mark는 기존 선택일이 필요
      // 목록 초기화
      state[3] = [];
      // 1. 날짜 필터링 중 타입이 all 인경우
      if (state[4][0] === "all") {
        // 리스트는 전체리스트 중 해당 일에 해당일(state[4][1])을 비교
        state[3] = state[0].filter((Schedule) => {
          return Schedule.day === state[4][1];
        });
      } else {
        // 입력받은 리스트(분류된 리스트) 중 분류 타입과 일자가 일치하는 경우
        if (action.payload) {
          state[3] = action.payload.filter((Schedule) => {
            return (
              Schedule.type === state[4][0] && Schedule.day === state[4][1]
            );
          });
        }
      }
      // sort를 통해 시간에 따라 정렬(1차 기준은 시간 time[0], 2차 기준은 분  time[1])
      state[3].sort((a, b) => a.time[0] - b.time[0] || a.time[1] - b.time[1]);
    },

    // 버튼을 눌러서 Schedule의 Type 변경시 보여줄 캘린더 속성 제작
    // 예시: {{ '2017-10-25': {dots: [vacation, massage, workout], selected: true, selectedColor: "#a8d1ff",} }}
    // 2가지 경우 사용 : 1. 현재 선택한 날을 표시하는 역할
    // 2. 타입을 선택하여 해당 일정들 타입을 점으로 캘린더에 생성하는 역할
    mark: (state, action) => {
      // 1. 인자로 일자를 넘긴 경우(달력의 일을 클릭하여 선택한 날의 마크만 필요한 경우)
      if (action.day) {
        // 1-1. 기존 선택일(state[4][1])마크를 지우기
        state[2][state[4][1]] = {
          ...state[2][state[4][1]],
          selected: false,
          selectedColor: "",
        };
        // 1-2-1. 새로운 선택일() 표시하기, 이미 마크(닷)이 있는 경우 할당
        if (state[2][action.day]) {
          state[2][action.day] = {
            ...state[2][action.day],
            selected: true,
            selectedColor: "#a8d1ff",
          }; // 1-2-2. 기존 선택이 없는 경우 바로 해당 값 할당
        } else {
          state[2][action.day] = {
            selected: true,
            selectedColor: "#a8d1ff",
          };
        }
        // 현재 선택한 날 입력
        state[4][1] = action.day;
        // 2. 현재 스케쥴을 표시
      } else {
        // 기존 마크 초기화
        state[2] = {};
        // 현재 선택한 타입이 있다면(0인 경우는 누락되므로 추가)
        if (action.select || action.select === 0) {
          state[4][0] = action.select;
        }
        // zero는 아무 의미 없는 역할, 각 키워드에 적절한 색
        const zero = {};
        const ssafy = { key: "ssafy", color: "#5ba8ff" };
        const typeOne = { key: "typeOne", color: "#ffe34f" };
        const typeTwo = { key: "typeTwo", color: "#ffc0cb" };
        // 2-1. 전체보기(모든 타입 표시)의 경우 전체 리스트를 순회
        if (state[4][0] === "all") {
          state[0].map((Schedule) => {
            // 2-1-1. 타입 0(ssafy)인 경우
            if (Schedule.type === 0) {
              // 2-1-1-1. 이미 해당 일의 일정이 있는 경우
              if (state[2][Schedule.day]) {
                // 해당 속성에 ssafy타입이 없는 경우
                if (state[2][Schedule.day].dots[0] === zero) {
                  state[2][Schedule.day].dots[0] = ssafy;
                }
                // 2-1-1-2. 해당 일의 기존 일정이 없는 경우
              } else {
                state[2][Schedule.day] = {
                  ...state[2][`${Schedule.day}`],
                  dots: [ssafy, zero, zero],
                };
              }
            }
            // 2-1-2. 타입 1인 경우
            else if (Schedule.type === 1) {
              // 2-1-2-1. 이미 해당 일의 일정이 있는 경우
              if (state[2][Schedule.day]) {
                // 해당 속성에 타입 1이 없는 경우
                if (state[2][Schedule.day].dots[1] === zero) {
                  state[2][Schedule.day].dots[1] = typeOne;
                } // 2-1-2-2. 해당 일의 기존 일정이 없는 경우
              } else {
                state[2][Schedule.day] = {
                  ...state[2][Schedule.day],
                  dots: [zero, typeOne, zero],
                };
              }
            }
            // 2-1-3. 타입 2인 경우
            else {
              // 2-1-3-1. 이미 해당 일의 일정이 있는 경우
              if (state[2][Schedule.day]) {
                // 해당 속성에 타입 1이 없는 경우
                if (state[2][Schedule.day].dots[2] === zero) {
                  state[2][Schedule.day].dots[2] = typeTwo;
                } // 2-1-3-2. 해당 일의 기존 일정이 없는 경우
              } else {
                state[2][Schedule.day] = {
                  ...state[2][Schedule.day],
                  dots: [zero, zero, typeTwo],
                };
              }
            }
          });
          // 2-2. 타입 1만 보기의 경우 + 타입1인 리스트가 존재할 경우
        } else if (state[4][0] === 1 && action.payload) {
          action.payload.map((Schedule) => {
            // 2-2-1.해당일에 기존 일정이 없는 경우 스타일 추가
            if (!state[2][Schedule.day]) {
              state[2][Schedule.day] = {
                ...state[2][Schedule.day],
                dots: [typeOne],
              };
            }
          });
          // 2-3. 타입 2만 보기의 경우 + 타입2인 리스트가 존재할 경우
        } else if (state[4][0] === 2 && action.payload) {
          action.payload.map((Schedule) => {
            // 2-3-1. 해당일에 기존 일정이 없는 경우 스타일 추가
            if (!state[2][Schedule.day]) {
              state[2][Schedule.day] = {
                ...state[2][Schedule.day],
                dots: [typeTwo],
              };
            }
          });
        }
        // 2-4. ssafy(0)만 선택한 경우 + 타입0인 리스트가 존재한 경우
        else {
          if (action.payload) {
            action.payload.map((Schedule) => {
              // 2-4-1 해당일에 기존 일정이 없는 경우 스타일 추가
              if (!state[2][Schedule.day]) {
                state[2][Schedule.day] = {
                  ...state[2][Schedule.day],
                  dots: [ssafy],
                };
              }
            });
          }
        }
      }
      // 2-5. 현재 선택된 일 표시
      if (state[2][state[4][1]]) {
        // 2-5-1. 기존의 마크가 있다면 추가
        state[2][state[4][1]] = {
          ...state[2][state[4][1]],
          selected: true,
          selectedColor: "#a8d1ff",
        };
        // 2-5-2. 기존의 마크가 없다면 생성
      } else {
        state[2][state[4][1]] = { selected: true, selectedColor: "#a8d1ff" };
      }
    },
  },
});
export default ScheduleList;
