import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../../app.module.css";
import Timeline from "react-native-timeline-flatlist";
import weeklyData from "../../store/example/weeklyData.json";

export default function TimeLine() {
  // 날짜 데이터 받기 위한 변수
  const [scheduleData, setScheduleData] = useState("");
  // const [dailyData, setDailyData] = useState("")

  // 요일 버튼 => 해당 요일 스케쥴 보여주고, 버튼 CSS 변경
  let dailyData;
  const selectedDay = (arg) => () => {
    setScheduleData(weeklyData[arg]);
    console.log(dailyData);
  };

  return (
    // 타임라인 전체 container
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: "15%",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity style={styles.button} onPress={selectedDay(0)}>
          <Text>월요일</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={selectedDay(1)}>
          <Text>화요일</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={selectedDay(2)}>
          <Text>수요일</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={selectedDay(3)}>
          <Text>목요일</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={selectedDay(4)}>
          <Text>금요일</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 4 }}>
        {/* <TimeLineItem /> */}
        <Timeline style={styles.list} data={scheduleData} />
      </View>
    </View>
  );
}
