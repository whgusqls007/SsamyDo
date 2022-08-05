import { View, Text, Button, ScrollView } from "react-native";
import styles from "../../../app.module.css";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

export default function ScheduleItem({ navigation, Schedule }) {
  // 진행 사항 사용x
  // var iconStatus = "ellipse-outline";
  // if (Schedule.status) {
  //   iconStatus = "md-checkmark-circle";
  // }
  var iconColor = "";
  if (Schedule.type === 1) {
    iconColor = "red";
  } else if (Schedule.type === 2) {
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
          <Ionicons name="ellipse-sharp" size={10} color={iconColor} />
        </View>
        <Text style={{ fontSize: 20 }}>{Schedule.title}</Text>
        <View
          style={{ flexDirection: "row", alignContent: "center", margin: 2 }}
        >
          <Text style={{ fontSize: 15, marginRight: 8 }}>{Schedule.end}</Text>
          <Ionicons name="ellipsis-horizontal" size={25} color="green" />
        </View>
      </View>
      <View style={{ height: 30, justifyContent: "center" }}>
        <Text style={{ height: 30, textAlign: "center" }}>
          내용 {Schedule.content}
        </Text>
      </View>
    </View>
  );
}
