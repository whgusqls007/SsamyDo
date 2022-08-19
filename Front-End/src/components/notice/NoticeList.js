import { StyleSheet, View, ScrollView } from "react-native";
import NoticeItem from "./NoticeItem";
// import styles from "../../../app.module.css";
import { useSelector } from "react-redux";

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
    height: "100%",
    flexDirection: "row",
    backgroundColor: "#5ba8ff",
    paddingTop: "8%",
    paddingHorizontal: "8%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: "4%",
    paddingBottom: "20%",
  },
  noticebox: { flex: 1, width: "100%" },
});
