import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// 그냥 요청 받아서 state에 넣어두는 역할..
// 비동기 요청 보내고 받아오는 애 ,,,

// export const getTodo = createAsyncThunk("GET_TODO", async() => {
//     const response = await axios.get("http://i7e204.p.ssafy.io:8080/api/todo/todolist/20220812");
//     console.log(`axios todo ${response.status}`)
//     return response.data;
//   });

// dueDate가 아직 오지 않은 모든 투두 받기 


const MainTodo = createSlice({
  name: 'MainTodo',
  // 기본 state 값 
  initialState: [],
  reducers: {
    import ( state, action ) {
      state = JSON.stringify(action.payload)
      // console.log(`todo 받아온거 ${state}`)
    },

  },
  extraReducers: {

  },
});

// console.log('--------------------------------')
// console.log(MainTodo)
export default MainTodo;

// export { completedTodo } from MainTodo.actions;