import { createSlice } from "@reduxjs/toolkit";

const MainTodo = createSlice({
  name: "MainTodo",
  // 기본 state 값
  initialState: [],
  reducers: {
    import(state, action) {
      state = JSON.stringify(action.payload);
    },
  },
  extraReducers: {},
});
export default MainTodo;
