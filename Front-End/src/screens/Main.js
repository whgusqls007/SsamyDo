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
    AsyncStorage.getItem("ScheduleList", (err, result) => {
      if (result) {
        console.log(`main schedule get`)
        dispatch({
          type: "ScheduleList/import",
          payload: JSON.parse(result),
        });
      }
      AsyncStorage.getItem("TodoStatus", (err, res) => {
        if (res) {
          dispatch({type: "TodoStatus/import", payload: res})
        }
      })
    });

    // AsyncStorage.getItem("TodoStatus", (err,result) => {
    //   if (result) {
    //     console.log(`result ${result}`)
    //     dispatch({
    //       type: "TodoStatus/import",
    //       payload: JSON.parse(result),
    //     });
    //   }
    // });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* <Text>Main</Text> */}
      <TodoList navigation={navigation} style={{ flex: 1 }} />
      <TimeLine style={{ flex: 3 }} />
    </View>
  );
}
