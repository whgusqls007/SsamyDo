import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import UserDetail from "../components/myPage/UserDetail";
import Setting from "../components/myPage/Setting";
// import styles from "../../app.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import drf from "../api/drf";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyPage({ navigation }) {
  const dispatch = useDispatch();
  return (
    <View style={styles.mypagecontainer}>

      <View style={styles.titlecontainer}>
        <Image source={require('../images/mypage_header.png')} style={styles.imageicon} />
      </View>

      <View style={styles.mypagebody}>
        <UserDetail />
        <Setting />
      </View>
      
      <View style={styles.footer}>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            dispatch({ type: "Account/mode", mode: "탈퇴" });
            navigation.navigate("Verification");
          }}
        >
          <Text style={styles.buttontext}>회원 탈퇴</Text>
        </TouchableOpacity>

        {/* <View style={styles.cs}>
          <Entypo name="email" size={20} color="#A8D1FF" />
          <Text>{"  "}기타 문의: ssafy@ssafy.com </Text>
        </View> */}

      </View>
    </View>
  );
}; 

const styles = StyleSheet.create({
  mypagecontainer:{
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",
    flex: 1,
    backgroundColor: "#ffffff"
  },
  titlecontainer : {
    height: "15%",
    flexDirection: 'column',
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    // marginLeft: "7%",
    paddingLeft: "7%",
    paddingTop: "7%",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#5ba8ff",
  },
  imageicon: {
    width:"60%",
    resizeMode: "contain",
  },
  mypageheader: {
    height: "15%",
    // marginTop: "5%",
    // borderWidth: 1,
    // borderBottomWidth: 0,
    // padding: "2%",
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // marginTop:10,
    paddingLeft: 20,
    // marginBottom: 20,
    flexDirection: 'column',
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#5ba8ff",
  },
  headertext: {
    fontSize: 30,
    // marginTop: 30,
    // paddingLeft: 20,
    fontWeight: "bold",
    color: "#000000"
  },
  mypagebody: {
    height: "70%", 
    alignItems: "center"
  },
  footer : {
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  button : {
    width: "90%",
    padding: 10,
    backgroundColor: "#ff0000",
    borderRadius: 15,
    // marginBottom: 20,
  },
  buttontext:{
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold"
  },
  cs : {
    flexDirection: 'row',
    marginTop: 10,
  }

  // deleteText: {
  //   fontSize: 15,
  //   textDecorationLine: "underline",
  //   color: "#888888",
  // },
});
