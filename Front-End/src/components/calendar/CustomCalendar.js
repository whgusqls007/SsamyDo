import { Calendar, LocaleConfig, Agenda } from "react-native-calendars";
import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  ssafySelector,
  typeOneSelector,
  typeTwoSelector,
} from "../../store/store";

LocaleConfig.locales["ssamydo"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aou",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
  today: "Today",
};
LocaleConfig.defaultLocale = "ssamydo";

export default function CustomCalendar() {
  const typeList = [
    useSelector(ssafySelector),
    useSelector(typeOneSelector),
    useSelector(typeTwoSelector),
  ];
  // const ssafy = useSelector(ssafySelector);
  // const typeOne = useSelector(typeOneSelector);
  // const typeTwo = useSelector(typeTwoSelector);
  const dispatch = useDispatch();
  const markDate = useSelector((state) => {
    return state.ScheduleList[2];
  });
  const type = useSelector((state) => {
    return state.ScheduleList[4];
  });

  return (
    <View>
      <Calendar
        onDayPress={(day) => {
          if (type === "all") {
            dispatch({ type: "ScheduleList/filter", select: day.dateString });
          } else {
            dispatch({
              type: "ScheduleList/filter",
              select: day.dateString,
              payload: typeList[type],
            });
          }
        }}
        hideExtraDays={true}
        enableSwipeMonths={true}
        // 테마
        theme={theme}
        // 일정표시 기능
        markingType={"multi-dot"}
        markedDates={markDate}
      />
    </View>
  );
}

const theme = {
  "stylesheet.calendar.header": {
    dayTextAtIndex0: {
      color: "red",
    },
    dayTextAtIndex6: {
      color: "blue",
    },
  },
};
