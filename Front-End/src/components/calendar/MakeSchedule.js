import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import styles from "../../../app.module.css";
import { Calendar } from "react-native-calendars";
import { useSelector, useDispatch } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";

export default function MakeSchedule({ navigation }) {
  // Store 활용을 위한 변수 설정
  const dispatch = useDispatch();
  // 한번 실행
  useEffect(() => {
    dispatch({ type: "Schdeule/timeHour", hour: new Date().getHours() });
    dispatch({ type: "Schdeule/timeMin", min: new Date().getMinutes() });
    dispatch({ type: "Schedule/clear" });
  }, []);
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

  // TimePicker를 위한 변수
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(
    `${new Date().getHours().toString().padStart(2, "0")} : ${new Date()
      .getMinutes()
      .toString()
      .padStart(2, "0")}`
  );
  // TimePicek 값 변경 함수 인자로 event 안 넣으면 꼬임
  const onChange = async (event, selectedDate) => {
    let currentDate = selectedDate || date;
    const timeSet = () => {
      // Platform이 없으면 계속 실행됨
      setShow(Platform.OS === "ios");
      setDate(currentDate);
    };
    const dataSet = () => {
      setTime(
        `${tempDate.getHours().toString().padStart(2, "0")} : ${tempDate
          .getMinutes()
          .toString()
          .padStart(2, "0")}`
      );
    };
    await timeSet();
    const tempDate = new Date(currentDate);
    await dataSet();
    dispatch({ type: "Schedule/timeHour", hour: tempDate.getHours() });
    dispatch({ type: "Schedule/timeMin", min: tempDate.getMinutes() });
  };

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
              if (Schedule.type === 3) {
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
                    time: Schedule.time,
                  },
                });
                dispatch({ type: "Schedule/clear" });
                dispatch({ type: "ScheduleList/save" });
                dispatch({ type: "SchduleList/mark", select: "all" });
                dispatch({
                  type: "SchduleList/filter",
                  select: Schedule.end,
                });
                navigation.navigate("Calendar");
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
            // 종료일 취소(클릭한 날이 종료일과 같다면)
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
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            마감 시간: {time}
          </Text>
          <TouchableOpacity
            style={[styles.button, { border: 1 }]}
            onPress={() => {
              setShow(true);
            }}
          >
            <Text>마감시간 선택</Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="time"
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </View>
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
