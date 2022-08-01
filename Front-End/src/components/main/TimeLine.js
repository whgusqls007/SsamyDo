import { View, Text } from "react-native";
import TimeLineItem from "./TimeLineItem";
import styles from "../../../app.module.css";

export default function TimeLine() {
  return (
    <View style={styles.one}>
      <Text>TimeLine.js</Text>
      <TimeLineItem />
    </View>
  );
}
