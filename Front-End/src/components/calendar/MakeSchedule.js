import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import styles from "../../../app.module.css";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useSelector, useDispatch } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import {
  ssafySelector,
  typeOneSelector,
  typeTwoSelector,
} from "../../store/store";
import { Ionicons } from "@expo/vector-icons";


// 캘린더를 위한 설정
LocaleConfig.locales["ssamydo"] = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  today: "Today",
};
LocaleConfig.defaultLocale = "ssamydo";

export default function MakeSchedule({ navigation }) {
  const dispatch = useDispatch();
  // 현재 입력값 표시를 위한 Selector
  const Schedule = useSelector((state) => {
    return state.Schedule[0];
  });
  // Store 활용을 위한 변수 설정(렌더링 시 한 번만)
  useEffect(() => {
    // 수정으로 들어온 경우(Schedule에 id값이 존재) 버튼의 이름과 해당 일자의 표시를 변경
    if (Schedule.id) {
      // 버튼 이름 수정
      setBtnName("수정");
      // 선택일 표시
      setMarkedDate({
        [Schedule.day]: { selected: true, selectedColor: "red" },
      });
      // 현재 value값 선택된 시각으로 변경
      const [year, month, day] = Schedule.day.split("-");
      setDate(
        new Date(year, month - 1, day, Schedule.time[0], Schedule.time[1])
      );
    }
    setErrorMSG(false);
  }, []);
  // error 메시지
  const [errorMSG, setErrorMSG] = useState(false);

  // 수정과 생성 버튼 이름 useState 사용시 Too many re-renders 오류 발생
  const [btnName, setBtnName] = useState("생성");

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

  // 분류별 리스트 CreateSelector 값 불러오기
  const typeList = [
    useSelector(ssafySelector),
    useSelector(typeOneSelector),
    useSelector(typeTwoSelector),
  ];

  // settings에서 정한 분류값을 표현하기 위한 selector
  const typeName = useSelector((state) => {
    return state.Setting[0];
  });

  return (
    <KeyboardAvoidingView>
      <View>
        <View style={{ alignItems: "center", width: 400, height: 800 }}>
          <Text>개인 일정 추가: {typeName[Schedule.type]} </Text>
          {/* 타입 선택 버튼 묶음 */}
          <View style={{ flexDirection: "row", margin: 5 }}>
            {typeName.map((type, idx) => {
              return (
                <TouchableOpacity
                  key={`type-${idx}`}
                  style={[
                    styles.button,
                    { margin: 5 },
                    idx === Schedule.type ? { backgroundColor: "pink" } : {},
                  ]}
                  onPress={() => {
                    if (Schedule.type === idx) {
                      dispatch({ type: "Schedule/update", payload: { type: 3 } });
                    } else {
                      dispatch({
                        type: "Schedule/update",
                        payload: { type: idx },
                      });
                    }
                  }}
                >
                  <Text>{typeName[idx]}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {/* 일정 이름 입력 */}
          <View style={{ flexDirection: "row" }}>
            <Text>일정 : </Text>
            <TextInput
              style={{flexShrink:1}}
              multiline={true}
              placeholder="일정을 입력해 주세요"
              value={Schedule.title}
              onChangeText={(text) =>
                dispatch({ type: "Schedule/update", payload: { title: text } })
              }
            />
          </View>
          {/* 일정 내용 입력 */}
          <View style={{ flexDirection: "row" }}>
            <Text>일정 내용 : </Text>
            <TextInput
              style={{flexShrink:1}}
              multiline={true}
              placeholder="일정에 대한 상세 정보를 입력해 주세요"
              value={Schedule.content}
              onChangeText={(text) =>
                dispatch({ type: "Schedule/update", payload: { content: text } })
              }
            />
          </View>
          <Text>일정일: {Schedule.day}</Text>
          {/* 캘린더 */}
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
          {/* 일정 시각 선택(TimePicker) */}
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
            {errorMSG && (
              <View style={{ flexDirection: "row", margin: 4 }}>
                <Ionicons name="warning" size={19} color="red" />
                <Text style={{ fontWeight: "bold", color: "red" }}>
                  {errorMSG}
                </Text>
              </View>
            )}
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
              onPress={() => {
                if (Schedule.type === 3) {
                  setErrorMSG("일정의 분류를 선택해주세요");
                } else if (Schedule.title === "") {
                  setErrorMSG("일정 이름을 입력해주세요");
                } else if (Schedule.day === "") {
                  setErrorMSG("일정일을 선택해 주세요");
                } else {
                  // id가 있으면 수정
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
                    // 생성으로 보내는 것
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
                  // MakeSchedule 내용 정리
                  dispatch({ type: "Schedule/clear" });
                  // 저장하기
                  dispatch({ type: "ScheduleList/save" });
                  // 마크 다시 처리하기(일정 추가한 날로 옮김)
                  dispatch({ type: "ScheduleList/mark", day: Schedule.day });
                  // 마크 전체보기로 처리
                  dispatch({ type: "ScheduleList/mark", select: "all" });
                  // 스케쥴 리스트 다시 보이기
                  dispatch({
                    type: "ScheduleList/filter",
                  });
                  navigation.navigate("Calendar");
                }
              }}
            >
              <Text>{btnName}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
