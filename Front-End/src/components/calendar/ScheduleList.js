import { View, Text, ScrollView } from "react-native";
import ScheduleItem from "./ScheduleItem";
import styles from "../../../app.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function ScheduleList({ navigation }) {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch({ type: "ScheduleList/filter", select: "2022-08-03" });
  // });
  const ScheduleList = useSelector((state) => {
    return state.ScheduleList[0];
  });

  return (
    <View>
      <Text>ScheduleList.js</Text>
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
