import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// export const getNotice = createAsyncThunk("GET_NOTICE", async()=>{
//   const response = await axios.get("url")
//   return response.data;
// });

const baseURL = "http://i7e204.p.ssafy.io:8080/api/notice/page/1"

// function ymdFormat(oriDate=new Date()) {
//   let result =
//     oriDate.getFullYear().toString() +
//     (oriDate.getMonth() + 1).toString().padStart(2, "0") +
//     oriDate.getDate().toString().padStart(2, "0");
//   return result;
// }

// console.log(ymdFormat())

const Notice = createSlice({
  name: 'Notice',
  initialState: [],
  reducers : {
    import(state, action) {
      state = action.payload
    }
  },
});


export default Notice;