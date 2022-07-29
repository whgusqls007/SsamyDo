import { View, Text, Button } from "react-native";
import styles from "../../../app.module.css";

export default function ScheduleItem({ navigation }) {
  return (
    <View style={[styles.two, { flexDirection: "row" }]}>
      <Text>ScheduleItem.js</Text>
      <Button
        title="Detail"
        onPress={() => navigation.navigate("ScheduleDetail")}
      />
    </View>
  );
}
