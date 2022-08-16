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

export default function TodoList({ navigation }) {

  const dispatch = useDispatch();
  const baseURL = "http://i7e204.p.ssafy.io:8080/api/todo/todolist/";
  const [todoList, setTodoList] = useState();

  const onFetchTodo = (res) => {
    setTodoList(JSON.stringify(res));
  }

  // 오늘날짜 
  // function ymdFormat(oriDate = new Date()) {
  //   let result =
  //     oriDate.getFullYear().toString() +
  //     (oriDate.getMonth() + 1).toString().padStart(2, "0") +
  //     oriDate.getDate().toString().padStart(2, "0");
  //   return result;
  // }

  // console.log(ymdFormat())

  // 이전에 쓰던 axios 

  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: baseURL,
  //   })
  //     .then((response) => {
  //       console.log("Todo Axios 요청 성공!");
  //       dispatch({type: "MainTodo/import", payload: response.data})
  //     })
  //     .catch((error) => {
  //       console.log("todo axios 실패함")
  //     });
  // }, []);

  useEffect(()=> {
    async function fetchTodo(){
      const response = await axios.get("http://i7e204.p.ssafy.io:8080/api/todo/todolist/");
      // console.log(`젼님 코드 보고 바뀐거 ${response.data}`)
      return response.data

    }
    fetchTodo().then((res) => {
      // console.log(`넘어온 res ${res}`)
      onFetchTodo(res);
      dispatch({type: "MainTodo/import", payload: res.data});
    });
    // fetchTodo().catch((error) => {
    //   console.log("todo axios 실패함")
    // });
  }, []);

  // console.log(todoList)
  // let todoList = useSelector((state) => state.MainTodo);
  // todoList = JSON.stringify(todoList)
  // console.log(`todoList 순서 체크용`)
  // console.log(todoList)

  // console.log(`usestate todolist ${todoList}`)
  

  return (
    <View style={styles.todoContainer}>
      {/* <View>
        <Text style={styles.titlecontainer}>오늘의 설문</Text>
      </View> */}

      <View style={styles.todobox}>
        <ScrollView>

          {DATA && (DATA.map((item) => (
          <TodoItem item={item} key={item.id} navigation={navigation}/>)
          ))} 

          {/* {(todoList.data.map((item)=>(
            <TodoItem item={item} key={item.id} navigation={navigation} />)
          ))} */}

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