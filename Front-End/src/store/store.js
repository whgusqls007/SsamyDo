import { configureStore } from "@reduxjs/toolkit";
import example from "./example/examSlice";

const store = configureStore({
  reducer: {
    example: example.reducer,
  },
});

export default store;
