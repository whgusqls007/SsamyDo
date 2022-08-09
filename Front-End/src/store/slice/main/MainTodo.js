import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// 비동기 요청 보내고 받아오는 애 ,,,

export const getTodo = createAsyncThunk("GET_TODO", async() => {
    const response = await axios.get("https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90");
    return response.data;
  });


const MainTodo = createSlice({
  name: 'MainTodo',
  // 기본 state 값 
  initialState: [],
  reducers: {

  },
  extraReducers: {
    [getTodo.fulfilled]: (state, action) => {
      state.list = action.payload;
      console.log('fulfilled')
    },
  },
});

// console.log('--------------------------------')
// console.log(MainTodo)
export default MainTodo;

// export { completedTodo } from MainTodo.actions;