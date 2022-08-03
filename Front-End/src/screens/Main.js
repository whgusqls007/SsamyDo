import { View, Text, Button } from "react-native";
import TimeLine from "../components/main/TimeLine";
import TodoList from "../components/main/TodoList";
import styles from "../../app.module.css";

export default function Main({ navigation }) {
  return (
    <View style={[styles.border]}>
      {/* <Text>Main</Text> */}
      <TodoList navigation={navigation} />
      <TimeLine />
    </View>
  );
}
