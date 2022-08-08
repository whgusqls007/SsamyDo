import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../../app.module.css";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Provider } from "react-native-paper";
import { useState } from "react";

export default function ScheduleItem({ navigation, Schedule }) {
  // 일정 타입에 따른 아이콘 색 표시를 위한 장치
  var iconColor = "";
  if (Schedule.type === 1) {
    iconColor = "red";
  } else if (Schedule.type === 2) {
    iconColor = "green";
  } else {
    iconColor = "blue";
  }
  // 드랍 메뉴의 보이는 여부를 결정할 변수
  const [visible, setVisible] = useState(false);
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
            onPress={() => {
              console.log(Schedule);
            }}
            name="ellipse-sharp"
            size={10}
            color={iconColor}
          />
        </View>
        <Text style={{ fontSize: 20 }}>{Schedule.title}</Text>
        <View
          style={{ flexDirection: "row", alignContent: "center", margin: 2 }}
        >
          <Text style={{ fontSize: 15, marginRight: 8 }}>
            {Schedule.time[0].toString().padStart(2, "0")} :{" "}
            {Schedule.time[1].toString().padStart(2, "0")}
          </Text>
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
              <TouchableOpacity onPress={() => setVisible(true)}>
                <Ionicons name="ellipsis-horizontal" size={25} color="green" />
              </TouchableOpacity>
            }
          >
            <Menu.Item onPress={() => {}} title="수정" />
            <Menu.Item onPress={() => {}} title="삭제" />
          </Menu>
        </View>
      </View>
      <View style={{ height: 30, justifyContent: "center" }}>
        <Text style={{ height: 30, textAlign: "center" }}>
          {Schedule.content}
        </Text>
      </View>
    </View>
  );
}
