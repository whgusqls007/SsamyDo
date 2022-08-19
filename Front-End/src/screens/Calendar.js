import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomCalendar from "../components/calendar/CustomCalendar";
import ScheduleList from "../components/calendar/ScheduleList";
import Ionicons from "@expo/vector-icons/Ionicons";
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
    <View style={CalendarStyles.calendarContainer}>
      <View>
        {/* 상단 버튼 모음 */}
        <KeyboardAvoidingView
          behavior="padding"
          style={CalendarStyles.btnContainer}
        >
          <View style={CalendarStyles.categoryBtnContainer}>
            <TouchableOpacity
              style={[
                CalendarStyles.categoryBtn,
                check === "all" ? { backgroundColor: "#A8D1FF" } : {},
                showBtn && CalendarStyles.cancleBtn,
              ]}
              onPress={() => {
                // 취소상태일때
                if (showBtn) {
                  setShowBtn(!setShowBtn);
                  setTypeOne(type[1]);
                  setTypeTwo(type[2]);
                  // 타입변경상태(전체)
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
                CalendarStyles.categoryBtn,
                !showBtn && check === 0 ? { backgroundColor: "#A8D1FF" } : {},
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
              <View style={CalendarStyles.btnContent}>
                <Ionicons name="ellipse-sharp" size={10} color="#5ba8ff" />
                <Text> {type[0]}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                CalendarStyles.categoryBtn,
                !showBtn && check === 1 ? { backgroundColor: "#A8D1FF" } : {},
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
              <View style={CalendarStyles.btnContent}>
                <Ionicons name="ellipse-sharp" size={10} color="#ffe34f" />
                {showBtn ? (
                  <TextInput
                    maxLength={5}
                    onChangeText={(text) => {
                      setTypeOne(text);
                    }}
                    value={typeOne}
                    style={CalendarStyles.inputBox}
                  />
                ) : (
                  <Text> {type[1]}</Text>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                CalendarStyles.categoryBtn,
                !showBtn && check === 2 ? { backgroundColor: "#A8D1FF" } : {},
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
              <View style={CalendarStyles.btnContent}>
                <Ionicons name="ellipse-sharp" size={10} color="#ffc0cb" />
                {showBtn ? (
                  <TextInput
                    maxLength={5}
                    value={typeTwo}
                    onChangeText={(text) => {
                      setTypeTwo(text);
                    }}
                    style={CalendarStyles.inputBox}
                  />
                ) : (
                  <Text> {type[2]}</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
          {/* Type 이름 변경 버튼 */}
          <View style={CalendarStyles.changeBtnContainer}>
            <TouchableOpacity
              style={CalendarStyles.changeBtn}
              onPress={() => {
                if (showBtn) {
                  dispatch({
                    type: "Account/changeType",
                    payload: [typeOne, typeTwo],
                  });
                  dispatch({ type: "Account/saveType" });
                }
                setShowBtn(!showBtn);
              }}
            >
              <Text>{showBtn ? "완료" : "이름 변경"}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <CustomCalendar />
        <ScheduleList navigation={navigation} />
      </View>
    </View>
  );
}

const CalendarStyles = StyleSheet.create({
  // 전체 화면 스타일
  calendarContainer: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },

  // 버튼 내부
  btnContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: "3%",
    marginHorizontal: "3%",
    paddingHorizontal: "4%",
  },
  categoryBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryBtn: {
    borderWidth: 1,
    borderColor: "#ededed",
    marginTop: "4%",
    marginHorizontal: "1%",
    paddingVertical: "2%",
    paddingHorizontal: "2%",
    borderRadius: 5,
    backgroundColor: "#ffffff",
    shadowColor: "#888888",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
  },
  changeBtnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: "2%",
  },
  changeBtn: {
    backgroundColor: "#ededed",
    marginTop: "4%",
    paddingVertical: "5%",
    paddingHorizontal: "6%",
    borderRadius: 5,
  },
  cancleBtn: {
    borderColor: "#c1121f",
    backgroundColor: "#ffffff",
  },
  cancleText: { color: "#ffffff" },
});
