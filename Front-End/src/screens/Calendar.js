import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
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
import { useState } from "react";

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

  const [showBtn, setShowBtn] = useState(false);
  const [typeOne, setTypeOne] = useState(type[1]);
  const [typeTwo, setTypeTwo] = useState(type[2]);

  return (
    <View style={CalendarStyles.back}>
      <View>
        {/*  상위 버튼 모음  */}
        <View style={CalendarStyles.topContainer}>
          {/* Type 선택 버튼 */}
          <KeyboardAvoidingView
            behavior="padding"
            style={CalendarStyles.container}
          >
            <TouchableOpacity
              style={[
                CalendarStyles.btn,
                check === "all" ? { backgroundColor: "#A8D1FF" } : {},
                showBtn && CalendarStyles.cancleBtn,
              ]}
              onPress={() => {
                if (showBtn) {
                  setShowBtn(!setShowBtn);
                  setTypeOne(type[1]);
                  setTypeTwo(type[2]);
                } else {
                  dispatch({
                    type: "ScheduleList/mark",
                    select: "all",
                  });
                  dispatch({
                    type: "ScheduleList/filter",
                  });
                }
              }}
            >
              <Text>{showBtn ? "취소" : "전체"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                CalendarStyles.btn,
                check === 0 ? { backgroundColor: "#A8D1FF" } : {},
              ]}
              disabled={showBtn}
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
              <View style={CalendarStyles.container}>
                <Ionicons name="ellipse-sharp" size={10} color="blue" />
                <Text>{type[0]}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                CalendarStyles.btn,
                check === 1 ? { backgroundColor: "#A8D1FF" } : {},
              ]}
              disabled={showBtn}
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
              <View style={CalendarStyles.container}>
                <Ionicons name="ellipse-sharp" size={10} color="red" />
                {showBtn ? (
                  <TextInput maxLength={5} value={typeOne} />
                ) : (
                  <Text>{type[1]}</Text>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                CalendarStyles.btn,
                check === 2 ? { backgroundColor: "#A8D1FF" } : {},
              ]}
              disabled={showBtn}
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
              <View style={CalendarStyles.container}>
                <Ionicons name="ellipse-sharp" size={10} color="green" />
                <Text>{type[2]}</Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
          {/* Type 이름 변경 버튼 */}
          <TouchableOpacity
            style={CalendarStyles.changeBtn}
            onPress={() => {
              setShowBtn(!showBtn);
            }}
          >
            <Text>{showBtn ? "수정" : "타입명 변경"}</Text>
          </TouchableOpacity>
        </View>
        <CustomCalendar />
        <ScheduleList navigation={navigation} />
      </View>
      {/* 일정 추가 버튼 */}
      <TouchableOpacity
        style={CalendarStyles.addBtn}
        onPress={() => {
          // schedule 내용 지우기
          dispatch({ type: "Schedule/clear" });
          dispatch({ type: "Schedule/btn", name: "생성" });
          navigation.navigate("MakeSchedule");
        }}
      >
        <AntDesign name="pluscircle" size={40} color="#A8D1FF" />
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
    padding: "3%",
    marginTop: "3%",
    marginBottom: "1%",
    marginLeft: "2%",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    height: "auto",
    alignItems: "center",
  },

  addBtn: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    right: "1%",
    bottom: "-7%",
  },

  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "1%",
  },

  container: {
    flexDirection: "row",
  },

  changeBtn: {
    margin: "1%",
    padding: "1%",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    justifyContent: "center",
  },

  cancleBtn: {
    borderColor: "red",
    borderWidth: 1,
    backgroundColor: "red",
  },
});
