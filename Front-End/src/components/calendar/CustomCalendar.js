import { Calendar, LocaleConfig, Agenda } from "react-native-calendars";
import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  ssafySelector,
  typeOneSelector,
  typeTwoSelector,
} from "../../store/store";
import Schedule from "../../store/slice/calendar/Schedule";

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
  // 시작시 해당 일자로 리스트 나오는 설정
  useEffect(() => {
    const date = new Date();
    dispatch({
      type: "ScheduleList/filter",
      // getMonth는 1월이 0이기 때문에 +1해야함
      select: "all",
      day: `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`,
    });
    dispatch({
      type: "ScheduleList/mark",
      select: "all",
    });
  }, []);
  // 분류별 리스트 CreateSelector 값 불러오기
  const typeList = [
    useSelector(ssafySelector),
    useSelector(typeOneSelector),
    useSelector(typeTwoSelector),
  ];
  // 캘린더에 일정 표시를 위한 store내 변수 선택
  const markDate = useSelector((state) => {
    return state.ScheduleList[2];
  });
  // 현재 달력에서 보일 타입 선택(타입에 따라 캘린더 마크가 변경)
  const type = useSelector((state) => {
    return state.ScheduleList[4];
  });

  return (
    <View>
      <Calendar
        onDayPress={(day) => {
          // 전체보기에는 해당 일자(문자형식 YYYY-MM-DD 만 인자로 보냄)
          if (type === "all") {
            dispatch({ type: "ScheduleList/filter", select: day.dateString });
            dispatch({
              type: "ScheduleList/dayMark",
              select: day.dateString,
              dayMark: 1,
            });
          } else {
            // 타입별 보기의 경우 해당 타입의 리스트도 보냄(Schedule.js에는 createSelector X)
            dispatch({
              type: "ScheduleList/filter",
              select: day.dateString,
              payload: typeList[type],
            });
            dispatch({
              type: "ScheduleList/dayMark",
              select: day.dateString,
              dayMark: 1,
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

// 안먹히는 중
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
