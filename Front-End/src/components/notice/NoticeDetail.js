import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import styles from "../../../app.module.css";
import { Linking } from "react-native";
import { useCallback } from "react";
import { BackHandler } from "react-native";
// notice id로 해당 notice만 뽑아오기

const handlePressBack = () => {
  if (navigation?.canGoBack()) {
    navigation.goBack()
    return true
  }
  return false 
}

export default function NoticeDetail({ navigation, route }) {

  const goEdussafy = useCallback(async () => {
    const destinationURL = 'https://edu.ssafy.com/edu/board/notice/list.do' 
    if (await Linking.canOpenURL(destinationURL)) await Linking.openURL(destinationURL)
  }, [])
  return (
    <View style={styles.center}>
      {/* 전달받은 id 잘 찍히는지 확인용으로 넣어둠 */}
      {/* <Text>{route.params.id}</Text> */}
      <Text style={styles.noticedetail}>notice.{route.params.id}번</Text>
      <Text>notice.</Text>
      <TouchableOpacity onPress={goEdussafy} style={styles.button}>
        <Text>에듀싸피로 이동</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noticedetail : { 
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#eaeaea',
  },
  button : {
    backgroundColor: '#cc33ff'
  }
});