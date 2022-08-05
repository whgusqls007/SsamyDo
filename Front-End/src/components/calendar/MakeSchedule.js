import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styles from "../../../app.module.css";
import { Calendar } from "react-native-calendars";
import { useSelector, useDispatch } from "react-redux";
import CustomTimePicker from "./TimePicker";

export default function MakeSchedule({ navigation }) {
  // Store 활용을 위한 변수 설정
  const dispatch = useDispatch();
  // 현재 입력값 표시를 위한 Selector
  const Schedule = useSelector((state) => {
    return state.Schedule[0];
  });

  // 달력 표시를 위한 셀렉터
  const MarkedDate = useSelector((state) => {
    return state.Schedule[1];
  });
  // id 값 생성을 위한 selector
  const id = useSelector((state) => {
    return state.ScheduleList[1];
  });

  return (
    <View>
      <View style={{ alignItems: "center", width: 400, height: 800 }}>
        <Text>개인 일정 추가: {Schedule.type} </Text>
        <View style={{ flexDirection: "row", margin: 5 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (Schedule.type === 0) {
                dispatch({ type: "Schedule/select", select: 3 });
              } else {
                dispatch({ type: "Schedule/select", select: 0 });
              }
            }}
          >
            <Text>싸피</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (Schedule.type === 1) {
                dispatch({ type: "Schedule/select", select: 3 });
              } else {
                dispatch({ type: "Schedule/select", select: 1 });
              }
            }}
          >
            <Text>스터디</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (Schedule.type === 2) {
                dispatch({ type: "Schedule/select", select: 3 });
              } else {
                dispatch({ type: "Schedule/select", select: 2 });
              }
            }}
          >
            <Text>개인일정</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (Schedule.type === 0) {
                alert("일정의 분류를 선택해주세요");
              } else if (Schedule.title === "") {
                alert("일정 이름을 입력해주세요");
              } else if (Schedule.start === "" || Schedule.end === "") {
                alert("일정의 시간을 입력해 주세요");
              } else {
                dispatch({
                  type: "ScheduleList/add",
                  payload: {
                    id: id,
                    type: Schedule.type,
                    title: Schedule.title,
                    content: Schedule.content,
                    start: Schedule.start,
                    end: Schedule.end,
                    // time: Schedule.time,
                  },
                });
                dispatch({ type: "Schedule/clear" });
                navigation.navigate("Calendar");
                dispatch({ type: "ScheduleList/save" });
              }
            }}
          >
            <Text>생성</Text>
          </TouchableOpacity>
        </View>
        <Text>일정 : {Schedule.title} </Text>
        <TextInput
          placeholder="일정을 입력해 주세요"
          value={Schedule.title}
          onChangeText={(text) =>
            dispatch({ type: "Schedule/title", title: text })
          }
        />
        <Text>일정 내용 : {Schedule.content}</Text>
        <TextInput
          placeholder="일정에 대한 상세 정보를 입력해 주세요"
          value={Schedule.content}
          onChangeText={(text) =>
            dispatch({ type: "Schedule/content", content: text })
          }
        />
        <Text>날짜 선택</Text>
        <Text>시작일: {Schedule.start}</Text>
        <Text>종료일: {Schedule.end}</Text>
        <Calendar
          style={{ maxheight: 200 }}
          hideExtraDays={true}
          onDayPress={(day) => {
            if (day.dateString === Schedule.end) {
              dispatch({ type: "Schedule/end", end: "" });
            } else if (Schedule.start === "") {
              dispatch({ type: "Schedule/start", start: day.dateString });
              // 하나로 하는 경우 하루를 선택하는 방법 고민하기
            } else if (day.dateString === Schedule.start) {
              dispatch({ type: "Schedule/start", start: "" });
              dispatch({ type: "Schedule/end", end: "" });
            } else if (new Date(day.dateString) < new Date(Schedule.start)) {
              alert("종료일을 잘 못 설정하셨습니다.");
            } else {
              dispatch({ type: "Schedule/end", end: day.dateString });
            }
          }}
          markingType={"multi-dot"}
          markedDates={MarkedDate}
        />
        <CustomTimePicker />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Calendar");
          }}
        >
          <Text>뒤로</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
