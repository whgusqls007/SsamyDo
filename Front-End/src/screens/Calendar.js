import { View, Text, Button } from "react-native";
import Month from "../components/calendar/Month";
import ScheduleList from "../components/calendar/ScheduleList";
import styles from "../../app.module.css";

export default function Calendar({ navigation }) {
  return (
    <View style={[styles.center, styles.border]}>
      <Text>Calendar</Text>
      <Month />
      <ScheduleList navigation={navigation} />
      <Button title="ADD" onPress={() => navigation.navigate("MakeSchedule")} />
    </View>
  );
}
