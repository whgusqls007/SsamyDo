import { View, Text,TouchableOpacity } from "react-native";
import styles from "../../../app.module.css";
import { useNavigation } from "@react-navigation/native";

export default function NoticeItem({ navigation, notice }) {
  return (

    <View style={styles.noticeitembox}>
      <TouchableOpacity 
        style={styles.noticebutton}
        onPress={() => navigation.navigate("NoticeDetail", {id: notice.id})} >
          <Text> {notice.title}</Text>
      </TouchableOpacity>
      <Text>{notice.duedate}</Text>
    </View>

  );
}
