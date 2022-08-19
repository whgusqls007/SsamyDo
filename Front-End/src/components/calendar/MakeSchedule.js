import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useSelector, useDispatch } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
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
    if (Schedule.id || Schedule.id === 0) {
      // 버튼 이름 수정
      setBtnName("수정");
      // 선택일 표시
      setMarkedDate({
        [Schedule.day]: { selected: true, selectedColor: "#f8d1ff" },
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
  const [btnName, setBtnName] = useState("등록");

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
      if (Platform.OS === "android") {
        setShow(false);
        // for iOS, add a button that closes the picker
      }
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
  const typeName = useSelector((state) => {
    return state.Account[3];
  });
  // 분류값 버튼 색을 위한
  const btnColor = ["#5ba8ff", "#ffe34f", "#ffc0cb"];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={MakeScheduleStyles.makeScheduleBG}
    >
      <View style={MakeScheduleStyles.topContainer}>
        {/* 뒤로 가기 버튼 */}
        <View style={MakeScheduleStyles.headerBack}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Calendar");
              dispatch({ type: "Schedule/clear" });
            }}
          >
            <Ionicons name="arrow-back" size={24} color="#ffffff" margin="0" />
          </TouchableOpacity>
        </View>
        <View style={MakeScheduleStyles.calendarContainer}>
          {/* 캘린더 */}
          <Calendar
            theme={{
              calendarBackground: "#5BA8FF",
              monthTextColor: "#ffffff",
              todayTextColor: "#FFE34F",
              dayTextColor: "#ffffff",
              textSectionTitleColor: "#111111",
              arrowColor: "#ffffff",
              "stylesheet.calendar.header": {
                dayTextAtIndex0: { color: "red" },
                dayTextAtIndex6: { color: "#A8D1FF" },
              },
            }}
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
                [day.dateString]: {
                  selected: true,
                  selectedColor: "#a8d1ff",
                  textColor: "#5ba8ff",
                },
              });
            }}
            markedDates={MarkedDate}
          />
        </View>
      </View>
      <View style={MakeScheduleStyles.bottomContainer}>
        <View style={MakeScheduleStyles.userInputBox}>
          {/* 타입 선택 버튼 묶음 */}
          <View style={MakeScheduleStyles.categoryContainer}>
            {typeName.map((type, idx) => {
              return (
                <TouchableOpacity
                  key={`type-${idx}`}
                  style={[
                    MakeScheduleStyles.categoryBox,
                    idx === Schedule.type ? { backgroundColor: "#a8d1ff" } : {},
                  ]}
                  onPress={() => {
                    if (Schedule.type === idx) {
                      dispatch({
                        type: "Schedule/update",
                        payload: { type: 3 },
                      });
                    } else {
                      dispatch({
                        type: "Schedule/update",
                        payload: { type: idx },
                      });
                    }
                  }}
                >
                  <View style={MakeScheduleStyles.categoryContents}>
                    <Ionicons
                      name="ellipse-sharp"
                      size={10}
                      color={btnColor[idx]}
                    />
                    <Text> {typeName[idx]}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          {/* 일정 이름 입력 */}
          <View style={MakeScheduleStyles.scheduleTitleBox}>
            <TextInput
              style={{ flexShrink: 1 }}
              maxLength={17}
              placeholder="일정을 입력해주세요"
              placeholderTextColor="#888888"
              value={Schedule.title}
              onChangeText={(text) =>
                dispatch({
                  type: "Schedule/update",
                  payload: { title: text },
                })
              }
            />
          </View>
          {/* 일정 시각 선택(TimePicker) */}
          <TouchableOpacity
            style={MakeScheduleStyles.timeBox}
            onPress={() => {
              setShow(true);
            }}
          >
            <Text style={MakeScheduleStyles.timeText}>
              {Schedule.time[0].toString().padStart(2, "0")} :{" "}
              {Schedule.time[1].toString().padStart(2, "0")}
            </Text>
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
          {/* 에러메세지 */}
          {errorMSG ? (
            <View style={MakeScheduleStyles.errorContainer}>
              <Ionicons name="warning" size={19} color="#C22D37" />
              <Text style={{ fontWeight: "bold", color: "#C22D37" }}>
                {errorMSG}
              </Text>
            </View>
          ) : (
            <View style={MakeScheduleStyles.errorContainer}></View>
          )}
          {/* 등록 버튼 */}
          <View style={MakeScheduleStyles.submitContainer}>
            <TouchableOpacity
              style={MakeScheduleStyles.submitBtn}
              onPress={() => {
                if (Schedule.type === 3) {
                  setErrorMSG("일정의 분류를 선택해주세요");
                } else if (Schedule.title === "") {
                  setErrorMSG("일정 이름을 입력해주세요");
                } else if (Schedule.day === "") {
                  setErrorMSG("일정일을 선택해주세요");
                } else {
                  // id가 있으면 수정
                  if (Schedule.id) {
                    dispatch({
                      type: "ScheduleList/update",
                      payload: {
                        id: Schedule.id,
                        type: Schedule.type,
                        title: Schedule.title,
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
              <Text style={MakeScheduleStyles.submitBtnText}>{btnName}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const MakeScheduleStyles = StyleSheet.create({
  // 상단 컨테이너: 헤더 + 달력
  topContainer: {
    paddingTop: "3%",
    paddingBottom: "5%",
    paddingHorizontal: "5%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: "#5ba8ff",
  },
  headerBack: {
    marginTop: "5%",
  },
  // 하단 컨테이너: 분류 + 일정 제목 + 시간 + 등록 버튼
  bottomContainer: {
    height: "100%",
    backgroundColor: "#ffffff",
  },
  // 유저 입력칸: 분류 + 일정 제목 + 시간
  userInputBox: {
    padding: "10%",
  },
  // 분류
  categoryContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "4%",
  },
  // 분류 선택 버튼
  categoryBox: {
    borderWidth: 1,
    borderColor: "#ededed",
    borderRadius: 3,
    marginRight: "3%",
    paddingVertical: "1%",
    paddingHorizontal: "3%",
  },
  // 분류 버튼 내부
  categoryContents: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  // 일정 제목
  scheduleTitleBox: {
    borderRadius: 10,
    marginBottom: "4%",
    backgroundColor: "#ededed",
    padding: "2%",
    paddingLeft: "4%",
  },
  // 시간 선택
  timeBox: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#ededed",
    padding: "3%",
    paddingLeft: "4%",
    borderRadius: 10,
  },
  timeText: {
    fontSize: 15,
    color: "#111111",
  },
  submitContainer: {
    height: "20%",
  },
  submitBtn: {
    padding: "4%",
    borderRadius: 10,
    backgroundColor: "#5ba8ff",
  },
  submitBtnText: { color: "#ffffff", fontSize: 18, textAlign: "center" },
  // 에러메시지 관련
  errorContainer: {
    height: "15%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  errorBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 7,
    margin: 7,
  },
  errText: { fontWeight: "bold", color: "#C22D37", textAlign: "center" },
});
