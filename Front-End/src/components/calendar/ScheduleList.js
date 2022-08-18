import { View, ScrollView, Text, StyleSheet } from "react-native";
import ScheduleItem from "./ScheduleItem";
import styles from "../../../app.module.css";
import { useSelector } from "react-redux";

export default function ScheduleList({ navigation }) {
  // 보여줄 해당일의 일정
  const ScheduleList = useSelector((state) => {
    return state.ScheduleList[3];
  });

  const selectDay = useSelector((state) => {
    return state.ScheduleList[4][1];
  });

  return (
    <View style={CalendarStyle.pickdayContainer}>
      {/* 리스트 값이 없을 수 있으므로 조건부 */}
      <View style={CalendarStyle.pickdayTitle}>
        <Text style={CalendarStyle.pickdayText}>
          {selectDay.slice(0, 4)}년 {selectDay.slice(5, 7)}월{" "}
          {selectDay.slice(8, 10)}일
        </Text>
      </View>
      <ScrollView>
        {ScheduleList.map((Schedule) => {
          return (
            <ScheduleItem
              navigation={navigation}
              Schedule={Schedule}
              key={Schedule.id}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const CalendarStyle = StyleSheet.create({
  pickdayContainer: {
    // flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5ba8ff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
    height: "45%",
  },
  pickdayTitle: {
    width: "100%",
    paddingLeft: "4%",
    paddingVertical: "6%",
  },
  pickdayText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
