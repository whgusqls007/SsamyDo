
import { View, Text, Button } from "react-native";
import NoticeList from "../components/notice/NoticeList";
import styles from "../../app.module.css";
import { useState } from "react";

export default function Notice({ navigation }) {
  return (
    <View style={styles.center}>
      <Text>Notice</Text>
      <NoticeList navigation={navigation} />
    </View>
  );

}
