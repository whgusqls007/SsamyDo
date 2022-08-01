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
  const TodoList = useSelector((state) => {
    return state.TodoList;
  });

  return (
    <View>
      <Calendar
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
        markedDates={{
          "2022-07-16": { selected: true, marked: true, selectedColor: "blue" },
          "2022-07-17": { marked: true },
          "2022-07-18": { marked: true, dotColor: "red", activeOpacity: 0 },
          "2022-07-19": { disabled: true, disableTouchEvent: true },
        }}
      />
      <Agenda
        items={{
          "2012-05-22": [{ name: "item 1 - any js object" }],
          "2012-05-23": [{ name: "item 2 - any js object", height: 80 }],
          "2012-05-24": [],
          "2012-05-25": [
            { name: "item 3 - any js object" },
            { name: "any js object" },
          ],
        }}
      />
    </View>
  );
}
