import { View, Text, Button } from "react-native";
import TimeLine from "../components/main/TimeLine";
import TodoList from "../components/main/TodoList";
import styles from "../../app.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Main({ navigation }) {
  const dispatch = useDispatch();
  useEffect(() => {
    AsyncStorage.getItem("ScheduleList", (err, result) => {
      if (result) {
        dispatch({
          type: "ScheduleList/import",
          payload: JSON.parse(result),
        });
      }
    });
  });
  return (
    <View style={[styles.border, styles.checkarea]}>
      <Text>김싸피님, 반갑습니다!</Text>
      {/* <Text>Main</Text> */}
      <View style={styles.todoarea}>
        <TodoList navigation={navigation} />
      </View>
      <View style={styles.timelinearea}>
        <TimeLine />
      </View>
    </View>
  );
}
