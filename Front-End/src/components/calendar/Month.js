import { View, Text, Button } from "react-native";
import styles from "../../../app.module.css";
import CustomCalendar from "./CustomCalendar";

export default function Month() {
  return (
    <View>
      <View style={[{ flexDirection: "row", margin: 5 }]}>
        <Button title="싸피" />
        <Button title="스터디" />
        <Button title="개인일정" />
      </View>
      <CustomCalendar />
    </View>
  );
}
