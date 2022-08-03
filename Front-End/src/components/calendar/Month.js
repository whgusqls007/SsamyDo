import { View, Text, Button } from "react-native";
import styles from "../../../app.module.css";
import CustomCalendar from "./CustomCalendar";
import SchedulList from "./ScheduleList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Month() {
  const TodoList = useSelector((state) => {
    return state.TodoList[0];
  });
  const oneTodoList = useSelector((state) => {
    return state.TodoList[2];
  });
  const twoTodoList = useSelector((state) => {
    return state.TodoList[3];
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "TodoList/mark", select: "전체" });
  });

  return (
    <View>
      <View style={[{ flexDirection: "row", margin: 5 }]}>
        <Button
          title="전체"
          onPress={() => {
            dispatch({ type: "TodoList/mark", select: "전체" });
          }}
        />
        <Button
          title="스터디"
          onPress={() => {
            dispatch({ type: "TodoList/mark", select: 1 });
          }}
        />
        <Button
          title="개인일정"
          onPress={() => {
            dispatch({ type: "TodoList/mark", select: 2 });
          }}
        />
      </View>
      <CustomCalendar />
      <SchedulList />
    </View>
  );
}
