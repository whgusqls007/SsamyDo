import { View, Text } from "react-native";
import NoticeItem from "./NoticeItem";
import styles from "../../../app.module.css";

export default function NoticeList({ navigation }) {
  return (
    <View style={styles.one}>
      <Text>NoticeList.js</Text>
      <NoticeItem navigation={navigation} />
    </View>
  );
}
