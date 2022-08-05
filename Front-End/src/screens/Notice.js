import { View, Text, Button } from "react-native";
import NoticeList from "../components/notice/NoticeList";
import styles from "../../app.module.css";
import { useState } from "react";

export default function Notice({ navigation }) {
  let num = 0;
  const [number, setNumber] = useState(0);
  return (
    <View style={styles.center}>
      <Text>Notice</Text>
      <NoticeList navigation={navigation} />
      <Button
        title="let"
        onPress={() => {
          num += 1;
        }}
      />
      <Button
        title="useState"
        onPress={() => {
          setNumber(number + 1);
        }}
      />
      <Text>let 정의 : {num}</Text>
      <Text>useState 정의 : {number}</Text>
    </View>
  );
}
