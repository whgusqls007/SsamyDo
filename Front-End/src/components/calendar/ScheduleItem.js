import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../../app.module.css";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "react-native-paper";
import { useState } from "react";

export default function ScheduleItem({ navigation, Schedule }) {
  const dispatch = useDispatch();
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

  // 현재의 타입과 선택일을 가져올 변수(삭제 후 함께 보내야 mark와 filter에 표시가 가능)
  const type = useSelector((state) => {
    return state.ScheduleList[4];
  });
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
            onPress={() => {}}
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
          {/* 클릭시 수정/삭제 메뉴가 나올 Menu 컴포넌트 */}
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
              <TouchableOpacity onPress={() => setVisible(true)}>
                <Ionicons name="ellipsis-horizontal" size={25} color="green" />
              </TouchableOpacity>
            }
          >
            {/* 수정메뉴 */}
            <Menu.Item
              onPress={() => {
                // MakeSchedule에 현재 값 넣기
                dispatch({ type: "Schedule/update", payload: Schedule });
                // 메뉴 사라지기
                setVisible(false);
                // 수정(MakeSchedule) 화면으로 이동
                navigation.navigate("MakeSchedule");
              }}
              title="수정"
            />
            {/* 삭제메뉴 */}
            <Menu.Item
              onPress={() => {
                // 삭제하기
                dispatch({ type: "ScheduleList/delete", id: Schedule.id });
                // 마크 다시 처리하기
                dispatch({ type: "ScheduleList/mark" });
                // 리스트 다시 보이기
                dispatch({
                  type: "ScheduleList/filter",
                });
                // 저장하기
                dispatch({ type: "ScheduleList/save" });
                // 메뉴 사라지기
                setVisible(false);
              }}
              title="삭제"
            />
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
