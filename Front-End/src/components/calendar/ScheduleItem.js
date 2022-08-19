import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { Menu } from "react-native-paper";
import { useState } from "react";

export default function ScheduleItem({ navigation, Schedule }) {
  const dispatch = useDispatch();
  // 일정 타입에 따른 아이콘 색 표시를 위한 장치
  var iconColor = "";
  if (Schedule.type === 1) {
    iconColor = "#ffe34f";
  } else if (Schedule.type === 2) {
    iconColor = "#ffc0cb";
  } else {
    iconColor = "#a8d1ff";
  }
  // 드랍 메뉴의 보이는 여부를 결정할 변수(우측 ... 아이콘)
  const [visible, setVisible] = useState(false);

  return (
    <View style={ScheduleItemStyle.scheduleContainer}>
      <TouchableOpacity
        style={[ScheduleItemStyle.category, { backgroundColor: iconColor }]}
      ></TouchableOpacity>
      <View style={ScheduleItemStyle.scheduleBox}>
        <View>
          <Text style={ScheduleItemStyle.titleText}>{Schedule.title}</Text>
          <Text style={ScheduleItemStyle.timeText}>
            {Schedule.time[0].toString().padStart(2, "0")} :{" "}
            {Schedule.time[1].toString().padStart(2, "0")}
          </Text>
        </View>
      </View>
      <View style={ScheduleItemStyle.modifyBtn}>
        {/* 클릭시 수정/삭제 메뉴가 나올 Menu 컴포넌트 */}
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <TouchableOpacity onPress={() => setVisible(true)}>
              <Ionicons name="ellipsis-horizontal" size={25} color="#888888" />
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
  );
}

const ScheduleItemStyle = StyleSheet.create({
  scheduleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "5%",
    padding: "3%",
    margin: "2%",
    borderRadius: 15,
    backgroundColor: "#ffffff",
  },
  category: {
    width: "2%",
    height: "100%",
    borderRadius: 10,
  },
  scheduleBox: {
    width: "87%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: "2%",
    paddingHorizontal: "1%",
  },
  modifyBtn: {
    marginRight: "1%",
  },
  titleText: {
    fontSize: 18,
  },
  timeText: {
    fontSize: 14,
  },
});
