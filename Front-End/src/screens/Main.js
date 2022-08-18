import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import TimeLine from "../components/main/TimeLine";
import TodoList from "../components/main/TodoList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import drf from "../api/drf";

export default function Main({ navigation }) {
  const user = useSelector((state) => {
    return state.Account[0];
  });

  const dispatch = useDispatch();
  const baseURL = "http://i7e204.p.ssafy.io:8080/api/todo/todolist/";
  const [todoList, setTodoList] = useState([]);
  // const todoList = useSelector(state => state.MainTodo)

  const onFetchTodo = (res) => {
    setTodoList(res);
  };

  const token = useSelector((state) => {
    return state.Account[2];
  });

  useEffect(() => {
    const backAction = () => {
      Alert.alert("App 종료", "SSamyDo에서 떠나시겠습니까? 👩🏻‍💻", [
        {
          text: "취소",
          onPress: () => null,
          style: "cancel",
        },
        { text: "확인", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("ScheduleList", (err, result) => {
      if (result) {
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

  useEffect(() => {
    async function fetchTodo() {
      const response = await axios({
        method: "get",
        url: drf.todo(),
        headers: token,
      }).catch(() => {
        navigation.navigate("Verification");
      });

      // get(baseURL);
      return response.data;
    }
    fetchTodo()
      .then((res) => {
        onFetchTodo(res.data);
        dispatch({ type: "MainTodo/import", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    async function fetchNotice() {
      const response = await axios({
        method: "get",
        url: drf.notice.noticeOffset(0, 20),
        headers: token,
      }).catch(() => {
        navigation.navigate("Verification");
      });
      return response.data.data;
    }
    fetchNotice()
      .then((res) => {
        dispatch({ type: "Notice/import", payload: res });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={mainStyles.mainContainer}>
      <View style={mainStyles.helloContainer}>
        <Text style={mainStyles.helloText}>
          {user.name}님, 안녕하세요! 🦁💛
        </Text>
      </View>
      <TodoList navigation={navigation} todoList={todoList} />
      <TimeLine navigation={navigation} />
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
