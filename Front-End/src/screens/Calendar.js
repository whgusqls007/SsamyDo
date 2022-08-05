import { View, Text, TouchableOpacity } from "react-native";
import Month from "../components/calendar/Month";
import styles from "../../app.module.css";

export default function Calendar({ navigation }) {
  return (
    <View>
      <Month />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("MakeSchedule");
        }}
      >
        <Text>일정 추가</Text>
      </TouchableOpacity>
    </View>
  );
}
