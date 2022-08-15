import { View, ScrollView, Text } from "react-native";
import ScheduleItem from "./ScheduleItem";
import styles from "../../../app.module.css";
import { useSelector } from "react-redux";

export default function ScheduleList({ navigation }) {
  const ScheduleList = useSelector((state) => {
    return state.ScheduleList[3];
  });

  return (
    <View>
      {/* 리스트 값이 없을 수 있으므로 조건부 */}
      {ScheduleItem[0] && <Text>{ScheduleList[0].day} 일정</Text>}
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
