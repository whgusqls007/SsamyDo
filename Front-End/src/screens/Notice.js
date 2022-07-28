import { View, Text } from "react-native";
import NoticeList from "../components/notice/NoticeList";
import styles from "../../app.module.css";

export default function Notice({ navigation }) {
  return (
    <View style={styles.center}>
      <Text>Notice</Text>
      <NoticeList navigation={navigation} />
    </View>
  );
}
