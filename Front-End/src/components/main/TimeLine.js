import { View, Text, Button } from "react-native";
import TimeLineItem from "./TimeLineItem";
import styles from "../../../app.module.css";

function TimeLine({ navigation }) {
  return (
    <View style={styles.one}>
      <View>
        <Button
          title="어제" // 날짜 정보 받아서 넣어주기
          color="#C3E1EC" // 선택 여부에 따라서(T/F) 색상 다르게
          accessibilityLabel="어제 일정 보기"
        />
        <Button
          title="오늘" // 날짜 정보 받아서 넣어주기
          color="#94CBD9" // 선택 여부에 따라서(T/F) 색상 다르게
          accessibilityLabel="오늘 일정 보기"
        />
        <Button
          title="내일" // 날짜 정보 받아서 넣어주기
          color="#C3E1EC" // 선택 여부에 따라서(T/F) 색상 다르게
          accessibilityLabel="내일 일정 보기"
        />
        <Text>보이나?</Text>
      </View>
      <TimeLineItem />
    </View>
  );
}

export default TimeLine;