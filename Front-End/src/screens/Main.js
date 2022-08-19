import { View, StyleSheet, Text, BackHandler, Alert } from "react-native";
import TimeLine from "../components/main/TimeLine";
import TodoList from "../components/main/TodoList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import drf from "../api/drf";

export default function Main({ navigation }) {
  // 유저관련 정보
  const user = useSelector((state) => {
    return state.Account[0];
  });

  const dispatch = useDispatch();
  const [todoList, setTodoList] = useState([]);

  const onFetchTodo = (res) => {
    setTodoList(res);
  };

  const token = useSelector((state) => {
    return state.Account[2];
  });

  // 뒤로가기는 종료
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

  // 로컬에서 ScheduleList 불러오기
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

  // axios를 통해 서버에서 Todo 리스트를 요청
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

  // axios를 통해 서버에서 Notice 정보를 요청
  useEffect(() => {
    async function fetchNotice() {
      const response = await axios({
        method: "get",
        url: drf.notice.noticeOffset(0, 30),
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
    paddingTop: "10%",
    paddingLeft: "5%",
  },
  helloText: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#5ba8ff",
  },
});
