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
    notice : null,
  },
  {
    id: "2",
    title: "공지2",
    duedate: "202208161400",
    notice : 1234
  },
  {
    id: "3",
    title: "공지 3",
    duedate: "202208171400",
    route: "Edu",
    notice : null,
  },
];

// tododata 받아오기 (main으로 옮겨야할 수도 ..)
// 받아온 data에서 status 기준으로 필터링

export default function TodoList({ navigation, todoList }) {

  // const dispatch = useDispatch();
  // const baseURL = "http://i7e204.p.ssafy.io:8080/api/todo/todolist/";
  // const [todoList, setTodoList] = useState([]);
  // const onFetchTodo = (res) => {
  //   setTodoList(JSON.stringify(res));
  // }

  // console.log(`todolist state에 저장한거 ----------------------- ${todoList}`)

  // 오늘날짜 
  function ymdFormat(oriDate = new Date()) {
    let result =
      oriDate.getFullYear().toString() +
      (oriDate.getMonth() + 1).toString().padStart(2, "0") +
      oriDate.getDate().toString().padStart(2, "0");
    return result;
  }



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

  // console.log(`아니 이게 뭐여 ${todoList}`)
  // console.log("todolist-----------------------------------")
  // console.log(todoList[0])

  return (
    <View style={styles.todoContainer}>
      {/* <View>
        <Text style={styles.titlecontainer}>오늘의 설문</Text>
      </View> */}

      <View style={styles.todobox}>
        <ScrollView>

          {/* {DATA && (DATA.filter(item => item.duedate.slice(0,8) >= ymdFormat()).map((item) => (
          <TodoItem item={item} key={item.id} navigation={navigation}/>)
          ))}  */}
          {/* <Text>{todoList[0].id}</Text> */}

          {todoList && (todoList.map((item)=>(
            <TodoItem item={item} key={item.id} navigation={navigation} />)
          ))}

        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  todoContainer : {
    flex: 1,
    flexDirection: 'column'
  },
  todobox : {
    flexDirection: 'row',    
    paddingTop: 30,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
    height: "100%",
  }
})