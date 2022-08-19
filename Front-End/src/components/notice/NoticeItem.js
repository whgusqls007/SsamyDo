import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function NoticeItem({ navigation, notice }) {
  return (
    <View style={[styles.noticeitembox]}>
      <Text style={styles.itememoji}>🍀</Text>
      <View style={styles.itemtitlebox}>
        <TouchableOpacity
          onFocus={styles.itemfocus}
          onPress={() =>
            navigation.navigate("NoticeDetail", {
              id: notice.id,
              notice: notice,
            })
          }
        >
          <Text
            numberOfLines={1}
            ellipsizeMode={"tail"}
            style={styles.itemtext}
          >
            {" "}
            {notice.title}
          </Text>
        </TouchableOpacity>
        <Text>{notice.duedate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  noticeitembox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
    margin: 10,
    padding: 10,
    borderRadius: 8,
    flexWrap: "wrap",
  },
  itemtitlebox: {
    flexDirection: "row",
    alignItems: "flex-end",
    width: "85%",
    flexWrap: "wrap",
  },
  itememoji: {
    marginHorizontal: 5,
  },
  itemtext: {
    fontSize: 15,
    marginLeft: 5,
  },
  itemfocus: {
    backgroundColor: "ffe34f",
  },
});
