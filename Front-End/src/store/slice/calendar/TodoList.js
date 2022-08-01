import { createSlice } from "@reduxjs/toolkit";

const TodoList = createSlice({
  name: "TodoList",
  initialState: {
    todoList: [],
    lastID: 0,
  },
  reducers: {
    import: (state, action) => {
      // local 정보 읽기
      state.todoList = action.payload.todoList;
      state.lastID = action.payload.lastID;
    },

    save: (state) => {
      // local에 저장
    },

    add: (state, action) => {
      state.todoList.push(action.todo);
      state.lastID += 1;
    },

    update: (state, action) => {
      const index = state.list.indexOf(action.payload);
      state[index] = action.payload;
    },

    delete: (state, action) => {
      const index = state.list.indexOf(action.payload);
      state.splice(index, 1);
    },
  },
});
export default TodoList;
