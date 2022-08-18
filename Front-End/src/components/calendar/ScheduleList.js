import { View, ScrollView, Text } from "react-native";
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
    <View>
      {/* 리스트 값이 없을 수 있으므로 조건부 */}
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 2,
          width: "95%",
          alignItems: "center",
          backgroundColor: "#A8D1FF",
        }}
      >
        <Text style={{ fontWeight: "bold", color: "white" }}>
          {selectDay} 일정
        </Text>
      </View>
      <ScrollView style={{ maxHeight: 270 }}>
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
