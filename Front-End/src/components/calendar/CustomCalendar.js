import { Calendar, LocaleConfig, Agenda } from "react-native-calendars";
import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

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
  const dispatch = useDispatch();
  const markDate = useSelector((state) => {
    return state.TodoList[5];
  });
  return (
    <View>
      <Calendar
        // onDayPress={(day) => {
        //   dispatch({ type: "TodoList/filter", select: day.dateString });
        // }}
        hideExtraDays={true}
        enableSwipeMonths={true}
        theme={{
          "stylesheet.calendar.header": {
            dayTextAtIndex0: {
              color: "red",
            },
            dayTextAtIndex6: {
              color: "blue",
            },
          },
        }}
        // 일정표시 기능
        markingType={"multi-dot"}
        markedDates={markDate}
      />
    </View>
  );
}
