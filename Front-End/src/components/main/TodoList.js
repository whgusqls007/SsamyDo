import { View, Text, ScrollView } from "react-native";
import TodoItem from "./TodoItem";
import styles from "../../../app.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getTodo } from "../../store/slice/main/MainTodo";

// TypeError ; useEffect is not a function 




// const DATA = [
//   {
//     id: '1',
//     title: '공지1',
//     duedate : '2022-08-03',
//   },
//   {
//     id: '2',
//     title: '공지2',
//     duedate : '2022-08-03'
//   }
// ];

export default function TodoList({ navigation }) {
  const todoList = useSelector((state) => state.MainTodo);
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getTodo());
    }, []);


  console.log(todoList)

  

  // 공지들 가져오기 -> isCompleted : false인 애들만
  // const mainTodos = useSelector((state) => state.MainTodo);
  // const activeTodos = mainTodos.filter(mainTodo => mainTodo.isCompleted == false);

  return (
    <View style={styles.todolistcard}>
      <Text>오늘의 설문</Text>

      <ScrollView>
        {todoList && (todoList.map((item) => (
        <TodoItem item={item} key={item.id} navigation={navigation}/>)
      ))}
      </ScrollView>


    </View>
  );
}
