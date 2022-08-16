import { View, StyleSheet, Text } from "react-native";
import TimeLine from "../components/main/TimeLine";
import TodoList from "../components/main/TodoList";
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
    <View style={mainStyles.mainContainer}>
      <View style={mainStyles.helloContainer}>
        <Text style={mainStyles.helloText}>김싸피님, 안녕하세요!</Text>
      </View>
      <TodoList navigation={navigation} />
      <TimeLine />
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => {
          AsyncStorage.removeItem("Account");
          AsyncStorage.removeItem("Setting");
        }}
      >
        <Text>로컬 삭제</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const mainStyles = StyleSheet.create({
  helloContainer: {
    paddingTop: 30,
    paddingLeft: 20,
  },
  helloText: {
    fontSize: 20,
    color: "#ffffff",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#5ba8ff",
  },
});
