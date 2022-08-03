import { View, Text } from "react-native";
import ScheduleItem from "./ScheduleItem";
import styles from "../../../app.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function ScheduleList({ navigation }) {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch({ type: "TodoList/filter", select: "2022-08-03" });
  // });
  const TodoList = useSelector((state) => {
    return state.TodoList[4];
  });
  return (
    <View style={styles.one}>
      <Text>{TodoList}</Text>
      <Text>ScheduleList.js</Text>
      {/* {TodoList.map((todo) => {
        <ScheduleItem navigation={navigation} key={todo.id} todo={[todo]} />;
      })} */}
    </View>
  );
}
