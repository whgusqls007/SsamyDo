import { View, Button } from "react-native";
import Month from "../components/calendar/Month";
import ScheduleList from "../components/calendar/ScheduleList";
import styles from "../../app.module.css";
import MakeSchedule from "../components/calendar/MakeSchedule";

export default function Calendar({ navigation }) {
  return (
    <View>
      <Month />
      <ScheduleList navigation={navigation} />
      <Button
        title="ADD"
        onPress={() => {
          navigation.navigate("MakeSchedule");
        }}
      />
    </View>
  );
}
