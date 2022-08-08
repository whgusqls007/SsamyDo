import { View, ScrollView, Text } from "react-native";
import ScheduleItem from "./ScheduleItem";
import styles from "../../../app.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function ScheduleList({ navigation }) {
  const dispatch = useDispatch();
  const ScheduleList = useSelector((state) => {
    return state.ScheduleList[3];
  });

  return (
    <View>
      {ScheduleList[0] && <Text>{ScheduleList[0].day} 일정</Text>}
      <ScrollView style={{ maxHeight: 300 }}>
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
