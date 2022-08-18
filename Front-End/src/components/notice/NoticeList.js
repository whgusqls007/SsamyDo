import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import NoticeItem from "./NoticeItem";
// import styles from "../../../app.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

export default function NoticeList({ navigation, select }) {
  const noticeList = useSelector((state) => {
    return state.Notice[0];
  });

  if (select === "All") {
    return (
      <View style={styles.noticelistcontainer}>
        <ScrollView style={styles.noticebox}>
          {noticeList &&
            noticeList.map((notice) => {
              return (
                <NoticeItem
                  key={notice.id}
                  notice={notice}
                  navigation={navigation}
                />
              );
            })}
        </ScrollView>
      </View>
    );
  } else if (select === "MM") {
    return (
      <View style={styles.noticelistcontainer}>
        <ScrollView style={styles.noticebox}>
          {noticeList &&
            noticeList
              .filter((notice) => notice.source === "M")
              .map((notice) => (
                <NoticeItem
                  key={notice.id}
                  notice={notice}
                  navigation={navigation}
                />
              ))}
        </ScrollView>
      </View>
    );
  } else if (select === "Edu") {
    return (
      <View style={styles.noticelistcontainer}>
        <ScrollView style={styles.noticebox}>
          {noticeList &&
            noticeList
              .filter((notice) => notice.source === "E")
              .map((notice) => (
                <NoticeItem
                  key={notice.id}
                  notice={notice}
                  navigation={navigation}
                />
              ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noticelistcontainer: {
    flexDirection: "row",
    backgroundColor: "#5ba8ff",
    paddingTop: 30,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
    marginBottom: 20,
    height: "75%",
  },
  noticebox: { flex: 1, width: "100%" },
});
