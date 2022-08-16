import { View, StyleSheet, Text } from "react-native";
import TimeLine from "../components/main/TimeLine";
import TodoList from "../components/main/TodoList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTodo } from "../store/slice/main/MainTodo";
import axios from "axios";

export default function Main({ navigation }) {
  const dispatch = useDispatch();
  const baseURL = "http://i7e204.p.ssafy.io:8080/api/todo/todolist/";
  const [todoList, setTodoList] = useState([]);
  // const todoList = useSelector(state => state.MainTodo)
  const onFetchTodo = (res) => {
    setTodoList(res);
  }  

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

  useEffect(()=> {
    async function fetchTodo(){
      const response = await axios.get(baseURL);
      // console.log(`젼님 코드 보고 바뀐거 ${response.data}`)
      return response.data

    }
    fetchTodo().then((res) => {
      // console.log(`넘어온 res ${res}`)
      onFetchTodo(res.data)
      dispatch({type: "MainTodo/import", payload: res.data});
    }).catch((err) => {
      console.log(err)
    });
  }, []);

  

  // console.log(`main todolist ---------------- ${todoList}`)

  return (
    <View style={mainStyles.mainContainer}>
      <View style={mainStyles.helloContainer}>
        <Text style={mainStyles.helloText}>김싸피님, 안녕하세요! 🙋</Text>
      </View>
      <TodoList navigation={navigation} todoList={todoList}/>
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
