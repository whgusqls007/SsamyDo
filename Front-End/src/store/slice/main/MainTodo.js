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

const baseURL = "http://i7e204.p.ssafy.io:8080/api/todo/todolist/"

function ymdFormat(oriDate=new Date()) {
  let result =
    oriDate.getFullYear().toString() +
    (oriDate.getMonth() + 1).toString().padStart(2, "0") +
    oriDate.getDate().toString().padStart(2, "0");
  return result;
}

// console.log(ymdFormat())
let getTodo

axios({
  method: "get",
  url: `${baseURL}${ymdFormat()}`,
})
  .then((response) => {
    // console.log("Axios 요청 성공!");
    // console.log(response.data);

    getTodo = response.data;
    // console.log(getTodo)
  })
  .catch((error) => {
    console.log(error.response);
  });

const MainTodo = createSlice({
  name: 'MainTodo',
  // 기본 state 값 
  initialState: [],
  reducers: {

  },
  extraReducers: {
    [getTodo.fulfilled]: (state, action) => {
      // console.log(state)
      return state = action.payload;
      state.list = action.payload;
      // console.log('fulfilled')
    },
  },
});

// console.log('--------------------------------')
// console.log(MainTodo)
export default MainTodo;

// export { completedTodo } from MainTodo.actions;