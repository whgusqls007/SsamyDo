import { View, Text, ScrollView, StyleSheet } from "react-native";
import TodoItem from "./TodoItem";
import styles from "../../../app.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTodo } from "../../store/slice/main/MainTodo";
import axios from "axios";

// TypeError ; useEffect is not a function

// scrollview 동작 확인용 데이터 대충 넣어봤습니다
const DATA = [
  {
    id: "1",
    title: "공지1",
    duedate: "2022-08-03",
  },
  {
    id: "2",
    title: "공지2",
    duedate: "2022-08-03",
  },
  {
    id: "3",
    title: "공지 3",
    duedate: "2022-08-03",
    route: "Edu",
  },
];

// tododata 받아오기 (main으로 옮겨야할 수도 ..)
// 받아온 data에서 status 기준으로 필터링

export default function TodoList({ navigation }) {

  const dispatch = useDispatch();
  const baseURL = "http://i7e204.p.ssafy.io:8080/api/todo/todolist/";

  // 오늘날짜 
  // function ymdFormat(oriDate = new Date()) {
  //   let result =
  //     oriDate.getFullYear().toString() +
  //     (oriDate.getMonth() + 1).toString().padStart(2, "0") +
  //     oriDate.getDate().toString().padStart(2, "0");
  //   return result;
  // }

  // console.log(ymdFormat())

  useEffect(() => {
    axios({
      method: "get",
      url: baseURL,
    })
      .then((response) => {
        console.log("Todo Axios 요청 성공!");
        // console.log(`받은 데이터 ${response}`);
        dispatch({type: "MainTodo/import", payload: response.data})
      })
      .catch((error) => {
        // console.log(error.response);
        console.log("todo axios 실패함")
      });
  }, []);



  // 위의 dispatch(fulfilled) 안먹으면 ,,, getTodo 쓰세요
  //   dispatch(getTodo());
  // }, []);

  // console.log(todoList)
  let todoList = useSelector((state) => state.MainTodo);
  // console.log(todoList)
  todoList = JSON.stringify(todoList)
  console.log(`todoList 순서 체크용`)

  return (
    <View style={styles.todoContainer}>
      <Text>오늘의 설문</Text>

      {/* 주석처리함 ,, status 진행중인 애들만 item으로 넘긴다 */}
      {/* <ScrollView>
        {todoList.filter(item => item.status == '진행중').map((item) => (
        <TodoItem item={item} key={item.id} navigation={navigation}/>)
      ))} */}
      <ScrollView>

        {DATA && (DATA.map((item) => (
        <TodoItem item={item} key={item.id} navigation={navigation}/>)
      ))} 

      </ScrollView>
    </View>
  );
}
