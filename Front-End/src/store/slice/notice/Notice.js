import { createSlice } from "@reduxjs/toolkit";

const Notice = createSlice({
  name: "Notice",
  initialState: [[]],
  reducers: {
    import(state, action) {
      state[0] = action.payload;
    },
  },
});

export default Notice;
