import { View, Text, ScrollView } from "react-native";
import NoticeItem from "./NoticeItem";
import styles from "../../../app.module.css";


const DATA = [
  {
    id: '1',
    title: '공지1',
    duedate : '2022-08-03',
  },
  {
    id: '2',
    title: '공지2',
    duedate : '2022-08-03'
  }
];

export default function NoticeList({ navigation }) {
  return (
    <View style={styles.noticelist}>
      <ScrollView>
        {DATA.map((notice)=>(
          <NoticeItem notice={notice} navigation={navigation} />
        ))}        
      </ScrollView>
    </View>
  );
};
