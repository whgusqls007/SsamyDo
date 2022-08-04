import { View, Text, Button } from "react-native";
import styles from "../../../app.module.css";

export default function ScheduleItem(props) {
  const { navigation } = props;
  const { todo } = props;
  return (
    <View style={[styles.two, { flexDirection: "row" }]}>
      <Text>{todo.id}</Text>
    </View>
  );
}
