import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import example from "./example/examSlice";
import MainTodo from "./slice/main/MainTodo";
import Schedule from "./slice/calendar/Schedule";
import ScheduleList from "./slice/calendar/ScheduleList";
import { createSelector } from "@reduxjs/toolkit";
import Setting from "./slice/mypage/Setting";
import Account from "./slice/mypage/Account";
import logger from "redux-logger";

const reducer = combineReducers({ MainTodo: MainTodo.reducer });

const store = configureStore({
  reducer: {
    example: example.reducer,
    Schedule: Schedule.reducer,
    ScheduleList: ScheduleList.reducer,
    // MainTodo: MainTodo.reducer,
    Setting: Setting.reducer,
    Account: Account.reducer,
  },
  middleware: [...getDefaultMiddleware(), logger],
});

export const allSelector = (state) => state.ScheduleList[0];

export const ssafySelector = createSelector(allSelector, (all) =>
  all.filter((Schedule) => Schedule.type === 0)
);

export const typeOneSelector = createSelector(allSelector, (all) =>
  all.filter((Schedule) => Schedule.type === 1)
);

export const typeTwoSelector = createSelector(allSelector, (all) =>
  all.filter((Schedule) => Schedule.type === 2)
);

export default store;
