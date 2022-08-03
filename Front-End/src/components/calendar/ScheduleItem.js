import { View, Text, Button, ScrollView } from "react-native";
import styles from "../../../app.module.css";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

export default function ScheduleItem({ navigation, todo }) {
  var iconStatus = "ellipse-outline";
  if (todo.status) {
    iconStatus = "md-checkmark-circle";
  }
  var iconColor = "";
  if (todo.type === 1) {
    iconColor = "red";
  } else if (todo.type === 2) {
    iconColor = "green";
  } else {
    iconColor = "blue";
  }
  const dispatch = useDispatch();
  return (
    <View style={{ border: "1 black" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 10,
          backgroundColor: "#E5F3F6",
          height: 30,
        }}
      >
        <View
          style={{ flexDirection: "row", alignContent: "center", height: 30 }}
        >
          <Ionicons
            style={{ marginRight: 8 }}
            name={iconStatus}
            size={25}
            color="green"
            onPress={() => {
              dispatch({ type: "TodoList/status" });
            }}
          />
          <Ionicons
            name="ellipse-sharp"
            size={10}
            color={iconColor}
            onPress={() => {
              console.log(todo);
            }}
          />
        </View>
        <Text style={{ fontSize: 20 }}>{todo.title}</Text>
        <View
          style={{ flexDirection: "row", alignContent: "center", margin: 2 }}
        >
          <Text style={{ fontSize: 15, marginRight: 8 }}>{todo.end}</Text>
          <Ionicons name="ellipsis-horizontal" size={25} color="green" />
        </View>
      </View>
      <View style={{ height: 30, justifyContent: "center" }}>
        <Text style={{ height: 30, textAlign: "center" }}>
          내용 {todo.content}
        </Text>
      </View>
    </View>
  );
}
