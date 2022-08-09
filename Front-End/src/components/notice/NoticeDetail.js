import { View, Text, StyleSheet } from "react-native";
// import styles from "../../../app.module.css";

// notice id로 해당 notice만 뽑아오기


export default function NoticeDetail({ route }) {
  return (
    <View style={styles.center}>
      {/* 전달받은 id 잘 찍히는지 확인용으로 넣어둠 */}
      <Text>{route.params.id}</Text>
      <Text style={styles.noticedetail}>NoticeDetail.js</Text>
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
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#eaeaea',
  },
});