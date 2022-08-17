import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const TodoStatus = createSlice({
  name:'TodoStatus',

  // todo 상태는 로컬에 저장 -> todo id, completed 여부만 저장
  // notice id : , isCompleted : True 
  initialState: [[]],
  reducers : {

    //local 정보 읽기
    import: (state, action) => {
      // console.log(`import ------------ ${action.payload}`)
      // console.log(typeof(action.payload))
      state[0] = JSON.parse(action.payload);
    },
    // saveStatus 현재 상태 저장 
    savestatus: (state) => {
      AsyncStorage.setItem(
        "TodoStatus",
        // todo id, iscompleted T 값인 것들만 store에 저장
        JSON.stringify(state[0])
      );
    }, 
    // 완료한 투두 생성 
    addstatus: (state, action) => {
      // console.log(`state -  - - - - - - - - -${state}`)
      // console.log(`action ------------ ${action.payload}`)
      state[0].push(action.payload);
      // console.log(`state ------------ ${state[0]}`)
    },

    print: (state) => {
      console.log(state[0])
    }
  }
})


export default TodoStatus;