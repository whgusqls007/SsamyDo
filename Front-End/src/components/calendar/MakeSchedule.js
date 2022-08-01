import { View, Text, Button, ActivityIndicator, TextInput } from "react-native";
import { useState, setState } from "react";
import styles from "../../../app.module.css";
import { Calendar } from "react-native-calendars";
import { render } from "react-dom";

export default function MakeSchedule() {
  const [Todo, setTodo] = useState({
    type: "",
    start: Date.now,
    end: "",
    title: "",
    content: "",
    status: false,
  });
  return (
    <View>
      <View style={{ alignItems: "center", width: 400, height: 800 }}>
        <Text>개인 일정 추가</Text>
        <View style={{ flexDirection: "row", margin: 5 }}>
          <Button
            onPress={(prevState) => {
              if (this.Todo.type === "SSAFY") {
                this.setTodo({ Todo: "" });
              }
              this.Todo.type = "SSAFY";
              console.log(this.Todo.type);
            }}
            title="싸피"
            // ...prevState,
            //   major: {
            //     ...prevState.major,
            //     name: "Tan Long",
            //   },
            //   minor: {
            //     ...prevState.minor,
            //     collegeRegion: "northEast"

            // }));
          />
          <Button title="스터디" />
          <Button title="개인일정" />
        </View>
        <Text>일정</Text>
        <TextInput placeholder="일정을 입력해 주세요" />
        <Text>일정 내용</Text>
        <TextInput placeholder="일정에 대한 상세 정보를 입력해 주세요" />
        <Text>시작일</Text>
        <Calendar />
      </View>
    </View>
  );
}
