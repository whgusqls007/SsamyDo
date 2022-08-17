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
import { useDispatch } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import SearchBar from "react-native-platform-searchbar";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";

export default function Notice({ navigation }) {
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
      const response = await axios.get(
        "http://i7e204.p.ssafy.io:8080/api/notice/page/1"
      );
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
          <Text style={styles.titletext}>Ssamy Says
            {/* <Image source={require('../images/ssamy.png')} style={styles.imageicon} /> */}
          </Text>
      </View>

      <KeyboardAvoidingView>
        <View style={styles.searchbar}>
          <SearchBar
            maxLength={15}
            placeholder={"궁금한 공지를 찾아보세요!"}
            value={value}
            onChangeText={setValue}
            onSubmitEditing={()=>navigation.navigate("NoticeSearch", { value: value, noticeList : noticeList })}
          />
        </View>
      </KeyboardAvoidingView>

      <View>
        <View style={styles.buttonbar}>
          <TouchableOpacity
            style={[styles.button, showNotice === "All" && styles.clickbutton]}
            onPress={() => setShowNotice("All")}
          >
            <View >
              <Text style={styles.buttontext}>전체 🐬</Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity
            style={[styles.button, showNotice === "MM" && styles.clickbutton]}
            onPress={() => setShowNotice("MM")}
          >
            <View >
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
            <View >
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

  header:{
    flexDirection: "row",
  },

  noticecontainer: {
    backgroundColor: "#ffffff",
    flex: 1,
    flexDirection: "column",
  },


  titlecontainer : {
    marginTop: 30,
    marginBottom: 20,
    flexDirection: 'column',
    // paddingBottom: 15,
    // textAlign: 'left',
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    // marginBottom: 10,
  },

  titletext:{
    paddingTop: 30,
    paddingLeft: 20,
    paddingBottom: 15,
    textAlign: "left",
    backgroundColor: "#5ba8ff",
    marginBottom: 10,

    fontSize: 30,
    // paddingTop: 10,
    paddingLeft: 20,
    // paddingRight: 20,
    fontWeight: "bold",
    color: "#000000"
  },

  imageicon: {
    padding: 10,
    margin: 5,
    // height: 100,
    // width: 100,
    height: 30,
    width: 30,
    resizeMode: "contain",
  },

  buttonbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 10,
    marginHorizontal: 20,
  },

  button: {
    backgroundColor: "#ededed",
    // borderRadius: 5,
    // alignItems: "center",
    // marginHorizontal: 5,
    // paddingHorizontal: 10,
    // width: "auto",
    borderRadius: 8,
    padding: 12,

  },

  clickbutton: {
    backgroundColor: "#FFE34F",
    borderRadius: 8,
    padding: 12,
  },

  buttontext: {
    textAlign: "center",
    fontSize: 15,
  },

  searchbar: {
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 20,
  },
});

