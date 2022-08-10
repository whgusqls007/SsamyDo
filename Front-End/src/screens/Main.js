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
        dispatch({
          type: "ScheduleList/import",
          payload: JSON.parse(result),
        });
      }
    });
    // 사용자 설정 불러오기
    // AsyncStorage.getItem("Setting", (err, result) => {
    //   if (result) {
    //     dispatch({ type: "Setting/import", payload: JSON.parse(result) });
    //   }
    // });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* <Text>Main</Text> */}
      <TodoList navigation={navigation} style={{ flex: 2 }} />
      <TimeLine style={{ flex: 3 }} />
    </View>
  );
}
