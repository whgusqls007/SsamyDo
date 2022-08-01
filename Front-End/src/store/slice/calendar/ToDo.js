import { createSlice } from "@reduxjs/toolkit";
import MakeSchedule from "../../../components/calendar/MakeSchedule";

const Todo = createSlice({
  name: "Todo",
  initialState: {
    type: "",
    title: "",
    content: "",
    status: false,
    start: "",
    end: "",
  },
  reducers: {
    select: (state, action) => {
      state.type = action.select;
    },

    title: (state, action) => {
      state.title = action.title;
    },

    content: (state, action) => {
      state.content = action.content;
    },

    start: (state, action) => {
      state.start = action.start;
    },

    end: (state, action) => {
      state.end = action.end;
    },

    clear(state) {
      Object.assign(state, {
        type: "",
        title: "",
        content: "",
        status: false,
        start: "",
        end: "",
      });
    },
  },
});
export default Todo;
