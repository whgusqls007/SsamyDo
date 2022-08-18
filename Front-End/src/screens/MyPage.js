import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import UserDetail from "../components/myPage/UserDetail";
import Setting from "../components/myPage/Setting";
// import styles from "../../app.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import drf from "../api/drf";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyPage({ navigation }) {
  const dispatch = useDispatch();
  return (
    <View style={styles.mypagecontainer}>

      <View style={styles.mypageheader}>
        <Text style={styles.headertext}>MyPage</Text>
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
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  mypagecontainer:{
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",
    flex: 1,
    backgroundColor: "#ffffff"
  },
  mypageheader: {
    height: "10%",
    // marginTop: "5%",
    // borderWidth: 1,
    // borderBottomWidth: 0,
    // padding: "2%",
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    marginTop:10,
    paddingLeft: 20,
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
  },
  headertext: {
    fontSize: 30,
    // paddingLeft: 20,
    fontWeight: "bold",
    color: "#000000"
  },
  mypagebody: {
    height: "70%", 
    alignItems: "center"
  },
  footer : {
    height: "10%",
    alignItems: "center"
  },
  button : {
    width: "90%",
    padding: 10,
    backgroundColor: "#5ba8ff",
    borderRadius: 15,
    marginBottom: 20,
  },
  buttontext:{
    textAlign: "center"
  }
});
