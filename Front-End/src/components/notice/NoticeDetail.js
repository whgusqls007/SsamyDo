import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Linking } from "react-native";
import { useCallback } from "react";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Markdown from "react-native-markdown-display";

export default function NoticeDetail({ navigation, route }) {
  const id = route.params.id;
  const item = route.params.notice;

  function imgURI(path) {
    return "http://i7e204.p.ssafy.io:8082/api/image/" + path;
  }

  const goEdussafy = useCallback(async () => {
    const destinationURL = "https://edu.ssafy.com/edu/board/notice/list.do";
    if (await Linking.canOpenURL(destinationURL))
      await Linking.openURL(destinationURL);
  }, []);

  return (
    <View style={styles.detailcontainer}>
      <View style={styles.titlecontainer}>
        <TouchableOpacity
          style={styles.buttonback}
          onPress={() => navigation.pop()}
        >
          <Ionicons name="arrow-back" size={24} color="black" margin="0" />
        </TouchableOpacity>
        <Image
          source={require("../../images/notice_header.png")}
          style={styles.imageicon}
        />
      </View>

      <View style={styles.detailbox}>
        <View style={styles.titlebox}>
          <Text style={styles.detailtitle}>{item.title}</Text>
        </View>

        <View style={styles.desbox}>
          {/* 이미지는 null값 외에도 '[]' 빈값이
          문자형으로도 와서 if르 저렇게 처리했습니다. */}
          {item.file_ids !== "[]" && item.file_ids !== null && (
            <View>
              <Image
                style={{ width: "100%", height: "100%" }}
                source={{ uri: imgURI(item.file_ids) }}
              />
            </View>
          )}

          {item.source !== "E" ? (
            <ScrollView>
              <Markdown style={styles.detaildescription}>
                {item.description}
              </Markdown>
            </ScrollView>
          ) : (
            <View style={styles.ebox}>
              <Text style={styles.edussafydescription}>
                에듀싸피로 이동해서 공지를 확인하세요!
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.detailfooter}>
        {item.source === "E" ? (
          <TouchableOpacity style={styles.buttonedussafy} onPress={goEdussafy}>
            <Text style={styles.buttonedussafytext}>에듀싸피로 이동</Text>
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailcontainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  titlecontainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
  },
  imageicon: {
    marginTop: "5%",
    width: "40%",
    resizeMode: "contain",
  },

  titletext: {
    fontSize: 30,
    paddingLeft: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  detailbox: {
    flexDirection: "column",
    marginHorizontal: "3%",
    marginBottom: "3%",
    flex: 0.9,
    backgroundColor: "#ededed",
    borderRadius: 20,
    padding: 20,
    justifyContent: "space-between",
  },
  titlebox: {
    flex: 0.2,
  },
  desbox: {
    flex: 0.8,
  },
  detailtitle: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  detaildescription: {
    fontSize: 15,
    margin: 15,
  },
  ebox: {
    justifyContent: "center",
    alignItems: "center",
  },
  edussafydescription: {
    marginTop: "50%",
    fontSize: 15,
    textAlign: "center",
  },

  detailfooter: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: "1%",
  },

  buttonedussafy: {
    width: "90%",
    padding: 10,
    backgroundColor: "#5ba8ff",
    borderRadius: 15,
    marginBottom: 20,
  },
  buttonmm: {
    width: "90%",
    padding: 10,
    backgroundColor: "#5ba8ff",
    borderRadius: 15,
    marginBottom: 20,
  },
  buttonedussafytext: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 15,
  },

  buttonnotice: {
    padding: 10,
    backgroundColor: "#ffe34f",
    borderRadius: 15,
    marginBottom: 20,
    marginHorizontal: 30,
    textAlign: "center",
  },
  buttonback: {
    margin: 15,
  },
  buttonbacktext: {
    fontSize: 20,
  },
});
