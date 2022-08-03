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
    AsyncStorage.getItem("TodoList", (err, result) => {
      if (result) {
        dispatch({
          type: "TodoList/import",
          payload: JSON.parse(result),
        });
      }
    });
  });
  return (
    <View style={[styles.border]}>
      <Text>Main</Text>
      <TodoList navigation={navigation} />
      <TimeLine />
    </View>
  );
}
