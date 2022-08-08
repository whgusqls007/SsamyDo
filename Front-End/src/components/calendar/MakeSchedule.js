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
  const dispatch = useDispatch();
  // 현재 입력값 표시를 위한 Selector
  const Schedule = useSelector((state) => {
    return state.Schedule[0];
  });
  // Store 활용을 위한 변수 설정(렌더링 시 한 번만)
  useEffect(() => {}, []);

  // 수정과 생성 버튼 이름 useState 사용시 Too many re-renders 오류 발생
  const btnName = useSelector((state) => {
    return state.Schedule[1];
  });

  // 달력 표시를 위한 셀렉터
  const [MarkedDate, setMarkedDate] = useState({});

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
    // 임시 변수 현재일(currentDate)은 선택한 날 or 기존 date
    let currentDate = selectedDate || date;
    const timeSet = () => {
      // Platform이 없으면 계속 실행됨
      setShow(Platform.OS === "ios");
      // date를 현재일(currentDate)로 변경
      setDate(currentDate);
    };
    const dataSet = () => {
      // 시간을 선택된 date 형식에서 원하는 형태의 문자열로 변경
      setTime(
        `${tempDate.getHours().toString().padStart(2, "0")} : ${tempDate
          .getMinutes()
          .toString()
          .padStart(2, "0")}`
      );
    };
    await timeSet();
    // 현재일(currentDate)을 Date형식으로 변환
    const tempDate = new Date(currentDate);
    await dataSet();
    // Schedule값 변경
    dispatch({
      type: "Schedule/update",
      payload: { time: [tempDate.getHours(), tempDate.getMinutes()] },
    });
  };

  // settings에서 정한 분류값을 표현하기 위한 selector
  const type = useSelector((state) => {
    return state.Setting[2];
  });

  return (
    <View>
      <View style={{ alignItems: "center", width: 400, height: 800 }}>
        <Text>개인 일정 추가: {type[Schedule.type]} </Text>
        <View style={{ flexDirection: "row", margin: 5 }}>
          <TouchableOpacity
            style={[styles.button, { margin: 5 }]}
            onPress={() => {
              if (Schedule.type === 0) {
                dispatch({ type: "Schedule/update", payload: { type: 3 } });
              } else {
                dispatch({ type: "Schedule/update", payload: { type: 0 } });
              }
            }}
          >
            <Text>{type[0]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { margin: 5 }]}
            onPress={() => {
              if (Schedule.type === 1) {
                dispatch({ type: "Schedule/update", payload: { type: 3 } });
              } else {
                dispatch({ type: "Schedule/update", payload: { type: 1 } });
              }
            }}
          >
            <Text>{type[1]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { margin: 5 }]}
            onPress={() => {
              if (Schedule.type === 2) {
                dispatch({ type: "Schedule/update", payload: { type: 3 } });
              } else {
                dispatch({ type: "Schedule/update", payload: { type: 2 } });
              }
            }}
          >
            <Text>{type[2]}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>일정 : </Text>
          <TextInput
            placeholder="일정을 입력해 주세요"
            value={Schedule.title}
            onChangeText={(text) =>
              dispatch({ type: "Schedule/update", payload: { title: text } })
            }
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>일정 내용 : </Text>
          <TextInput
            placeholder="일정에 대한 상세 정보를 입력해 주세요"
            value={Schedule.content}
            onChangeText={(text) =>
              dispatch({ type: "Schedule/update", payload: { content: text } })
            }
          />
        </View>
        <Text>일정일: {Schedule.day}</Text>
        <Calendar
          style={{ maxheight: 200 }}
          hideExtraDays={true}
          onDayPress={(day) => {
            // 종료일 취소(클릭한 날이 종료일과 같다면)
            if (day.dateString === Schedule.day) {
              dispatch({ type: "Schedule/update", payload: { day: "" } });
            } else {
              dispatch({
                type: "Schedule/update",
                payload: { day: day.dateString },
              });
            }
            setMarkedDate({
              // Object의 key값을 변수명으로 할 경우
              [day.dateString]: { selected: true, selectedColor: "red" },
            });
          }}
          markedDates={MarkedDate}
        />
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            일정시각 {Schedule.time[0].toString().padStart(2, "0")} :{" "}
            {Schedule.time[1].toString().padStart(2, "0")}
          </Text>
          <TouchableOpacity
            style={[styles.button]}
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
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          {/* 뒤로가기 버튼 */}
          <TouchableOpacity
            style={[styles.button, { margin: 5 }]}
            onPress={() => {
              navigation.navigate("Calendar");
              dispatch({ type: "Schedule/clear" });
            }}
          >
            <Text>뒤로</Text>
          </TouchableOpacity>
          {/* 생성 버튼 */}
          <TouchableOpacity
            style={[styles.button, { margin: 5 }]}
            onPress={async () => {
              if (Schedule.type === 3) {
                alert("일정의 분류를 선택해주세요");
              } else if (Schedule.title === "") {
                alert("일정 이름을 입력해주세요");
              } else if (Schedule.day === "") {
                alert("일정일을 선택해 주세요");
              } else {
                const ScheduleListData = () => {
                  if (Schedule.id) {
                    dispatch({
                      type: "ScheduleList/update",
                      payload: {
                        id: Schedule.id,
                        type: Schedule.type,
                        title: Schedule.title,
                        content: Schedule.content,
                        day: Schedule.day,
                        time: Schedule.time,
                      },
                    });
                  } else {
                    dispatch({
                      type: "ScheduleList/add",
                      payload: {
                        id: id,
                        type: Schedule.type,
                        title: Schedule.title,
                        content: Schedule.content,
                        day: Schedule.day,
                        time: Schedule.time,
                      },
                    });
                  }
                };
                const CalendarSet = () => {
                  dispatch({ type: "Schedule/clear" });
                  dispatch({ type: "ScheduleList/save" });
                  dispatch({ type: "SchduleList/mark", select: "all" });
                  dispatch({
                    type: "SchduleList/dayMark",
                    select: Schedule.day,
                  });
                  dispatch({
                    type: "SchduleList/filter",
                    select: Schedule.day,
                  });
                };
                await ScheduleListData();
                await CalendarSet();
                navigation.navigate("Calendar");
              }
            }}
          >
            <Text>{btnName}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
