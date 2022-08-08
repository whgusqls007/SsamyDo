import { createSlice } from "@reduxjs/toolkit";

const example = createSlice({
  name: "example",
  initialState: { valueOne: 0, valueTwo: false, valueThree: "" },
  reducers: {
    plus: (state, action) => {
      state.valueOne = state.valueOne + action.step;
      // console.log(state.valueOne);
    },
    change: (state) => {
      state.valueTwo = !state.valueTwo;
      // console.log(state.valueTwo);
    },
    input: (state, action) => {
      state.valueThree = action.payload;
      // console.log(state.valueThree);
    },
    delete: (state) => {
      state.valueOne = 0;
      state.valueTwo = false;
      state.valueThree = "";
      // console.log(state);
    },
  },
});

export default example;
export const { input } = example.actions;
