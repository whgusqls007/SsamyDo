import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const MainTodo = createSlice({
  name: 'MainTodo',
  // 기본 state 값 
  // isCompleted default False 
  initialState: {
    
  },
  reducers: {

    // isCompleted로 변경 => 이게 필요한가 ..? 
    // TodoStatus에서 처리하게 둬서 주석 처리 해뒀습니다.
    // completedTodo(state, action) {
    //   if (todo) {
    //     todo.isCompleted = !todo.isCompleted
    //   };
    // }

    
  }
});

export default MainTodo;

// export { completedTodo } from MainTodo.actions;