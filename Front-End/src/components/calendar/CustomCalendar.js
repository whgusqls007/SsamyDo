import { Calendar, LocaleConfig } from "react-native-calendars";
import { View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  ssafySelector,
  typeOneSelector,
  typeTwoSelector,
} from "../../store/store";

LocaleConfig.locales["ssamydo"] = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
  dayNamesShort: ["SUN ", "MON", "TUE ", "WED", " THU", " FRI", " SAT"],
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
    return state.ScheduleList[4][0];
  });

  return (
    <View>
      <Calendar
        onDayPress={(day) => {
          // 전체보기에는 해당 일자(문자형식 YYYY-MM-DD 만 인자로 보냄)
          if (type === "all") {
            // 우선 캘린더에 점을 표시하기 위해 mark 실행
            dispatch({ type: "ScheduleList/mark", day: day.dateString });
            // 우선 필터링된 리스트를 보기 위해 filter 실행
            dispatch({ type: "ScheduleList/filter" });
          } else {
            // 타입별 보기의 경우 해당 타입의 리스트도 보냄(Schedule.js에는 createSelector X) ?? 뭐였지
            // 캘린더에 점을 표시하기 위해 mark 실행(해당 리스트도 같이 보내줌)
            dispatch({
              type: "ScheduleList/mark",
              day: day.dateString,
              payload: typeList[type],
            });
            // 필터링된 리스트를 보기 위해 filter 실행(해당 리스트도 같이 보내줌)
            dispatch({
              type: "ScheduleList/filter",
              payload: typeList[type],
            });
          }
        }}
        style={CustomCalendarStyles.style}
        hideExtraDays={true}
        // 일정표시 기능
        markingType={"multi-dot"}
        markedDates={markDate}
        theme={{
          dayTextColor: "#111111",
          textSectionTitleColor: "#888888",
          arrowColor: "#888888",
          todayTextColor: "#5BA8FF",
          backgroundColor: "#ffffff",
          "stylesheet.calendar.header": {
            dayTextAtIndex0: {
              color: "red",
            },
            dayTextAtIndex6: {
              color: "blue",
            },
          },
        }}
      />
    </View>
  );
}

const CustomCalendarStyles = StyleSheet.create({
  style: {
    marginVertical: 5,
    marginHorizontal: 10,
    width: 390,
    height: 320,
    borderRadius: 5,
  },
});
