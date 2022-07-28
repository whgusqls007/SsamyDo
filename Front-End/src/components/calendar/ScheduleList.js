import { View, Text } from "react-native";
import ScheduleItem from "./ScheduleItem";
import styles from "../../../app.module.css";

export default function ScheduleList({ navigation }) {
  return (
    <View style={styles.one}>
      <Text>ScheduleList.js</Text>
      <ScheduleItem navigation={navigation} />
    </View>
  );
}
