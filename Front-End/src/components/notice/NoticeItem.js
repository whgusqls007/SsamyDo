import { View, Text,TouchableOpacity, StyleSheet, TouchableHighlight } from "react-native";
// import styles from "../../../app.module.css";
import { useNavigation } from "@react-navigation/native";


export default function NoticeItem({ navigation, notice }) {

  const blacksquare = String.fromCodePoint(0x25AA)
  const bell = String.fromCodePoint(0x1F514)
	
  return (

    // touchablehighlight 사용해서 hover 효과 주려다가 실패함

    <View style={[styles.noticeitembox, styles.itemtext]}>
      <Text>🍀</Text>
      <TouchableOpacity
        onFocus={styles.itemfocus}
        onPress={() => navigation.navigate("NoticeDetail", {id: notice.id})} >
          <Text> {notice.title}</Text>
      </TouchableOpacity>
      <Text>{notice.duedate}</Text>
    </View>

  );
}

const styles = StyleSheet.create({
  noticeitembox : {
    flexDirection: 'row',
    justifyContent: "space-around",
    backgroundColor: "#ffffff",
    margin: 10,
    padding: 10,
    borderRadius: 20,
    // height: 20
  },
  itemtext : {
    fontSize: 15,
  },
  itemfocus : {
    backgroundColor: "ffe34f",
  }
})