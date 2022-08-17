import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import styles from "../../app.module.css";
import { useDispatch, useSelector } from "react-redux";
import CustomCalendar from "../components/calendar/CustomCalendar";
import ScheduleList from "../components/calendar/ScheduleList";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import {
  ssafySelector,
  typeOneSelector,
  typeTwoSelector,
} from "../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Calendar({ navigation }) {
  const dispatch = useDispatch();

  // 분류별 리스트 CreateSelector 값 불러오기
  const typeList = [
    useSelector(ssafySelector),
    useSelector(typeOneSelector),
    useSelector(typeTwoSelector),
  ];

  useEffect(() => {
    // dispatch(type:"")
  });
  // 현재 선택한 타입
  const check = useSelector((state) => {
    return state.ScheduleList[4][0];
  });

  // settings에서 정한 분류값을 표현하기 위한 selector
  const type = useSelector((state) => {
    return state.Account[3];
  });

  return (
    <View style={CalendarStyles.back}>
      <View>
        {/* 타입 선택 버튼  */}
        <View style={[{ flexDirection: "row" }]}>
          <TouchableOpacity
            style={[
              CalendarStyles.btn,
              check === "all" ? { backgroundColor: "#A8D1FF" } : {},
            ]}
            onPress={() => {
              dispatch({
                type: "ScheduleList/mark",
                select: "all",
              });
              dispatch({
                type: "ScheduleList/filter",
              });
            }}
          >
            <Text>전체</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              CalendarStyles.btn,
              check === 0 ? { backgroundColor: "#A8D1FF" } : {},
            ]}
            onPress={() => {
              dispatch({
                type: "ScheduleList/mark",
                select: 0,
                payload: typeList[0],
              });
              dispatch({
                type: "ScheduleList/filter",
                payload: typeList[0],
              });
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="ellipse-sharp" size={10} color="blue" />
              <Text>{type[0]}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              CalendarStyles.btn,
              check === 1 ? { backgroundColor: "#A8D1FF" } : {},
            ]}
            onPress={() => {
              dispatch({
                type: "ScheduleList/mark",
                select: 1,
                payload: typeList[1],
              });
              dispatch({
                type: "ScheduleList/filter",
                payload: typeList[1],
              });
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="ellipse-sharp" size={10} color="red" />
              <Text>{type[1]}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              CalendarStyles.btn,
              check === 2 ? { backgroundColor: "#A8D1FF" } : {},
            ]}
            onPress={() => {
              dispatch({
                type: "ScheduleList/mark",
                select: 2,
                payload: typeList[2],
              });
              dispatch({
                type: "ScheduleList/filter",
                payload: typeList[2],
              });
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="ellipse-sharp" size={10} color="green" />
              <Text>{type[2]}</Text>
            </View>
          </TouchableOpacity>
          {/* 나중에 삭제해야함 */}
          <TouchableOpacity
            style={CalendarStyles.btn}
            onPress={() => {
              AsyncStorage.removeItem("Account");
              AsyncStorage.removeItem("Setting");
            }}
          >
            <Text>삭제용</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={CalendarStyles.btn}
            onPress={() => {
              navigation.navigate("Verification");
            }}
          >
            <Text>이동</Text>
          </TouchableOpacity>
        </View>
        <CustomCalendar />
        <ScheduleList navigation={navigation} />
      </View>
      {/* 일정 추가 버튼 */}
      <TouchableOpacity
        onPress={() => {
          // schedule 내용 지우기
          dispatch({ type: "Schedule/clear" });
          dispatch({ type: "Schedule/btn", name: "생성" });
          navigation.navigate("MakeSchedule");
        }}
      >
        <AntDesign
          style={{ marginLeft: 360, marginTop: 1 }}
          name="pluscircle"
          size={40}
          color="#A8D1FF"
        />
      </TouchableOpacity>
    </View>
  );
}

const CalendarStyles = StyleSheet.create({
  // 전체 화면 스타일
  back: {
    backgroundColor: "#EDEDED",
    alignItems: "center",
    justifyContent: "center",
  },

  // 일정분류 스타일
  btn: {
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 3,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    height: "auto",
    alignItems: "center",
  },
});
