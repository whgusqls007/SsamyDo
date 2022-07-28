import { View, Text } from "react-native";
import Alarm from "../components/myPage/Alarm";
import UserDetail from "../components/myPage/UserDetail";
import Setting from "../components/myPage/Setting";
import styles from "../../app.module.css";

export default function MyPage() {
  return (
    <View style={styles.center}>
      <Text>MyPage</Text>
      <Alarm />
      <UserDetail />
      <Setting />
    </View>
  );
}
