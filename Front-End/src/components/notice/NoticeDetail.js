import { View, Text } from "react-native";
import styles from "../../../app.module.css";

export default function NoticeDetail({route}) {
  return (
    <View style={styles.center}>
      {/* 전달받은 id 잘 찍히는지 확인용으로 넣어둠 */}
      <Text>{route.params.id}</Text>
      <Text>NoticeDetail.js</Text>
    </View>
  );
}
