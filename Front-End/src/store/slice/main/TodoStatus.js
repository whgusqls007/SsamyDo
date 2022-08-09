import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const TodoStatus = createSlice({
  name:'TodoStatus',

  // todo 상태는 로컬에 저장 
  // notice id : , isCompleted : True 
  initialState: [{id: '', isCompleted: false}],
  reducers : {

    // saveStatus 현재 상태 저장 
    savestatus: (state) => {
      AsyncStorage.setItem(
        "TodoStatus",
        // todo id, iscompleted T 값인 것들만 store에 저장
        JSON.stringify({ TodoId: state.id, isCompleted: true }),
        () => {}
      );
    }, 
    // 완료한 투두 생성 
    addstatus: (state, action) => {
      // action.payload로 넣어뒀는데 
      // 완료한 todo id, isCompleted 값 [{},{}] 형식으로 추가 .. 
      state.push(action.payload);
      // console.log(action.payload);
    },
  }
})


export default TodoStatus;