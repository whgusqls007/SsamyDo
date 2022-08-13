import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Pressable,
} from "react-native";
import styles from "../../../app.module.css";
import Timeline from "react-native-timeline-flatlist";
// import weeklyData from "../../store/example/weeklyData2.json";
import axios from "axios";
import LunchMenu from "./LunchMenu";

export default function TimeLine() {
  // 수업일과 주말을 구분하는 변수
  let weekdays = "true";

  // 접속일 기준 이번 주 월요일 찾기
  function findMonday() {
    let result = new Date(); // 접속한 날짜
    result.setDate(result.getDate() - (result.getDay() - 1));
    // 오늘이 주말이라면 주말 표시
    if (result.getDay() == 0 || result.getDay() == 6) {
      weekdays = false;
    }
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
        daily.time = daily.time.substring(0, 5);
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
  const [weeklySchedule, setWeeklySchedule] = useState("undefined");

  // 변수 모음
  const today = ymdFormat(new Date());
  const thisMonday = findMonday();
  const thisWeek = formattingWeek(thisMonday);

  // axios를 통해서 이번 주 스케쥴 받아오기
  const baseURL = "http://i7e204.p.ssafy.io:8080/api/plan/weekly/period/";
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${baseURL}${ymdFormat(findMonday())}`);
      return response.data;
    }
    fetchData().then((res) => {
      setWeeklySchedule(classifyWeekData(res));
    });
    fetchData().catch((err) => {
      console.log(err.response);
    });
  }, []);

  // 요일 버튼을 누르면 해당 요일의 스케줄 정보를 보여준다
  const selectedDay = (arg) => () => {
    // 주중으로 표시
    weekdays = "true";
    setScheduleData(weeklySchedule[thisWeek[arg]]);
  };

  // 오늘 스케쥴부터 보여주기
  useEffect(() => {
    if (scheduleData == undefined) {
      if (weekdays) {
        setScheduleData(weeklySchedule[today]);
      } else {
        console.log("주말이에요");
      }
    }
  }, [weeklySchedule]);

  // 점심 메뉴 모달
  const [showLunch, setShowLunch] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.timelineContainer}>
      {/* 요일 버튼 */}
      <View style={timelineStyles.dayContainer}>
        <TouchableOpacity
          style={timelineStyles.dayButton}
          onPress={selectedDay(0)}
        >
          <Text style={timelineStyles.dayText}>
            {thisWeek[0].substring(6, 8)}
            {"\n"}월
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={timelineStyles.dayButton}
          onPress={selectedDay(1)}
        >
          <Text style={timelineStyles.dayText}>
            {thisWeek[1].substring(6, 8)}
            {"\n"}화
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={timelineStyles.dayButton}
          onPress={selectedDay(2)}
        >
          <Text style={timelineStyles.dayText}>
            {thisWeek[2].substring(6, 8)}
            {"\n"}수
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={timelineStyles.dayButton}
          onPress={selectedDay(3)}
        >
          <Text style={timelineStyles.dayText}>
            {thisWeek[3].substring(6, 8)}
            {"\n"}목
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={timelineStyles.dayButton}
          onPress={selectedDay(4)}
        >
          <Text style={timelineStyles.dayText}>
            {thisWeek[4].substring(6, 8)}
            {"\n"}금
          </Text>
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
        {weekdays && (
          <Timeline
            style={styles.list}
            data={scheduleData}
            circleSize={12}
            circleColor="#A8D1FF"
            lineColor="#A8D1FF"
            lineWidth={4}
            timeContainerStyle={{
              minWidth: 52,
              marginTop: -5,
              marginRight: -10,
            }}
            timeStyle={{
              textAlign: "center",
              color: "#111111",
              padding: 2,
              borderRadius: 10,
              fontWeight: "500",
            }}
            titleStyle={{
              minHeight: 50,
              backgroundColor: "#EDEDED",
              borderRadius: 10,
              color: "#111111",
              fontWeight: "400",
              paddingHorizontal: 13,
              paddingVertical: 13,
            }}
          />
        )}
        {!weekdays && (
          <View>
            <Text>오늘은 쉬는 날이에요!</Text>
          </View>
        )}
      </View>
      {/* 점심 버튼 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={timelineStyles.centeredView}>
          <View style={timelineStyles.modalView}>
            <LunchMenu />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        activeOpacity={0.7}
        style={timelineStyles.touchableOpacityStyle}
        onPress={() => setModalVisible(true)}
      >
        <Image
          source={{
            uri: "https://lab.ssafy.com/s07-webmobile2-sub2/S07P12E204/uploads/c90cea420d8a3cb833a0418a7c1e7c69/lunch.png",
          }}
          style={timelineStyles.floatingButtonStyle}
        />
      </TouchableOpacity>
    </View>
  );
}

const timelineStyles = StyleSheet.create({
  dayContainer: {
    height: "20%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 4,
  },
  dayButton: {
    backgroundColor: "#EDEDED",
    marginHorizontal: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  dayText: {
    textAlign: "center",
  },
  touchableOpacityStyle: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 5,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 55,
    height: 55,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
