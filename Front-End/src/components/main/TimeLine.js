import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import styles from "../../../app.module.css";
import Timeline from "react-native-timeline-flatlist";
// import weeklyData from "../../store/example/weeklyData.json";
import weeklyData from "../../store/example/weeklyData2.json";
import axios from "axios";

export default function TimeLine() {
  // 접속일 기준 이번 주 월요일 찾기
  function findMonday() {
    let result = new Date(); // 접속한 날짜
    result.setDate(result.getDate() - (result.getDay() - 1));
    return result;
  }

  // 날짜를 YYYYMMDD 형식으로 반환하기
  function ymdFormat(oriDate) {
    let result =
      oriDate.getFullYear().toString() +
      (oriDate.getMonth() + 1).toString().padStart(2, "0") +
      oriDate.getDate().toString().padStart(2, "0");
    return result;
  }

  // 이번주 월요일부터 금요일까지 YYYYMMDD 형식으로 리스트에 넣기
  function formattingWeek(start = findMonday()) {
    let result = [ymdFormat(start)];
    for (let index = 1; index < 5; index++) {
      start.setDate(start.getDate() + 1);
      result.push(ymdFormat(start));
    }
    return result;
  }

  // 일주일 정보 재구성하기
  function classifyWeekData(weekly) {
    // 빈 객체 만들기
    let result = {};
    const thisWeek = formattingWeek();
    for (let date of thisWeek) {
      result[date] = [];
    }
    // 같은 날짜끼리 묶기
    for (let i = 0; i < weekly.data.length; i++) {
      let daily = weekly.data[i];
      let startTime = Number(daily.time.substring(0, 2));
      let endTime = Number(daily.time.substring(6, 8));
      const lunch = {
        title: "점심시간",
        time: "12:00",
      };
      const lunch2 = {
        title: "점심시간",
        time: "12:20",
      };

      // 오전에 시작해서 오전에 끝나는 일정
      if (startTime < 12 && endTime <= 12) {
        daily.time = daily.time.substring(0, 5);
        result[daily.date].push(daily);
      }
      // 오전에 시작해서 오후에 끝나는 일정 => 사이에 점심시간 추가
      else if (startTime < 12 && endTime > 12) {
        const beforeLunch = JSON.parse(JSON.stringify(daily));
        const afterLunch = JSON.parse(JSON.stringify(daily));
        startTime = startTime.toString().padStart(2, "0");
        // 대면하는 날 => 점심시간 12:20~13:30
        if (daily.date === ymdFormat(findMonday())) {
          // 점심 이전
          beforeLunch.time = beforeLunch.time.substring(0, 5);
          // beforeLunch.time = `${startTime}:00~12:20`;
          result[daily.date].push(beforeLunch);
          // 점심
          result[daily.date].push(lunch2);
          // 점심 이후
          afterLunch.time = "13:30";
          // afterLunch.time = `13:30~${endTime}:00`;
          result[daily.date].push(afterLunch);
        }
        // 비대면하는 날 => 점심시간 12:00~13:00
        else {
          // 점심 이전
          beforeLunch.time = beforeLunch.time.substring(0, 5);
          // beforeLunch.time = `${startTime}:00~12:00`;
          result[daily.date].push(beforeLunch);
          // 점심
          result[daily.date].push(lunch);
          // 점심 이후
          afterLunch.time = "13:00";
          // afterLunch.time = `13:00~${endTime}:00`;
          result[daily.date].push(afterLunch);
        }
      } else {
        result[daily.date].push(daily);
      }
    }
    const theLast = {
      title: "오늘 하루 끝!",
      time: "18:00",
    };
    for (let d of thisWeek) {
      if (result[d] != []) {
        result[d].push(theLast);
      }
    }
    return result;
  }

  // 일일 스케쥴을 담아두는 변수
  const [scheduleData, setScheduleData] = useState();
  // const [weeklySchedule, setWeeklySchedule] = useState();

  // 변수 모음
  const today = ymdFormat(new Date());
  const thisMonday = findMonday();
  const thisWeek = formattingWeek(thisMonday);
  let classifiedData;

  // axios를 통해서 이번 주 스케쥴 받아오기
  const baseURL = "http://i7e204.p.ssafy.io:8080/api/plan/weekly/period/";

  // axios({
  //   method: "get",
  //   url: `${baseURL}${ymdFormat(thisMonday)}`,
  // })
  //   .then((response) => {
  //     // console.log("Axios 요청 성공!");
  //     // console.log(response.data);
  //     classifiedData = classifyWeekData(response.data);
  //     // console.log(classifiedData);
  //   })
  //   .catch((error) => {
  //     console.log(error.response);
  //   });

  // axios 요청 오기 전까지
  // console.log(weeklyData);
  classifiedData = classifyWeekData(weeklyData);
  // console.log(classifiedData);

  // 요일 버튼을 누르면 해당 요일의 스케줄 정보를 보여준다
  const selectedDay = (arg) => () => {
    setScheduleData(classifiedData[thisWeek[arg]]);
  };

  // 오늘 스케쥴부터 보여주기
  useEffect(() => {
    if (scheduleData == undefined) {
      setScheduleData(classifiedData[today]);
    }
  }, [today]);

  return (
    <View style={{ flex: 1, backgroundColor: "#E5F3F6" }}>
      {/* 버튼 */}
      <View
        style={{
          height: "12%",
          flexDirection: "row",
          justifyContent: "center",
          paddingBottom: 4,
        }}
      >
        <TouchableOpacity style={mainStyles.dayButton} onPress={selectedDay(0)}>
          <Text>월요일</Text>
        </TouchableOpacity>
        <TouchableOpacity style={mainStyles.dayButton} onPress={selectedDay(1)}>
          <Text>화요일</Text>
        </TouchableOpacity>
        <TouchableOpacity style={mainStyles.dayButton} onPress={selectedDay(2)}>
          <Text>수요일</Text>
        </TouchableOpacity>
        <TouchableOpacity style={mainStyles.dayButton} onPress={selectedDay(3)}>
          <Text>목요일</Text>
        </TouchableOpacity>
        <TouchableOpacity style={mainStyles.dayButton} onPress={selectedDay(4)}>
          <Text>금요일</Text>
        </TouchableOpacity>
      </View>
      {/* 타임라인 */}
      <View
        style={{
          flex: 4,
          marginTop: 15,
          paddingHorizontal: 15,
        }}
      >
        {/* <TimeLineItem /> */}
        <Timeline
          style={styles.list}
          data={scheduleData}
          circleSize={12}
          circleColor="#6986A8"
          lineColor="#94CBD9"
          lineWidth={4}
          timeContainerStyle={{ minWidth: 52, marginTop: -5, marginRight: -10 }}
          timeStyle={{
            textAlign: "center",
            backgroundColor: "#94CBD9",
            color: "#E5F3F6",
            padding: 2,
            borderRadius: 10,
          }}
          titleStyle={{
            minHeight: 40,
            backgroundColor: "#94CBD9",
            borderRadius: 10,
            fontWeight: "400",
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
        />
      </View>
    </View>
  );
}

const mainStyles = StyleSheet.create({
  dayButton: {
    backgroundColor: "#C3E1EC",
    marginHorizontal: 5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 7,
  },
});
