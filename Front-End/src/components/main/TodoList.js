import { View, ScrollView, StyleSheet } from "react-native";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";

export default function TodoList({ navigation, todoList }) {
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

  // 오늘날짜
  function ymdFormat1(oriDate = new Date()) {
    let result =
      oriDate.getFullYear().toString() +
      (oriDate.getMonth() + 1).toString().padStart(2, "0") +
      oriDate.getDate().toString().padStart(2, "0");
    return result;
  }

  // 오늘날짜
  function ymdFormat2(oriDate = new Date()) {
    let result =
      oriDate.getFullYear().toString() +
      (oriDate.getMonth() + 1).toString().padStart(1) +
      oriDate.getDate().toString().padStart(2, "0");
    return result;
  }

  // 투두 리스트 완료여부와 날짜별로 정렬
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
