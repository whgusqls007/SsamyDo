import { View, Text, Button } from "react-native";
import styles from "../../../app.module.css";

export default function NoticeItem({ navigation }) {
  return (
    <View style={([styles.two], { flexDirection: "row" })}>
      <Text>NoticeItem.js</Text>
      <Button
        title="Detail"
        onPress={() => navigation.navigate("NoticeDetail")}
      />
    </View>
  );
}
