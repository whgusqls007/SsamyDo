import { View, Text, Button, TextInput } from "react-native";
import styles from "../../../app.module.css";
import { Calendar } from "react-native-calendars";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

export default function MakeSchedule({ navigation }) {
  // Store 활용을 위한 변수 설정
  const dispatch = useDispatch();
  const Todo = useSelector((state) => {
    return state.Todo[0];
  });
  const MarkedDate = useSelector((state) => {
    return state.Todo[1];
  });
  // const [type, setType] = useState("오전");
  const id = useSelector((state) => {
    return state.TodoList[1];
  });

  return (
    <View>
      <Text></Text>
      <View style={{ alignItems: "center", width: 400, height: 800 }}>
        <Text>개인 일정 추가: {Todo.type} </Text>
        <View style={{ flexDirection: "row", margin: 5 }}>
          <Button
            title="스터디"
            onPress={() => {
              if (Todo.type === 1) {
                dispatch({ type: "Todo/select", select: 0 });
              } else {
                dispatch({ type: "Todo/select", select: 1 });
              }
            }}
          />
          <Button
            title="개인일정"
            onPress={() => {
              if (Todo.type === 2) {
                dispatch({ type: "Todo/select", select: 0 });
              } else {
                dispatch({ type: "Todo/select", select: 2 });
              }
            }}
          />
          <Button
            title="생성"
            onPress={() => {
              if (Todo.type === 0) {
                alert("일정의 분류를 선택해주세요");
              } else if (Todo.title === "") {
                alert("일정 이름을 입력해주세요");
              } else if (Todo.start === "" || Todo.end === "") {
                alert("일정의 시간을 입력해 주세요");
              } else {
                dispatch({
                  type: "TodoList/add",
                  payload: {
                    id: id,
                    type: Todo.type,
                    title: Todo.title,
                    content: Todo.content,
                    start: Todo.start,
                    end: Todo.end,
                    // time: Todo.time,
                  },
                });
                dispatch({ type: "Todo/clear" });
                navigation.navigate("Calendar");
                dispatch({ type: "TodoList/save" });
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
          style={{ maxheight: 200 }}
          hideExtraDays={true}
          onDayPress={(day) => {
            if (day.dateString === Todo.end) {
              dispatch({ type: "Todo/end", end: "" });
            } else if (Todo.start === "") {
              dispatch({ type: "Todo/start", start: day.dateString });
              // 하나로 하는 경우 하루를 선택하는 방법 고민하기
            } else if (day.dateString === Todo.start) {
              dispatch({ type: "Todo/start", start: "" });
              dispatch({ type: "Todo/end", end: "" });
            } else if (new Date(day.dateString) < new Date(Todo.start)) {
              alert("종료일을 잘 못 설정하셨습니다.");
            } else {
              dispatch({ type: "Todo/end", end: day.dateString });
            }
          }}
          markingType={"multi-dot"}
          markedDates={MarkedDate}
        />
        {/* <View style={{ flexDirection: "row", margin: 5 }}>
          <Button
            title={type}
            onPress={() => {
              if (Todo.time[0] == 0) {
                dispatch({ type: "Todo/timeType", select: 1 });
                setType("오후");
              } else {
                dispatch({ type: "Todo/timeType", select: 0 });
                setType("오전");
              }
            }}
          />
        </View> */}
      </View>
    </View>
  );
}
