import { View, Text, FlatList } from "react-native";
import TodoItem from "./TodoItem";
import styles from "../../../app.module.css";


// const DATA = [
//   {
//     id: '1',
//     title: '공지1',
//     duedate : '2022-08-03'
//   },
//   {
//     id: '2',
//     title: '공지2',
//     duedate : '2022-08-03'
//   }
// ];

// const Item = ({title}) => (
//   <View>
//     <Text>{title}</Text>
//   </View>
// );

// const renderItem = ({item}) => (
//   <Item title={item.title}/>
// );

export default function TodoList({ navigation }) {

  // const renderItem = ({item}) => (
  //   <Item title={item.title}/>
  // );

  return (
    <View style={styles.todolist}>
      {/* <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      /> */}
      <Text>오늘의 설문</Text>
      <TodoItem />
    </View>
  );
}
