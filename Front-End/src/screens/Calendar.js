import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../app.module.css";
import { useDispatch, useSelector } from "react-redux";
import CustomCalendar from "../components/calendar/CustomCalendar";
import ScheduleList from "../components/calendar/ScheduleList";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  ssafySelector,
  typeOneSelector,
  typeTwoSelector,
} from "../store/store";

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

  const check = useSelector((state) => {
    return state.ScheduleList[0];
  });

  // settings에서 정한 분류값을 표현하기 위한 selector
  const type = useSelector((state) => {
    return state.Setting[1];
  });
  return (
    <View>
      <View>
        <View style={[{ flexDirection: "row", margin: 5 }]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              dispatch({
                type: "ScheduleList/mark",
                select: "all",
              });
              dispatch({
                type: "ScheduleList/filter",
                select: "all",
              });
            }}
          >
            <Text>전체</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              dispatch({
                type: "ScheduleList/mark",
                select: 0,
                payload: typeList[0],
              });
              dispatch({
                type: "ScheduleList/filter",
                select: 0,
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
            style={styles.button}
            onPress={() => {
              dispatch({
                type: "ScheduleList/mark",
                select: 1,
                payload: typeList[1],
              });
              dispatch({
                type: "ScheduleList/filter",
                select: 1,
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
            style={styles.button}
            onPress={() => {
              dispatch({
                type: "ScheduleList/mark",
                select: 2,
                payload: typeList[2],
              });
              dispatch({
                type: "ScheduleList/filter",
                select: 2,
                payload: typeList[2],
              });
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="ellipse-sharp" size={10} color="green" />
              <Text>{type[2]}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <CustomCalendar />
        <ScheduleList navigation={navigation} />
      </View>
      {/* 일정 추가 버튼 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // schedule 내용 지우기
          dispatch({ type: "Schedule/clear" });
          dispatch({ type: "Schedule/btn", name: "생성" });
          navigation.navigate("MakeSchedule");
        }}
      >
        <Text>일정 추가</Text>
      </TouchableOpacity>
    </View>
  );
}
