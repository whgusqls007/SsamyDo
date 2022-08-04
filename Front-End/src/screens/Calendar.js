import { View, Button } from "react-native";
import Month from "../components/calendar/Month";
import styles from "../../app.module.css";

export default function Calendar({ navigation }) {
  return (
    <View>
      <Month />
      <Button
        title="ADD"
        onPress={() => {
          navigation.navigate("MakeSchedule");
        }}
      />
    </View>
  );
}
