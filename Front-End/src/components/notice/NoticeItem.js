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
      <View style={styles.itemtitlebox}>
      <TouchableOpacity
        onFocus={styles.itemfocus}
        onPress={() => navigation.navigate("NoticeDetail", {id: notice.id, notice: notice})} >
          <Text numberOfLines={1} ellipsizeMode={"tail"} style={styles.itemtext}> {notice.title}</Text>
      </TouchableOpacity>
      <Text>{notice.duedate}</Text>
      </View>
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
    flexWrap: "wrap"
    // height: 20
  },
  itemtitlebox:{
    flexDirection: "row",
    alignItems : "flex-end",
    width: "85%",
    // flexShrink: 1,
    // flexGrow: 1,
    flexWrap: 'wrap'
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