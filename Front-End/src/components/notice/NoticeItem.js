import { View, Text,TouchableOpacity, StyleSheet, TouchableHighlight } from "react-native";
// import styles from "../../../app.module.css";
import { useNavigation } from "@react-navigation/native";


export default function NoticeItem({ navigation, notice, noticeList }) {

  const blacksquare = String.fromCodePoint(0x25AA)
  const bell = String.fromCodePoint(0x1F514)

  // console.log(`noticeItem ---------------------- ${noticeList}`)
	
  return (

    // touchablehighlight 사용해서 hover 효과 주려다가 실패함

    <View style={[styles.noticeitembox]}>
      <Text style={styles.itememoji}>🍀</Text>
      <TouchableOpacity
        onFocus={styles.itemfocus}
        onPress={() => navigation.navigate("NoticeDetail", {id: notice.id, noticeList: noticeList})} >
          <Text style={styles.itemtext}> {notice.title}</Text>
      </TouchableOpacity>
      <Text>{notice.duedate}</Text>
    </View>

  );
}

const styles = StyleSheet.create({
  noticeitembox : {
    flexDirection: 'row',
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
    margin: 10,
    padding: 10,
    borderRadius: 8,
    // height: 20
  },
  itememoji : {
    marginHorizontal: 5,
  }, 
  itemtext : {
    fontSize: 15,
    marginLeft: 5,
  },
  itemfocus : {
    backgroundColor: "ffe34f",
  }
})