import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../../app.module.css";
import Timeline from "react-native-timeline-flatlist";
import weeklyData from "../../store/example/weeklyData.json";
import axios from "axios";

export default function TimeLine() {
  // 이번 주 월요일 날짜를 YYYYMMDD 포맷으로 만들기
  let today = new Date(); // 오늘 날짜
  let todayDay = today.getDay() - 1;

  // 이번 주 월요일 찾기
  function findMonday(thisMonday = today) {
    thisMonday.setDate(thisMonday.getDate() - todayDay);
    return thisMonday;
  }

  // 이번 주 월요일을 YYYYMMDD 형식으로 반환하기
  function formattingStartDate() {
    let startDate = findMonday();
    let formattedStartDate =
      startDate.getFullYear().toString() +
      (startDate.getMonth() + 1).toString().padStart(2, "0") +
      startDate.getDate().toString().padStart(2, "0");
    return formattedStartDate;
  }

  // axios를 통해서 이번 주 스케쥴 받아오기
  const baseURL = "http://127.0.0.1:8080/api/v1/plan/weekly/period/";

  axios({
    method: "get",
    url: `${baseURL}/${formattingStartDate()}`,
  }).then((response) => {
    console.log(response.data);
  });

  axios.get(`${baseURL}/${formattingStartDate()}`).then((response) => {
    console.log(response.data);
  });

  // 일일 스케쥴을 담아두는 변수
  const [scheduleData, setScheduleData] = useState();

  // 요일 버튼을 누르면 해당 요일의 스케줄 정보를 보여준다
  const selectedDay = (arg) => () => {
    setScheduleData(weeklyData[arg]);
  };

  useEffect(() => {
    if (scheduleData == undefined) {
      setScheduleData(weeklyData[todayDay]);
    }
  }, [todayDay]);

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
