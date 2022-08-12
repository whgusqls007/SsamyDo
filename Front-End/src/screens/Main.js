import { View, Text, Button, TouchableOpacity } from "react-native";
import TimeLine from "../components/main/TimeLine";
import TodoList from "../components/main/TodoList";
import styles from "../../app.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTodo } from "../store/slice/main/MainTodo";

export default function Main({ navigation }) {
  const dispatch = useDispatch();
  useEffect(() => {
    // 실제 연결 후 getAllKeys로 통합할 수 있는 지 확인
    AsyncStorage.getItem("ScheduleList", (err, result) => {
      if (result) {
        console.log(`main schedule get`);
        dispatch({
          type: "ScheduleList/import",
          payload: JSON.parse(result),
        });
      }
      AsyncStorage.getItem("TodoStatus", (err, res) => {
        if (res) {
          dispatch({ type: "TodoStatus/import", payload: res });
        }
      });
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* <Text>Main</Text> */}
      <TodoList navigation={navigation} style={{ flex: 1 }} />
      <TimeLine style={{ flex: 3 }} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          AsyncStorage.removeItem("Account");
        }}
      >
        <Text>로컬 삭제</Text>
      </TouchableOpacity>
    </View>
  );
}
