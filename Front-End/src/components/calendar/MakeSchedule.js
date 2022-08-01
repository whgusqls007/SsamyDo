import { View, Text, Button, TextInput } from "react-native";
import { useState } from "react";
import styles from "../../../app.module.css";
import { Calendar } from "react-native-calendars";
import { useSelector, useDispatch } from "react-redux";
import CalendarPicker from "react-native-calendar-picker";

export default function MakeSchedule({ navigation }) {
  const dispatch = useDispatch();
  const Todo = useSelector((state) => {
    return state.Todo;
  });
  const [startDay, setstartDay] = useState(Todo.start);
  const [endDay, setendDay] = useState(Todo.end);

  return (
    <View>
      <View style={{ alignItems: "center", width: 400, height: 800 }}>
        <Text>개인 일정 추가: {Todo.type} </Text>
        <View style={{ flexDirection: "row", margin: 5 }}>
          <Button
            title="스터디"
            onPress={() => {
              if (Todo.type === "스터디") {
                dispatch({ type: "Todo/select", select: "" });
              } else {
                dispatch({ type: "Todo/select", select: "스터디" });
              }
            }}
          />
          <Button
            title="개인일정"
            onPress={() => {
              if (Todo.type === "개인일정") {
                dispatch({ type: "Todo/select", select: "" });
              } else {
                dispatch({ type: "Todo/select", select: "개인일정" });
              }
            }}
          />
          <Button
            title="생성"
            onPress={() => {
              if (Todo.type === "") {
                alert("일정의 분류를 선택해주세요");
              } else if (Todo.title === "") {
                alert("일정 이름을 입력해주세요");
              } else if (Todo.start === "" || Todo.end === "") {
                alert("일정의 시간을 입력해 주세요");
              } else {
                dispatch({ type: "TodoList/add", payload: Todo });
                dispatch({ type: "Todo/clear" });
                setendDay("");
                setstartDay("");
                navigation.navigate("Calendar");
                console.log(startDay);
              }
            }}
          />
        </View>
        <Text>일정 : {Todo.title} </Text>
        <TextInput
          placeholder="일정을 입력해 주세요"
          value={Todo.title}
          onChangeText={(text) => dispatch({ type: "Todo/title", title: text })}
        />
        <Text>일정 내용 : {Todo.content}</Text>
        <TextInput
          placeholder="일정에 대한 상세 정보를 입력해 주세요"
          value={Todo.content}
          onChangeText={(text) =>
            dispatch({ type: "Todo/content", content: text })
          }
        />
        <Text>날짜 선택</Text>
        <Text>시작일: {Todo.start}</Text>
        <Text>종료일: {Todo.end}</Text>
        <Calendar
          hideExtraDays={true}
          onDayPress={(day) => {
            if (day.dateString === Todo.end) {
              dispatch({ type: "Todo/end", end: "" });
              setendDay("");
            } else if (Todo.start === "") {
              dispatch({ type: "Todo/start", start: day.dateString });
              setstartDay(day.dateString);
              // 하나로 하는 경우 하루를 선택하는 방법 고민하기
            } else if (day.dateString === Todo.start) {
              dispatch({ type: "Todo/start", start: "" });
              setstartDay("");
            } else if (new Date(day.dateString) < new Date(Todo.start)) {
              alert("종료일을 잘 못 설정하셨습니다.");
            } else {
              dispatch({ type: "Todo/end", end: day.dateString });
              setendDay(day.dateString);
            }
          }}
          markingType={"period"}
          markedDates={{
            startDay: { startingDay: true, color: "green" },
            endDay: {
              selected: true,
              endingDay: true,
              color: "green",
              textColor: "gray",
            },
          }}
        />
      </View>
    </View>
  );
}
