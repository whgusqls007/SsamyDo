import { View, Text } from "react-native";
import TodoItem from "./TodoItem";
import styles from "../../../app.module.css";


export default function TodoList({ navigation }) {
  return (
    <View style={styles.todolistcard}>
      <Text>오늘의 설문</Text>
      <TodoItem navigation={navigation} />
    </View>
  );
}
