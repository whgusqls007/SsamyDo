import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import ScheduleItem from "./ScheduleItem";
import { useDispatch, useSelector } from "react-redux";

export default function ScheduleList({ navigation }) {
  const dispatch = useDispatch();

  // 보여줄 해당일의 일정
  const ScheduleList = useSelector((state) => {
    return state.ScheduleList[3];
  });

  const selectDay = useSelector((state) => {
    return state.ScheduleList[4][1];
  });

  return (
    <View style={ScheduleListStyles.pickedDayContainer}>
      {/* 리스트 값이 없을 수 있으므로 조건부 */}
      <View style={ScheduleListStyles.pickedDayTitle}>
        <Text style={ScheduleListStyles.pickedDayText}>
          {selectDay.slice(0, 4)}년 {selectDay.slice(5, 7)}월{" "}
          {selectDay.slice(8, 10)}일
        </Text>
      </View>
      <ScrollView>
        {ScheduleList.map((Schedule) => {
          return (
            <ScheduleItem
              navigation={navigation}
              Schedule={Schedule}
              key={Schedule.id}
            />
          );
        })}
      </ScrollView>
      {/* 일정 추가 버튼 */}
      <TouchableOpacity
        style={ScheduleListStyles.createBtn}
        onPress={() => {
          // schedule 내용 지우기
          dispatch({ type: "Schedule/clear" });
          dispatch({ type: "Schedule/btn", name: "생성" });
          navigation.navigate("MakeSchedule");
        }}
      >
        <Image
          source={{
            uri: "https://lab.ssafy.com/s07-webmobile2-sub2/S07P12E204/uploads/d2b6d191a96940ae062941cd8d6d0940/add.png",
          }}
          style={ScheduleListStyles.createBtnImg}
        />
      </TouchableOpacity>
    </View>
  );
}

const ScheduleListStyles = StyleSheet.create({
  pickedDayContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5ba8ff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
    height: "45%",
  },
  pickedDayTitle: {
    width: "100%",
    paddingLeft: "4%",
    paddingVertical: "6%",
  },
  pickedDayText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  createBtn: {
    position: "absolute",
    borderRadius: 50,
    padding: "5%",
    width: "12%",
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
    right: "4.5%",
    bottom: "2%",
    shadowColor: "#888888",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
  },
  createBtnImg: {
    resizeMode: "contain",
    width: "120%",
    height: "120%",
  },
});
