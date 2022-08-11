import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import example from "./example/examSlice";
import MainTodo from "./slice/main/MainTodo";
import Schedule from "./slice/calendar/Schedule";
import ScheduleList from "./slice/calendar/ScheduleList";
import { createSelector } from "@reduxjs/toolkit";
import Setting from "./slice/page/Setting";
import logger from "redux-logger";
import TodoStatus from "./slice/main/TodoStatus";
import Notice from "./slice/notice/Notice";

// const reducer = combineReducers({ MainTodo: MainTodo.reducer });

const store = configureStore({
  reducer: {
    example: example.reducer,
    Schedule: Schedule.reducer,
    ScheduleList: ScheduleList.reducer,
    MainTodo: combineReducers({ MainTodo: MainTodo.reducer }),
    Setting: Setting.reducer,
    TodoStatus : TodoStatus.reducer,
    Notice: combineReducers({ Notice: Notice.reducer })
  },
  // middleware: [...getDefaultMiddleware(), logger],
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


export const allNotice = (state) => state.Notice

export const mmSelector = createSelector(allNotice, (all) =>
  all.filter((Notice) => Notice.route === 'MM')
);

export const eduSelector = createSelector(allSelector, (all) =>
  all.filter((Notice) => Notice.route === 'Edu')
);


// export const todoStatusNow = (state) => state.TodoStatus

export default store;
