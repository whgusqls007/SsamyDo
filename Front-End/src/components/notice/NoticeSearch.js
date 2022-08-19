import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import NoticeItem from "./NoticeItem";

// Notice data에서 찾기 ..
export default function NoticeSearch({ navigation, route }) {
  const value = route.params.value;

  const noticeList = useSelector((state) => {
    return state.Notice[0];
  });
  const searchNotice = noticeList.filter((notice) =>
    notice.title.includes(value)
  );

  const search = String.fromCodePoint(0x1f50e);

  if (searchNotice.length !== 0) {
    return (
      <View style={styles.searchcontainer}>
        <View style={styles.titlecontainer}>
          <Image
            source={require("../../images/notice_header.png")}
            style={styles.imageicon}
          />
        </View>

        <Text style={styles.searchbox}>
          {search} "{value}" 검색 결과입니다.
        </Text>

        <View style={styles.resultcontainer}>
          <View style={styles.resultbox}>
            <ScrollView>
              {searchNotice.map((notice) => (
                <NoticeItem
                  key={notice.id}
                  notice={notice}
                  navigation={navigation}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.buttonbar}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Notice")}
            >
              <Text>공지로 돌아가기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.searchcontainer}>
        <View style={styles.titlecontainer}>
          <Image
            source={require("../../images/notice_header.png")}
            style={styles.imageicon}
          />
        </View>

        <View style={styles.failresult}>
          <Text style={styles.searchbox}>
            {search} "{value}" 검색 결과가 없습니다.{" "}
          </Text>

          <View style={styles.buttonbar}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Notice")}
            >
              <Text>공지로 돌아가기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchcontainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  titlecontainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    marginLeft: "7%",
  },
  imageicon: {
    width: "50%",
    resizeMode: "contain",
  },
  titletext: {
    fontSize: 30,
    paddingLeft: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  searchbox: {
    backgroundColor: "#ededed",
    margin: 20,
    textAlign: "center",
    padding: 10,
    fontSize: 15,
    borderRadius: 10,
  },

  resultcontainer: {
    flexDirection: "column",
    backgroundColor: "#A8D1FF",
    paddingTop: 30,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
    height: "100%",
  },

  resultbox: {
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#ffe34f",
    borderRadius: 8,
    padding: 12,
  },

  buttonbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 10,
    marginHorizontal: 20,
  },
});
