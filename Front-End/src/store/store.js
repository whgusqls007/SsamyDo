import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import MainTodo from "./slice/main/MainTodo";
import Schedule from "./slice/calendar/Schedule";
import ScheduleList from "./slice/calendar/ScheduleList";
import { createSelector } from "@reduxjs/toolkit";
import TodoStatus from "./slice/main/TodoStatus";
import Notice from "./slice/notice/Notice";
import Account from "./slice/mypage/Account";

const store = configureStore({
  reducer: {
    Schedule: Schedule.reducer,
    ScheduleList: ScheduleList.reducer,
    MainTodo: combineReducers({ MainTodo: MainTodo.reducer }),
    Account: Account.reducer,
    TodoStatus: TodoStatus.reducer,
    Notice: Notice.reducer,
  },
  middleware: [...getDefaultMiddleware()],
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

export const allNotice = (state) => state.Notice;

export const mmSelector = createSelector(allNotice, (all) =>
  all.filter((Notice) => Notice.route === "MM")
);

export const eduSelector = createSelector(allSelector, (all) =>
  all.filter((Notice) => Notice.route === "Edu")
);

export default store;
