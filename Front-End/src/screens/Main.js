import { View, Text, Button } from "react-native";
import TimeLine from "../components/main/TimeLine";
import TodoList from "../components/main/TodoList";
import styles from "../../app.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


// main창 들어오자마자 todo 정보 받아서 넣기 -> TodoList로 넘기기 ,, 
// 지금 적힌 코드 현우님꺼 ,, local에서 불러오는 코드다 
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
  }, []);
  return (
    <View style={[styles.border]}>
      <TodoList navigation={navigation} />
      <TimeLine />
    </View>
  );
}
