import { View, Text, ScrollView } from "react-native";
import ScheduleItem from "./ScheduleItem";
import styles from "../../../app.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function ScheduleList({ navigation }) {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch({ type: "TodoList/filter", select: "2022-08-03" });
  // });
  const TodoList = useSelector((state) => {
    return state.TodoList[0];
  });

  return (
    <View>
      <Text>ScheduleList.js</Text>
      <ScrollView style={{ border: "1 black" }}>
        {TodoList.map((todo) => {
          return (
            <ScheduleItem navigation={navigation} todo={todo} key={todo.id} />
          );
        })}
      </ScrollView>
    </View>
  );
}
