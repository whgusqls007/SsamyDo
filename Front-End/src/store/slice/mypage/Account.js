import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default Account = createSlice({
  name: "Account",
  initialState: { id: "", eduPassword: "", MMpassword: "", Tokken: "" },
  reducers: {
    import(state, action) {
      state = action.payload;
    },
    // secureStorage 사용해서 추가
    save(state) {
      AsyncStorage.setItem("User", JSON.stringify(state));
    },
  },
});
