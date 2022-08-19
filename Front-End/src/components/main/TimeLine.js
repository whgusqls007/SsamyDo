import { useEffect, useState } from "react";
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
import axios from "axios";
import LunchBoard from "./LunchBoard";
import drf from "../../api/drf";
import { useSelector } from "react-redux";

export default function TimeLine({ navigation }) {
  // 토큰
  const token = useSelector((state) => {
    return state.Account[2];
  });
  // 수업일과 주말을 구분하는 변수
  let weekdays = "true";

  // 접속일 기준 이번 주 월요일 찾기
  function findMonday() {
    let result = new Date(); // 접속한 날짜
    // 오늘이 주말이라면 주말 표시
    if (result.getDay() == 0 || result.getDay() == 6) {
      weekdays = false;
    }
    // 오늘 날짜에서 오늘 요일의 인덱스 -1을 빼면 월요일이 나온다
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
      // 오전에 시작해서 12시 전에 끝나는 일정
      if (startTime < 12 && endTime <= 12) {
        daily.time = daily.time.substring(0, 5);
        result[daily.date].push(daily);
        // 오전에 시작해서 딱 점심시간에 끝나는 일정 & 대면
        //
        if (endTime == 12 && daily.date === ymdFormat(findMonday())) {
          result[daily.date].push(lunch2);
        } else {
          result[daily.date].push(lunch);
        }
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
          result[daily.date].push(beforeLunch);
          // 점심
          result[daily.date].push(lunch2);
          // 점심 이후
          afterLunch.time = "13:30";
          result[daily.date].push(afterLunch);
        }
        // 비대면하는 날 => 점심시간 12:00~13:00
        else {
          // 점심 이전
          beforeLunch.time = beforeLunch.time.substring(0, 5);
          result[daily.date].push(beforeLunch);
          // 점심
          result[daily.date].push(lunch);
          // 점심 이후
          afterLunch.time = "13:00";
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
    const holiday = {
      title: "오늘은 쉬는 날!",
    };
    // 마지막에 하루 끝 입력 but 공휴일에는 X
    for (let d of thisWeek) {
      if (result[d].length) {
        result[d].push(theLast);
      } else {
        result[d].push(holiday);
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
  useEffect(() => {
    async function fetchData() {
      const response = await axios({
        method: "get",
        url: drf.plan.weekly(ymdFormat(findMonday())),
        headers: token,
      }).catch(() => {
        navigation.navigate("Verification");
      });
      return response.data;
    }
    fetchData().then((res) => {
      setWeeklySchedule(classifyWeekData(res));
    });
    fetchData().catch((err) => {
      console.log(err.response);
    });
  }, []);

  // 요일 반복 컴포넌트화
  const [dayBtns, setDayBtns] = useState({
    days: [
      {
        id: 0,
        date: thisWeek[0].substring(6, 8),
        day: "월",
        backgroundcolor: "#EDEDED",
      },
      {
        id: 1,
        date: thisWeek[1].substring(6, 8),
        day: "화",
        backgroundcolor: "#EDEDED",
      },
      {
        id: 2,
        date: thisWeek[2].substring(6, 8),
        day: "수",
        backgroundcolor: "#EDEDED",
      },
      {
        id: 3,
        date: thisWeek[3].substring(6, 8),
        day: "목",
        backgroundcolor: "#EDEDED",
      },
      {
        id: 4,
        date: thisWeek[4].substring(6, 8),
        day: "금",
        backgroundcolor: "#EDEDED",
      },
    ],
  });

  // 배경 색 바꾸는 함수
  const changeBackground = (arg) => {
    let daysData = dayBtns.days;
    for (let x = 0; x < daysData.length; x++) {
      if (daysData[x].id == arg) {
        daysData[x].backgroundcolor = "#FFE34F";

        setDayBtns({
          days: daysData,
        });
      } else {
        daysData[x].backgroundcolor = "#EDEDED";

        setDayBtns({
          days: daysData,
        });
      }
    }
  };

  // 요일 버튼을 누르면 해당 요일의 스케줄 정보를 보여준다
  const selectedDay = (arg) => () => {
    // 주중으로 표시
    weekdays = "true";
    // 일일 스케쥴 넣기
    setScheduleData(weeklySchedule[thisWeek[arg]]);
    // 색 바꿔주기
    changeBackground(arg);
  };

  // 오늘 스케쥴부터 보여주기
  useEffect(() => {
    if (scheduleData == undefined) {
      setScheduleData(weeklySchedule[today]);
      // 버튼 색 바꾸기
      changeBackground(thisWeek.indexOf(today));
    }
  }, [weeklySchedule]);

  // 점심 메뉴 모달
  const [showLunch, setShowLunch] = useState(false);

  return (
    <View style={styles.timelineContainer}>
      {/* 요일 버튼 */}
      <View style={timelineStyles.dayContainer}>
        {dayBtns.days.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              timelineStyles.dayButton,
              { backgroundColor: item.backgroundcolor },
            ]}
            onPress={selectedDay(item.id)}
          >
            <Text style={timelineStyles.dayText}>
              {item.date}
              {"\n"}
              {item.day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* 타임라인 */}
      <View style={timelineStyles.timelineContainer}>
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
        visible={showLunch}
        onRequestClose={() => {
          setShowLunch(!showLunch);
        }}
      >
        <View style={timelineStyles.centeredView}>
          <View style={timelineStyles.modalView}>
            <Text style={timelineStyles.lunchTitle}>💛 오늘의 식단 💛</Text>
            <LunchBoard navigation={navigation} />
            <Pressable
              style={[timelineStyles.closeBtn]}
              onPress={() => setShowLunch(!showLunch)}
            >
              <Text style={styles.textStyle}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        activeOpacity={0.7}
        style={timelineStyles.lunchShowBtn}
        onPress={() => setShowLunch(true)}
      >
        <Image
          source={{
            uri: "https://lab.ssafy.com/s07-webmobile2-sub2/S07P12E204/uploads/79d8029df4cff51d6f96b8fa7917a814/lunch2.png",
          }}
          style={timelineStyles.lunchBtnImg}
        />
      </TouchableOpacity>
    </View>
  );
}

const timelineStyles = StyleSheet.create({
  dayContainer: {
    height: "22%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2%",
    paddingBottom: "4%",
  },
  dayButton: {
    marginHorizontal: "1.2%",
    paddingHorizontal: "5%",
    paddingVertical: "1%",
    borderRadius: 7,
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  dayText: {
    textAlign: "center",
    color: "#111111",
  },
  timelineContainer: {
    flex: 4,
    marginTop: "5%",
    paddingHorizontal: "4%",
  },
  lunchTitle: {
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: "2%",
    color: "#111111",
  },
  lunchShowBtn: {
    position: "absolute",
    borderRadius: 50,
    padding: "5%",
    width: "12%",
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
    right: "4%",
    bottom: "3%",
    shadowColor: "#888888",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
  },
  lunchBtnImg: {
    resizeMode: "contain",
    width: "120%",
    height: "120%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: "5%",
  },
  modalView: {
    margin: "1%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: "7%",
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
  closeBtn: {
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    marginTop: "3%",
    borderRadius: 3,
    backgroundColor: "#a8d1ff",
  },
});
