import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import NoticeList from "../components/notice/NoticeList";
// import styles from "../../app.module.css";
// import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import SearchBar from "react-native-platform-searchbar";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import drf from "../api/drf";
import { get } from "react-native/Libraries/Utilities/PixelRatio";

export default function Notice({ navigation }) {
  // 토큰
  const token = useSelector((state) => {
    return state.Account[2];
  });
  const dispatch = useDispatch();

  const [showNotice, setShowNotice] = useState("All");
  const [value, setValue] = useState("");

  const [noticeList, setNoticeList] = useState([]);
  // const todoList = useSelector(state => state.MainTodo)
  const onFetchNotice = (res) => {
    setNoticeList(res);
  };

  useEffect(() => {
    async function fetchNotice() {
      // console.log(drf.notice.noticePage(1));

      const response = await axios({
        method: "get",
        url: drf.notice.noticeOffset(0, 20),
        headers: token,
      }).catch(() => {
        navigation.navigate("Verification");
      });
      // .get(
      //   "http://i7e204.p.ssafy.io:8080/api/notice/page/1"
      // );
      // console.log(`젼님 코드 보고 바뀐거 ${response.data}`)
      return response.data;
    }
    fetchNotice()
      .then((res) => {
        // console.log(`넘어온 res ${res}`)
        onFetchNotice(res.data);
        dispatch({ type: "Notice/import", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(value)

  // console.log(showNotice)

  return (
    <View style={styles.noticecontainer}>
      <View style={styles.titlecontainer}>
        <Image
          source={require("../images/notice_header.png")}
          style={styles.imageicon}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={styles.searchbar}>
          <SearchBar
            maxLength={15}
            placeholder={"궁금한 공지를 찾아보세요!"}
            value={value}
            onChangeText={setValue}
            onSubmitEditing={() =>
              navigation.navigate("NoticeSearch", {
                value: value,
                noticeList: noticeList,
              })
            }
          />
        </View>
      </KeyboardAvoidingView>

      <View>
        <View style={styles.buttonbar}>
          <TouchableOpacity
            style={[styles.button, showNotice === "All" && styles.clickbutton]}
            onPress={() => setShowNotice("All")}
          >
            <View>
              <Text style={styles.buttontext}>전체 🐬</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, showNotice === "MM" && styles.clickbutton]}
            onPress={() => setShowNotice("MM")}
          >
            <View>
              {/* <Image 
                source={require('../images/mattermost.png')}
                style={styles.imageicon}
              /> */}
              <Text style={styles.buttontext}>MatterMost</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, showNotice === "Edu" && styles.clickbutton]}
            onPress={() => setShowNotice("Edu")}
          >
            <View>
              {/* <Image 
                  source={require('../images/ssafy.png.png')}
                  style={styles.imageicon}
                /> */}
              <Text style={styles.buttontext}>EduSSAFY</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <NoticeList
          navigation={navigation}
          select={showNotice}
          noticeList={noticeList}
        />
      </View>
    </View>
    // <View>
    //   <NoticeList navigation={navigation} select={showNotice} noticeList={noticeList} />
    // </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
  },
  noticecontainer: {
    backgroundColor: "#ffffff",
    flex: 12,
    flexDirection: "column",
  },
  titlecontainer: {
    marginTop: "5%",
    marginBottom: "5%",
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    marginLeft: "7%",
  },
  imageicon: {
    width: "60%",
    resizeMode: "contain",
  },
  buttonbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: "3%",
    marginHorizontal: "3%",
  },
  button: {
    backgroundColor: "#ededed",
    borderRadius: 8,
    padding: "3%",
  },
  clickbutton: {
    backgroundColor: "#FFE34F",
    borderRadius: 8,
    padding: "3%",
  },
  buttontext: {
    textAlign: "center",
    fontSize: 15,
  },
  searchbar: {
    marginBottom: "2%",
    marginHorizontal: "5%",
  },
});
