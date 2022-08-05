import { configureStore } from "@reduxjs/toolkit";
import Schedule from "./slice/calendar/Schedule";
import ScheduleList from "./slice/calendar/ScheduleList";
import { createSelector } from "@reduxjs/toolkit";

export const allSelector = (state) => state.ScheduleList[0];

export const ssafySelector = createSelector(allSelector, (all) => {
  all.filter((Schedule) => Schedule.type === 0);
});

export const typeOneSelector = createSelector(allSelector, (all) =>
  all.filter((Schedule) => Schedule.type === 1)
);

export const typeTwoSelector = createSelector(allSelector, (all) =>
  all.filter((Schedule) => Schedule.type === 2)
);

const store = configureStore({
  reducer: {
    Schedule: Schedule.reducer,
    ScheduleList: ScheduleList.reducer,
  },
});

export default store;
