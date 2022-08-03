import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TodoList = createSlice({
  name: "TodoList",
  // 0 : 전체 ToDo리스트, 1: LastId, 2: 1번 타입 리스트, 3: 2번 분류 리스트
  // 4: 현재 보여줄 리스트[전체, ssafy, type1, type2], 5: 달력에 표시 변수
  initialState: [[], 0, [], [], [], {}],
  reducers: {
    // local 정보 읽기  + 추가필요(ssafy 공지의 경우 local에 저장하지 않으므로 따로 사용)
    import: (state, action) => {
      state[0] = action.payload.TodoList;
      state[1] = action.payload.lastId;
      state[0].map((todo) => {
        if (todo.type === 1) {
          state[2].push(todo);
        } else if (todo.type === 2) {
          state[3].push(todo);
        }
      });
    },
    // local에 현재 데이터 저장
    save: (state) => {
      AsyncStorage.setItem(
        "TodoList",
        JSON.stringify({ TodoList: state[0], lastId: state[1] }),
        () => {}
      );
    },
    // TodoList에 추가
    add: (state, action) => {
      state[0].push(action.payload);
      console.log(action.payload);
      if (action.payload.type === 1) {
        state[2].push(action.payload);
      } else if (action.payload.type === 2) {
        state[3].push(action.payload);
      }
      state[1] += 1;
    },
    // 특정 Todo 수정
    update: (state, action) => {
      const index = state[0].map((todo) => {
        if (todo.id === action.payload.id) {
          state[0].indexOf(todo);
        }
      });
      state[0][index] = action.payload;
    },
    // 특정 Todo 삭제
    delete: (state, action) => {
      // 1. 전체 TodoList에서 해당 Todo 삭제
      const index = state[0].map((todo) => {
        if (todo.id === action.payload.id) {
          state[0].indexOf(todo);
        }
      });
      state[0].splice(index, 1);
      // 2-1. typ1인 TodoList에서 해당 Todo 삭제
      if (action.payload.type == "1") {
        const index = state[1].map((todo) => {
          if (todo.id === action.payload.id) {
            state[1].indexOf(todo);
          }
        });
        state[1].splice(index, 1);
        // 2-1. typ2인 TodoList에서 해당 Todo 삭제
      } else if (action.payload.type == "2") {
        const index = state[2].map((todo) => {
          if (todo.id === action.payload.id) {
            state[2].indexOf(todo);
          }
        });
        state[2].splice(index, 1);
      }
    },

    // 현재보여줄 ToDo 목록
    // filter: (state, action) => {
    //   console.log("filter");
    //   // 목록 초기화
    //   state[4] = [];
    //   // 날짜 필터링
    //   state[4] = state[0].filter((todo) => {
    //     console.log(todo);
    //     return todo.end === action.select;
    //   });
    //   console.log(state[4]);
    // },

    // 버튼을 눌러서 Todo의 Type 변경시 보여줄 캘린더 속성 제작
    mark: (state, action) => {
      // 스타일 초기화
      state[5] = {};
      // zero는 아무 의미 없는 역할
      const zero = {};
      const ssafy = { key: "ssafy", color: "blue" };
      const typeOne = { key: "typeOne", color: "red" };
      const typeTwo = { key: "typeTwo", color: "green" };
      // 1. 전체보기의 경우
      if (action.select === "전체") {
        state[0].map((todo) => {
          // 1-1. 타입 0(ssafy)인 경우
          if (todo.type === 0) {
            // 1-1-1. 이미 해당 일의 일정이 있는 경우
            if (state[5][`${todo.end}`]) {
              // 해당 속성에 ssafy타입이 없는 경우
              if (state[5][`${todo.end}`].dots[0] === zero) {
                state[5][`${todo.end}`].dots[0] = ssafy;
              }
              // 1-1-2. 해당 일의 기존 일정이 없는 경우
            } else {
              state[5][`${todo.end}`] = {
                dots: [ssafy, zero, zero],
              };
            }
          }
          // 1-2. 타입 1인 경우
          else if (todo.type === 1) {
            // 1-2-1. 이미 해당 일의 일정이 있는 경우
            if (state[5][`${todo.end}`]) {
              // 해당 속성에 타입 1이 없는 경우
              if (state[5][`${todo.end}`].dots[1] === zero) {
                state[5][`${todo.end}`].dots[1] = typeOne;
              } // 1-2-2. 해당 일의 기존 일정이 없는 경우
            } else {
              state[5][`${todo.end}`] = {
                dots: [zero, typeOne, zero],
              };
            }
          }
          // 1-3. 타입 2인 경우
          else {
            // 1-3-1. 이미 해당 일의 일정이 있는 경우
            if (state[5][`${todo.end}`]) {
              // 해당 속성에 타입 1이 없는 경우
              if (state[5][`${todo.end}`].dots[2] === zero) {
                state[5][`${todo.end}`].dots[2] = typeTwo;
              } // 1-3-2. 해당 일의 기존 일정이 없는 경우
            } else {
              state[5][`${todo.end}`] = {
                dots: [zero, zero, typeTwo],
              };
            }
          }
        });
        // 2. 타입 1만 보기의 경우
      } else if (action.select === 1) {
        state[2].map((todo) => {
          // 2-1.해당일에 기존 일정이 없는 경우 스타일 추가
          if (!state[5][`${todo.end}`]) {
            state[5][`${todo.end}`] = {
              dots: [typeOne],
            };
          }
        });
        // 3. 타입 2만 보기의 경우
      } else if (action.select === 2) {
        state[3].map((todo) => {
          // 3-1. 해당일에 기존 일정이 없는 경우 스타일 추가
          if (!state[5][`${todo.end}`]) {
            state[5][`${todo.end}`] = {
              dots: [typeTwo],
            };
          }
        });
      }
      // ssafy(0)만 선택한 경우 추가 필요
      // else {
      // state[].map((todo) => {
      //   if (!state[5][`${todo.end}`]) {
      //     state[5][`${todo.end}`] = {
      //       dots: [ssafy],
      //     };
      //   }
      // })
      // }
    },
  },
});
export default TodoList;
