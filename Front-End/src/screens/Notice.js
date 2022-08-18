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

export default function Notice({ navigation }) {
  // 토큰
  const token = useSelector((state) => {
    return state.Account[2];
  });
  const dispatch = useDispatch();

  const [showNotice, setShowNotice] = useState("All");
  const [value, setValue] = useState("");

  const noticeList = useSelector((state) => {
    return state.Notice[0];
  });

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
        <NoticeList navigation={navigation} select={showNotice} />
      </View>
    </View>
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

  titletext: {
    fontSize: 30,
    paddingLeft: 20,
    fontWeight: "bold",
    color: "#000000",
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
