import { View, Text, ScrollView, StyleSheet } from "react-native";
import TodoItem from "./TodoItem";
// import styles from "../../../app.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

// TypeError ; useEffect is not a function

// scrollview 동작 확인용 데이터 대충 넣어봤습니다
const DATA = [
  {
    id: "1",
    title: "공지1",
    duedate: "202208151400",
    notice: null,
  },
  {
    id: "2",
    title: "공지2",
    duedate: "202208161400",
    notice: 1234,
  },
  {
    id: "3",
    title: "공지 3",
    duedate: "202208171400",
    route: "Edu",
    notice: null,
  },
];

export default function TodoList({ navigation, todoList }) {
  // const dispatch = useDispatch();
  // const baseURL = "http://i7e204.p.ssafy.io:8080/api/todo/todolist/";
  // const [todoList, setTodoList] = useState([]);
  // const onFetchTodo = (res) => {
  //   setTodoList(JSON.stringify(res));
  // }

  const todostatus = useSelector((state) => {
    return state.TodoStatus[0];
  });

  function checkDate(item) {
    const itemDuedate =
      item.dueDate.length === 12
        ? item.dueDate.slice(0, 8)
        : item.dueDate.slice(0, 7);
    const dDay =
      itemDuedate.length === 8
        ? itemDuedate - ymdFormat1()
        : itemDuedate - ymdFormat2();
    return dDay;
  }

  function checkStatus(item) {
    const thisStatus = todostatus.includes(item.id) ? true : false;
    return thisStatus;
  }

  // 오늘날짜 220817
  function ymdFormat1(oriDate = new Date()) {
    // let utc = oriDate.getTime() + oriDate.getTimezoneOffset() * 60 * 1000;

    // let timeDiff = 34 * 60 * 60 * 1000;
    // let kst = new Date(utc + timeDiff);

    let result =
      oriDate.getFullYear().toString() +
      (oriDate.getMonth() + 1).toString().padStart(2, "0") +
      oriDate.getDate().toString().padStart(2, "0");
    return result;
  }

  // 오늘날짜 22817
  function ymdFormat2(oriDate = new Date()) {
    // let utc = oriDate.getTime() + oriDate.getTimezoneOffset() * 60 * 1000;

    // let timeDiff = 34 * 60 * 60 * 1000;
    // let kst = new Date(utc + timeDiff);

    let result =
      oriDate.getFullYear().toString() +
      (oriDate.getMonth() + 1).toString().padStart(1) +
      oriDate.getDate().toString().padStart(2, "0");
    return result;
  }

  // 필터링 걸었는데 안먹네용
  // function checkItem(item) {
  //   if (item.title.include('건강') && item.startDate.slice(0,8) === ymdFormat()){
  //     return item;
  //   }
  //   else if (item.type === 'submit') {
  //     return item;
  //   }
  //   else if (!item.includes('건강')) {
  //     return item;
  //   }
  // };

  // useEffect(()=> {
  //   async function fetchTodo(){
  //     const response = await axios.get(baseURL);
  //     return response.data

  //   }
  //   fetchTodo().then((res) => {
  //     console.log(`넘어온 res ${res}`)
  //     onFetchTodo(res);
  //     dispatch({type: "MainTodo/import", payload: res.data});
  //   });
  // }, []);

  // todoList.sort((a, b) => a.time[0] - b.time[0] || a.time[1] - b.time[1]);

  todoList.sort(
    (a, b) =>
      todostatus.includes(a.id) - todostatus.includes(b.id) ||
      Number(a.dueDate.slice(0, 4)) - Number(b.dueDate.slice(0, 4)) ||
      Number(a.dueDate.slice(4, 6)) - Number(b.dueDate.slice(4, 6)) ||
      Number(a.dueDate.slice(6, 8)) - Number(b.dueDate.slice(6, 8)) ||
      Number(a.dueDate.slice(8, 10)) - Number(b.dueDate.slice(8, 10))
  );

  return (
    <View style={styles.todoContainer}>
      <View style={styles.todobox}>
        <ScrollView>
          {/* {DATA && (DATA.filter(item => item.duedate.slice(0,8) >= ymdFormat()).map((item) => (
          <TodoItem item={item} key={item.id} navigation={navigation}/>)
          ))}  */}
          {/* <Text>{todoList[0].id}</Text> */}

          {todoList &&
            todoList
              .filter((item) => checkDate(item) >= 0)
              .map((item) => (
                <TodoItem item={item} key={item.id} navigation={navigation} />
              ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  todoContainer: {
    flex: 1,
    flexDirection: "column",
    marginBottom: "3%",
  },
  todobox: {
    flexDirection: "row",
    marginTop: "1%",
    paddingTop: "4%",
    paddingHorizontal: "5%",
    height: "100%",
  },
});
