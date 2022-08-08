import { View, Text, ScrollView } from "react-native";
import TodoItem from "./TodoItem";
import styles from "../../../app.module.css";
import { useSelector } from 'react-redux';


const DATA = [
  {
    id: '1',
    title: '공지1',
    duedate : '2022-08-03',
  },
  {
    id: '2',
    title: '공지2',
    duedate : '2022-08-03'
  }
];

export default function TodoList({ navigation }) {

  // 공지들 가져오기 -> isCompleted : false인 애들만
  // const mainTodos = useSelector((state) => state.MainTodo);
  // const activeTodos = mainTodos.filter(mainTodo => mainTodo.isCompleted == false);

  return (
    <View style={styles.todolistcard}>
      <Text>오늘의 설문</Text>

      {/* map 사용해서 각각으로 넘기기 */}
      {/* {activeTodos.map((item) => (
        <TodoItem key={item.id} item={item} navigation={navigation}/>
      ))}; */}
      <ScrollView>
        {DATA.map((item) => (
        <TodoItem item={item} key={item.id} title={item.title} navigation={navigation}/>
      ))}
      </ScrollView>


    </View>
  );
}
