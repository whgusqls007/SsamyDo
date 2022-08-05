import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../../app.module.css";
import CustomCalendar from "./CustomCalendar";
import SchedulList from "./ScheduleList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  ssafySelector,
  typeOneSelector,
  typeTwoSelector,
} from "../../store/store";

export default function Month() {
  // createSelector로 생성한 값들(각각 전체 Schedule에서 해당 타입 리스트만 반환하는 Selector)
  const ssafy = useSelector(ssafySelector);
  const typeOne = useSelector(typeOneSelector);
  const typeTwo = useSelector(typeTwoSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "ScheduleList/mark", select: "all" });
    dispatch({ type: "Schedule/clear" });
  });

  return (
    <View>
      <View style={[{ flexDirection: "row", margin: 5 }]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            dispatch({
              type: "ScheduleList/mark",
              select: "all",
            });
          }}
        >
          <Text>전체</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          title="싸피"
          onPress={() => {
            dispatch({ type: "ScheduleList/mark", select: 0, payload: ssafy });
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="ellipse-sharp" size={10} color="blue" />
            <Text>싸피</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          title="스터디"
          onPress={() => {
            dispatch({
              type: "ScheduleList/mark",
              select: 1,
              payload: typeOne,
            });
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="ellipse-sharp" size={10} color="red" />
            <Text>스터디</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          title="개인일정"
          onPress={() => {
            dispatch({
              type: "ScheduleList/mark",
              select: 2,
              payload: typeTwo,
            });
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="ellipse-sharp" size={10} color="green" />
            <Text>개인 일정</Text>
          </View>
        </TouchableOpacity>
      </View>
      <CustomCalendar />
      <SchedulList />
    </View>
  );
}
