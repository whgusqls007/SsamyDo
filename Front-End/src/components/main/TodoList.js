import { View, Text } from "react-native";
import TodoItem from "./TodoItem";
import styles from "../../../app.module.css";

export default function TodoList({ navigation }) {
  return (
    <View style={styles.two}>
      <Text>TodoList.js</Text>
      <TodoItem navigation={navigation} />
    </View>
  );
}
